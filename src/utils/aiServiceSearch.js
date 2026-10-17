// AI search for the Services page - free, runs in the visitor's browser.
//
// A small AI language model (all-MiniLM-L6-v2, about 23MB) turns text into
// "meaning vectors", so phrases that mean the same thing end up close
// together even when they share no words. "water dripping through the roof"
// lands near Plumbing, and "tenant cannot get inside" lands near Locksmith.
//
// No API key, no server and no cost: the library and model are downloaded
// from public CDNs the first time someone uses the search box, then the
// browser caches them. If anything fails (offline, old browser), the page
// simply keeps using the keyword search in serviceSearch.js.

const LIBRARY_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.6/dist/transformers.min.js'
const MODEL = 'Xenova/all-MiniLM-L6-v2'

// How sure the AI must be before its answer is shown (0 to 1)
const MIN_SIMILARITY = 0.45
// Also show services that are nearly as close as the best one
const CLOSE_TO_BEST = 0.06
const MAX_RESULTS = 3

function dot(a, b) {
  let sum = 0
  for (let i = 0; i < a.length; i += 1) sum += a[i] * b[i]
  return sum
}

// Turns a list of texts into normalised meaning vectors
async function embed(extractor, texts) {
  const output = await extractor(texts, { pooling: 'mean', normalize: true })
  const size = output.dims[output.dims.length - 1]
  const vectors = []
  for (let i = 0; i < texts.length; i += 1) vectors.push(output.data.slice(i * size, (i + 1) * size))
  return vectors
}

// What the AI compares the query against for each service
function phrasesFor(service) {
  return [service.title, service.description, ...(service.keywords || [])]
}

// Works with any feature-extraction pipeline, so it can be tested outside the browser
export async function createAiSearch(extractor, services) {
  const entries = []
  for (const service of services) {
    const vectors = await embed(extractor, phrasesFor(service))
    entries.push({ service, vectors })
  }

  return async function rank(query) {
    const [q] = await embed(extractor, [query])
    const scored = entries
      .map(({ service, vectors }) => {
        // The closest single phrase decides the score
        let best = -1
        vectors.forEach((v) => {
          best = Math.max(best, dot(q, v))
        })
        return { service, score: best }
      })
      .sort((a, b) => b.score - a.score)

    const top = scored[0]
    if (!top || top.score < MIN_SIMILARITY) return []


    return scored
      .filter((r) => r.score >= MIN_SIMILARITY && r.score >= top.score - CLOSE_TO_BEST)
      .slice(0, MAX_RESULTS)
      .map((r) => r.service)
  }
}

// Browser loader: downloads the library and model once, shared by every search.
// `onProgress` receives { stage: 'downloading', percent } while the model
// files download, then { stage: 'preparing' } while the services are read.
let loading = null
const listeners = new Set()
const report = (update) => listeners.forEach((fn) => fn(update))

export function loadAiSearch(services, onProgress) {
  if (onProgress) listeners.add(onProgress)
  if (!loading) {
    // The model file (.onnx) is almost all of the download, so the
    // percentage follows that file only
    const progress_callback = (event) => {
      if (event.status !== 'progress' || !event.total || !String(event.file).endsWith('.onnx')) return
      report({ stage: 'downloading', percent: Math.min(99, Math.round((event.loaded / event.total) * 100)) })
    }

    report({ stage: 'downloading', percent: 0 })
    loading = import(/* webpackIgnore: true */ LIBRARY_URL)
      .then(async ({ pipeline, env }) => {
        env.allowLocalModels = false
        const extractor = await pipeline('feature-extraction', MODEL, { dtype: 'q8', progress_callback })
        report({ stage: 'preparing' })
        return createAiSearch(extractor, services)
      })
      .catch((error) => {
        loading = null // allow another try later
        throw error
      })
  }
  return loading
}
