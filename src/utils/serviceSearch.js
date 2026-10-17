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

// Score thresholds
const TITLE_MATCH = 10
const PHRASE_MATCH = 6
const MIN_SHARE_OF_BEST = 0.4

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

// Allows one wrong, missing or extra letter in longer words
function closeEnough(a, b) {
  if (Math.abs(a.length - b.length) > 1 || Math.min(a.length, b.length) < 5) return false
  let i = 0
  let j = 0
  let edits = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1
      j += 1
    } else {
      edits += 1
      if (edits > 1) return false
      if (a.length > b.length) i += 1
      else if (b.length > a.length) j += 1
      else {
        i += 1
        j += 1
      }
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1
}

// How well one typed word matches one keyword word (0 to 1)
function wordMatch(typed, known) {
  if (typed === known) return 1
  if (typed.length >= 3 && known.startsWith(typed)) return 0.8 // still typing
  if (closeEnough(typed, known)) return 0.7 // small typo
  return 0
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

function scoreEntry(entry, query, queryWords, weight) {
  let score = 0

  // Whole title or whole keyword phrase (matched on whole words, so "lock"
  // does not match inside "blocked")
  const padded = ` ${query} `
  const has = (phrase) => padded.includes(` ${phrase} `)
  const typed = new Set(queryWords)
  // A one-word keyword only counts as a clear match for short searches, so a
  // longer sentence like "scratching noises in the ceiling" goes to the AI
  // instead of matching Painting on the word "ceiling"
  const phraseFound = (list) => (list.length > 1 || queryWords.length <= 2) && list.every((w) => typed.has(w))
  if (has(entry.title) || (query.length >= 3 && entry.title.startsWith(query))) score += TITLE_MATCH
  else if (entry.phraseWords.some(phraseFound) || entry.phrases.some((p) => query.length >= 4 && p.startsWith(query))) {
    score += PHRASE_MATCH
  }

  // Word by word
  queryWords.forEach((typed) => {
    let best = 0
    let bestWord = null
    entry.words.forEach((known) => {
      const m = wordMatch(typed, known)
      if (m > best) {
        best = m
        bestWord = known
      }
    })
    if (bestWord) score += best * weight(bestWord) * 2
  })

  return score
}

// True when the keyword search found a clear match (a service name or a
// whole keyword phrase). Otherwise the AI search is asked as well.
export function isConfidentMatch(index, rawQuery) {
  const query = normalise(rawQuery)
  if (!query) return true
  const queryWords = tokens(query)
  return index.entries.some((entry) => scoreEntry(entry, query, queryWords, index.weight) >= PHRASE_MATCH)
}

// Returns the matching services, best match first
export function searchServices(index, rawQuery) {
  const query = normalise(rawQuery)
  if (!query) return index.entries.map((e) => e.service)

  const queryWords = tokens(query)
  const scored = index.entries
    .map((entry) => ({ service: entry.service, score: scoreEntry(entry, query, queryWords, index.weight) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  if (scored.length === 0) return []
  const cutOff = scored[0].score * MIN_SHARE_OF_BEST
  return scored.filter((r) => r.score >= cutOff).map((r) => r.service)
}
