// Smart search for the Services page.
//
// People rarely type a trade name. They describe the problem instead, for
// example "leaking tap" or "no power". Each service in servicesData.js has a
// `keywords` list of problem words and phrases, and this file scores every
// service against what was typed so the most likely trade shows first.
//
// How the score works:
//   - the query matches the service title, or a whole keyword phrase   -> big boost
//   - each word in the query that matches a keyword word               -> smaller boost
//     (rare words like "gutter" count more than common ones like "broken")
//   - partial words while typing ("plumb") and small typos ("electrcal") still match
// Services scoring well below the best match are hidden, so "blocked gutter"
// shows Gutter Cleaning and not every service that mentions "blocked".

// Words that carry no meaning for matching
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'any', 'are', 'at', 'be', 'can', 'do', 'does', 'for', 'from', 'get', 'got', 'has', 'have',
  'help', 'i', 'in', 'is', 'it', 'its', 'me', 'my', 'need', 'no', 'not', 'of', 'on', 'or', 'our', 'out',
  'please', 'some', 'the', 'there', 'to', 'up', 'want', 'with', 'wont',
])

export function normalise(text) {
  return text
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Very small stemmer so "leaking", "leaks", "leaky" and "leak" all match
export function stem(word) {
  if (word.length <= 3) return word
  const rules = [
    ['ies', 'y'],
    ['ing', ''],
    ['ed', ''],
    ['es', ''],
    ['y', ''],
    ['s', ''],
  ]
  for (const [end, replacement] of rules) {
    if (word.endsWith(end) && word.length - end.length >= 3) {
      return word.slice(0, -end.length) + replacement
    }
  }
  return word
}

function tokens(text) {
  return normalise(text)
    .split(' ')
    .filter((w) => w && !STOP_WORDS.has(w))
    .map(stem)
}

// Build the search index once per list of services
export function buildIndex(services) {
  const entries = services.map((service) => {
    const phrases = [service.title, ...(service.keywords || [])].map(normalise)
    const words = new Set(phrases.flatMap(tokens))
    // Keyword phrases as word lists, so "spray paint" also matches "spray painted our wall"
    const phraseWords = phrases.map(tokens).filter((list) => list.length > 0)
    return { service, title: normalise(service.title), phrases, phraseWords, words }
  })

  // Rare words are better clues than common ones
  const counts = {}
  entries.forEach((e) => e.words.forEach((w) => (counts[w] = (counts[w] || 0) + 1)))
  const weight = (w) => 1 / (counts[w] || 1)

  return { entries, weight }
}
