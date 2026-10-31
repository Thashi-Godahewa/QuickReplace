// Unit tests for createAiSearch() in src/utils/aiServiceSearch.js.
// The real model downloads from a CDN in the browser, so these tests use a small
// fake "extractor" with hand-made vectors. That isolates the ranking rules
// (similarity threshold, off-topic rejection, close-to-best, max 3 results).
const assert = require('node:assert/strict')
const test = require('node:test')
const load = require('./_load.cjs')
const { createAiSearch } = load('src/utils/aiServiceSearch.js')

const unit = (v) => { const n = Math.hypot(...v); return v.map((x) => x / n) }
// Dimensions: 0 plumbing, 1 roofing, 2 locksmith, 3 electrical, 4 food/off-topic, 5 noise
function fakeExtractor(table) {
  return async (texts) => {
    const rows = texts.map((t) => unit(table[t] || [0, 0, 0, 0, 0, 1]))
    return { dims: [rows.length, 6], data: Float32Array.from(rows.flat()) }
  }
}
const services = [
  { slug: 'plumbing', title: 'Plumbing', description: 'pipes', keywords: ['leak'] },
  { slug: 'roofing', title: 'Roofing', description: 'roofs', keywords: ['roof leak'] },
  { slug: 'locksmith', title: 'Locksmith', description: 'locks', keywords: ['locked out'] },
  { slug: 'electrical', title: 'Electrical', description: 'power', keywords: ['no power'] },
]
const table = {
  Plumbing: [1, 0, 0, 0, 0, 0], leak: [1, 0.8, 0, 0, 0, 0],
  Roofing: [0, 1, 0, 0, 0, 0], 'roof leak': [0.6, 1, 0, 0, 0, 0],
  Locksmith: [0, 0, 1, 0, 0, 0], 'locked out': [0, 0, 1, 0, 0, 0],
  Electrical: [0, 0, 0, 1, 0, 0], 'no power': [0, 0, 0, 1, 0, 0],
  pizza: [0, 0, 0, 0, 1, 0], food: [0, 0, 0, 0, 1, 0],
  // queries
  'water dripping through ceiling': [1, 1, 0, 0, 0, 0],
  'tenant cannot get inside': [0, 0, 1, 0, 0, 0.3],
  'pizza delivery': [0.2, 0, 0, 0, 1, 0],
  'random words': [0.1, 0.1, 0.1, 0.1, 0, 1],
  'everything broken': [1, 1, 1, 1, 0, 0],
}

test('AI-01 a paraphrased problem is ranked to the right trade', async () => {
  const rank = await createAiSearch(fakeExtractor(table), services)
  const r = await rank('tenant cannot get inside')
  assert.equal(r[0].slug, 'locksmith')
})

test('AI-02 services nearly as close as the best one are also shown', async () => {
  const rank = await createAiSearch(fakeExtractor(table), services)
  const r = (await rank('water dripping through ceiling')).map((s) => s.slug)
  assert.deepEqual(r.sort(), ['plumbing', 'roofing'])
})

test('AI-03 below the 0.45 similarity threshold returns nothing', async () => {
  const rank = await createAiSearch(fakeExtractor(table), services)
  assert.deepEqual(await rank('random words'), [])
})

test('AI-04 off-topic searches (closer to "food" than any service) return nothing', async () => {
  const rank = await createAiSearch(fakeExtractor(table), services)
  assert.deepEqual(await rank('pizza delivery'), [])
})

test('AI-05 never returns more than 3 services', async () => {
  const rank = await createAiSearch(fakeExtractor(table), services)
  assert.ok((await rank('everything broken')).length <= 3)
})

test('AI-06 an extractor failure is surfaced as a rejected promise (UI then keeps keyword search)', async () => {
  const broken = async () => { throw new Error('model failed') }
  await assert.rejects(createAiSearch(broken, services), /model failed/)
})
