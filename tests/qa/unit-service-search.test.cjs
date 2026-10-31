// Unit tests for src/utils/serviceSearch.js (Services page keyword search)
// Run: node --test tests/qa/unit-service-search.test.cjs
const assert = require('node:assert/strict')
const test = require('node:test')
const load = require('./_load.cjs')

const search = load('src/utils/serviceSearch.js')
const { allServices } = load('src/data/servicesData.js')
const index = search.buildIndex(allServices)
const slugs = (q) => search.searchServices(index, q).map((s) => s.slug)

test('UT-01 normalise() lower-cases, expands & and strips punctuation', () => {
  assert.equal(search.normalise('  Tap & Sink -- LEAK!! '), 'tap and sink leak')
  assert.equal(search.normalise(''), '')
})

test('UT-02 stem() reduces common word endings to the same root', () => {
  for (const w of ['leaking', 'leaks', 'leaky', 'leak']) assert.equal(search.stem(w), 'leak', w)
  assert.equal(search.stem('gas'), 'gas') // words of 3 letters or fewer are left alone
  assert.equal(search.stem('sinks'), 'sink')
})

test('UT-03 empty or whitespace query returns all 21 services in original order', () => {
  assert.equal(allServices.length, 21)
  assert.deepEqual(slugs(''), allServices.map((s) => s.slug))
  assert.deepEqual(slugs('    '), allServices.map((s) => s.slug))
  assert.equal(search.isConfidentMatch(index, ''), true)
})

test('UT-04 exact service name matches regardless of case', () => {
  assert.equal(slugs('plumbing')[0], 'plumbing')
  assert.equal(slugs('PLUMBING')[0], 'plumbing')
  assert.equal(slugs('Glazing')[0], 'glazing')
})

test('UT-05 partial words while typing still match (prefix of 3+ letters)', () => {
  assert.equal(slugs('plumb')[0], 'plumbing')
  assert.equal(slugs('pai')[0], 'painting-plastering')
})

test('UT-06 boundary: a 2-letter query is too short to match anything', () => {
  assert.deepEqual(slugs('pa'), [])
})

test('UT-07 one-letter typo in a longer word is tolerated', () => {
  assert.equal(slugs('electrcal')[0], 'electrical')
  assert.equal(slugs('plumbr')[0], 'plumbing')
})

test('UT-08 problem descriptions map to the correct trade', () => {
  const cases = {
    'leaking tap': 'plumbing',
    'Leaky taps!!': 'plumbing',
    'no power': 'electrical',
    'blocked gutter': 'gutter-cleaning',
    'locked out': 'locksmith',
    'broken window': 'glazing',
    'smashed shopfront glass': 'glazing',
    'aircon not cooling': 'heating-cooling',
    'tiles cracked': 'tiling',
    'rats in roof': 'pest-control',
    'graffiti on my wall': 'graffiti-removal',
  }
  for (const [q, expected] of Object.entries(cases)) assert.equal(slugs(q)[0], expected, q)
})

test('UT-09 whole-word matching: "blocked gutter" shows Gutter Cleaning only, not Locksmith', () => {
  assert.deepEqual(slugs('blocked gutter'), ['gutter-cleaning'])
  assert.ok(!slugs('blocked').includes('locksmith'))
})

test('UT-10 unrelated or junk input returns no results and is not a confident match', () => {
  for (const q of ['pizza', 'xyzzy', '1234', '<script>alert(1)</script>', 'a'.repeat(500)]) {
    assert.deepEqual(slugs(q), [], q)
    assert.equal(search.isConfidentMatch(index, q), false, q)
  }
})

test('UT-11 long descriptive sentence is NOT treated as confident (hands over to AI search)', () => {
  assert.equal(search.isConfidentMatch(index, 'scratching noises in the ceiling'), false)
})

test('UT-12 results are ranked best-first and weak matches are cut off', () => {
  const r = slugs('hot water')
  assert.equal(r[0], 'plumbing')
  assert.ok(r.length <= 3, `expected a short list, got ${r.length}`)
})

test('UT-13 every service has a title, slug, description and at least 5 keywords', () => {
  for (const s of allServices) {
    assert.ok(s.slug && s.title && s.description, s.slug)
    assert.ok(Array.isArray(s.keywords) && s.keywords.length >= 5, s.slug)
  }
  assert.equal(new Set(allServices.map((s) => s.slug)).size, allServices.length, 'slugs must be unique')
})

test('UT-14 "flies in kitchen" should point to Pest Control (DEF-05)', { todo: 'DEF-05 keyword gap' }, () => {
  assert.equal(slugs('flies in kitchen')[0], 'pest-control')
})
