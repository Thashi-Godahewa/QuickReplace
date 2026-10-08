import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, CircleCheck, FileText, Film, ImageIcon, Lock, Mail, MapPin, Phone, User, X } from 'lucide-react'
import { submitEnquiry } from '../../services/enquiry'

const MAX_FILES = 5
// Gmail caps an email at 25MB, so all files together must stay under 18MB
const MAX_TOTAL_BYTES = 18 * 1024 * 1024
const ACCEPTED = [
  'image/jpeg', 'image/png', 'image/heic', 'image/heif', 'application/pdf',
  'video/mp4', 'video/quicktime', 'video/webm', 'video/3gpp', 'video/x-m4v',
]
const ACCEPT_ATTR = '.jpg,.jpeg,.png,.heic,.heif,.pdf,.mp4,.mov,.m4v,.webm,.3gp'

const emptyForm = { fullName: '', email: '', phone: '', address: '', description: '' }

function formatSize(bytes) {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

function validate(values) {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email address.'
  const digits = values.phone.replace(/\D/g, '')
  if (!digits) errors.phone = 'Please enter a contact number.'
  else if (digits.length < 8 || digits.length > 12) errors.phone = 'Please enter a valid phone number.'
  if (!values.address.trim()) errors.address = 'Please enter the property address or post code.'
  return errors
}

function StepHeading({ number, title, children }) {
  return (
    <div className="flex gap-4 border-b border-brand-line pb-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-sky/40 bg-brand-skySoft text-sm font-semibold text-brand-sky">
        {number}
      </span>
      <div>
        <h2 className="text-[22px] font-semibold tracking-tight text-brand-ink">{title}</h2>
        <p className="mt-0.5 text-[13px] leading-snug text-brand-muted">{children}</p>
      </div>
    </div>
  )
}

function Field({ id, label, icon: Icon, error, required = true, ...inputProps }) {
  return (
    <div>
      <label className="text-[13px] font-semibold uppercase tracking-wide text-brand-ink" htmlFor={id}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative mt-2">
        <Icon aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
        <input
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          className={`h-12 w-full rounded-lg border bg-brand-mist pl-11 pr-4 text-[15px] text-brand-ink placeholder:text-brand-muted/70 focus:bg-white focus:outline-none focus:ring-2 ${
            error ? 'border-red-400 focus:ring-red-200' : 'border-brand-line focus:border-brand-sky focus:ring-brand-sky/25'
          }`}
          id={id}
          name={id}
          {...inputProps}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-[13px] text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}

export default function EnquiryForm() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [files, setFiles] = useState([]) // { id, file, preview }
  const [fileError, setFileError] = useState('')
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [sendError, setSendError] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const inputRef = useRef(null)
  const filesRef = useRef(files)
  filesRef.current = files

  // Free the image previews when the form unmounts
  useEffect(() => () => filesRef.current.forEach((f) => f.preview && URL.revokeObjectURL(f.preview)), [])

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }))
  }

  const addFiles = (list) => {
    const incoming = Array.from(list)
    const accepted = []
    let problem = ''
    let total = files.reduce((sum, f) => sum + f.file.size, 0)
    incoming.forEach((file) => {
      const typeOk = ACCEPTED.includes(file.type) || /\.(heic|heif|mov|m4v|3gp)$/i.test(file.name)
      if (!typeOk) problem = `${file.name} is not a photo, video or PDF file.`
      else if (total + file.size > MAX_TOTAL_BYTES) problem = `${file.name} would take your files over the 18MB total limit.`
      else {
        total += file.size
        accepted.push(file)
      }
    })
    const room = MAX_FILES - files.length
    if (accepted.length > room) problem = `You can upload up to ${MAX_FILES} files.`
    const toAdd = accepted.slice(0, Math.max(0, room)).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      file,
      preview: file.type.startsWith('image/') && !/heic|heif/i.test(file.type) ? URL.createObjectURL(file) : null,
    }))
    setFiles((current) => [...current, ...toAdd.filter((f) => !current.some((c) => c.id === f.id))])
    setFileError(problem)
  }

  const removeFile = (id) => {
    setFiles((current) => {
      const target = current.find((f) => f.id === id)
      if (target && target.preview) URL.revokeObjectURL(target.preview)
      return current.filter((f) => f.id !== id)
    })
    setFileError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = document.getElementById(Object.keys(found)[0])
      if (first) first.focus()
      return
    }
    const data = new FormData()
    Object.entries(values).forEach(([k, v]) => data.append(k, v))
    data.append('website', honeypot)
    files.forEach((f) => data.append('photos', f.file))
    setStatus('sending')
    setSendError('')
    try {
      const res = await submitEnquiry(data)
      setStatus(res.ok ? 'sent' : 'failed')
      if (!res.ok) setSendError(res.error || '')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center px-8 py-20 text-center" role="status">
        <CircleCheck aria-hidden="true" className="h-14 w-14 text-emerald-500" strokeWidth={1.5} />
        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-brand-ink">Thanks, {values.fullName.split(' ')[0]}!</h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-brand-muted">
          We have received your enquiry and will be in touch shortly. For anything urgent, please give us a call.
        </p>
        <button
          className="mt-8 rounded-full border border-brand-line px-6 py-2.5 text-sm font-medium text-brand-ink hover:border-brand-sky hover:text-brand-sky"
          onClick={() => {
            files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview))
            setValues(emptyForm)
            setFiles([])
            setStatus('idle')
          }}
          type="button"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-8 p-6 sm:p-10" noValidate onSubmit={handleSubmit}>
      <StepHeading number="01" title="Send us an enquiry">
        Tell us what you need help with and we&rsquo;ll take it from there. Add a few photos if you can - they help us
        understand the job and may allow us to provide an estimate without a site visit
      </StepHeading>

      <div className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
        <Field autoComplete="name" error={errors.fullName} icon={User} id="fullName" label="Full name" onChange={update} placeholder="e.g. Marcus Vance" value={values.fullName} />
        <Field autoComplete="email" error={errors.email} icon={Mail} id="email" label="Email address" onChange={update} placeholder="marcus@propertygroup.com.au" type="email" value={values.email} />
        <Field autoComplete="tel" error={errors.phone} icon={Phone} id="phone" inputMode="tel" label="Contact number" onChange={update} placeholder="0401 234 567" type="tel" value={values.phone} />
        <Field autoComplete="street-address" error={errors.address} icon={MapPin} id="address" label="Property address / post code" onChange={update} placeholder="e.g. 142 Collins St, Melbourne or 3000" value={values.address} />
      </div>

      <StepHeading number="02" title="Scope & Image Upload">
        Tell us what needs to be repaired, replaced or maintained. Include as much information as you can, and attach
        photos below to help us understand the work required.
      </StepHeading>

      <div>
        <label className="text-[13px] font-semibold uppercase tracking-wide text-brand-ink" htmlFor="description">
          Describe the issue or job requirements
        </label>
        <textarea
          className="mt-2 w-full resize-y rounded-lg border border-brand-line bg-brand-mist px-4 py-3 text-[15px] leading-relaxed text-brand-ink placeholder:text-brand-muted/70 focus:border-brand-sky focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky/25"
          id="description"
          name="description"
          onChange={update}
          placeholder="e.g. Broken shopfront glass, approx. 2000 x 1000 mm. Ground floor with easy access. Need temporary board-up/make-safe and a quote for glass replacement."
          rows={3}
          value={values.description}
        />
      </div>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[13px] font-semibold uppercase tracking-wide text-brand-ink" id="upload-label">
            Upload photos or videos (up to {MAX_FILES} files)
          </p>
          <p className="text-xs text-brand-muted">JPG, PNG, HEIC, PDF, MP4, MOV - 18MB total</p>
        </div>

        <div
          aria-labelledby="upload-label"
          className={`mt-2 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
            dragging ? 'border-brand-sky bg-brand-skySoft' : 'border-brand-sky/40 bg-brand-skySoft/40 hover:bg-brand-skySoft'
          } ${files.length >= MAX_FILES ? 'pointer-events-none opacity-50' : ''}`}
          onClick={() => inputRef.current && inputRef.current.click()}
          onDragLeave={() => setDragging(false)}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            addFiles(e.dataTransfer.files)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              inputRef.current && inputRef.current.click()
            }
          }}
          role="button"
          tabIndex={0}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-sky/15 text-brand-sky">
            <ImageIcon aria-hidden="true" className="h-6 w-6" />
          </span>
          <p className="mt-4 text-[15px] font-semibold text-brand-ink">
            Drag &amp; drop photos or videos here, or <span className="text-brand-sky underline underline-offset-2">browse files</span>
          </p>
          <p className="mt-1 text-[13px] text-brand-muted">Close-up and wider photos help us understand the work required.</p>
          <input
            accept={ACCEPT_ATTR}
            className="sr-only"
            multiple
            onChange={(e) => {
              addFiles(e.target.files)
              e.target.value = ''
            }}
            ref={inputRef}
            tabIndex={-1}
            type="file"
          />
        </div>

        {fileError && (
          <p className="mt-2 text-[13px] text-red-600" role="alert">
            {fileError}
          </p>
        )}

        {files.length > 0 && (
          <ul className="mt-4 space-y-3">
            {files.map(({ id, file, preview }) => (
              <li className="flex items-center gap-3 rounded-xl border border-brand-line bg-brand-mist px-3 py-3" key={id}>
                {preview ? (
                  <img alt="" className="h-10 w-10 rounded-md object-cover" src={preview} />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-brand-muted">
                    {file.type.startsWith('video/') || /\.(mov|m4v|3gp)$/i.test(file.name) ? (
                      <Film aria-hidden="true" className="h-5 w-5" />
                    ) : (
                      <FileText aria-hidden="true" className="h-5 w-5" />
                    )}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brand-ink">{file.name}</p>
                  <p className="flex items-center gap-1 text-xs text-emerald-600">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    {formatSize(file.size)} • Ready to upload
                  </p>
                </div>
                <button
                  aria-label={`Remove ${file.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-brand-muted hover:bg-white hover:text-brand-ink"
                  onClick={() => removeFile(id)}
                  type="button"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Hidden from people; bots that fill it in are ignored by the server */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input autoComplete="off" id="website" name="website" onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} type="text" value={honeypot} />
      </div>

      <div className="border-t border-brand-line pt-5">
        <button
          className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-brand-navy text-lg font-semibold text-white shadow-[0_14px_30px_-12px_rgba(64,110,255,0.55)] transition-colors hover:bg-brand-navyLight disabled:cursor-wait disabled:opacity-80"
          disabled={status === 'sending'}
          type="submit"
        >
          {status === 'sending' ? 'Sending...' : 'Submit'}
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:translate-x-0.5">
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
        </button>
        {status === 'failed' && (
          <p className="mt-3 text-center text-sm text-red-600" role="alert">
            {sendError || 'Something went wrong sending your enquiry. Please try again or call us.'}
          </p>
        )}
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[13px] text-brand-muted">
          <span className="inline-flex items-center gap-1.5">
            <Lock aria-hidden="true" className="h-3.5 w-3.5 text-emerald-600" />
            256-bit encrypted data telemetry
          </span>
          <span aria-hidden="true">•</span>
          <span>Zero obligation</span>
        </p>
      </div>
    </form>
  )
}
