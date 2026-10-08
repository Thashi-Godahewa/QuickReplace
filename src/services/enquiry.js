// Sends a contact / quote enquiry to the enquiry server (server/index.js),
// which emails it with the photos and videos attached.
//
// In development the React dev server forwards /api/... to the enquiry server
// (see "proxy" in package.json). Once deployed, set REACT_APP_ENQUIRY_URL to the
// hosted server address if it lives on a different domain.
const ENQUIRY_URL = process.env.REACT_APP_ENQUIRY_URL || '/api/enquiry'

export async function submitEnquiry(formData) {
  let res
  try {
    res = await fetch(ENQUIRY_URL, { method: 'POST', body: formData })
  } catch {
    return { ok: false, error: 'We could not reach our server. Please check your connection and try again, or call us.' }
  }

  let data = {}
  try {
    data = await res.json()
  } catch {
    // Server did not send JSON (for example, it is not running)
  }

  if (!res.ok || !data.ok) {
    return { ok: false, error: data.error || 'Something went wrong sending your enquiry. Please try again or call us.' }
  }
  return { ok: true }
}
