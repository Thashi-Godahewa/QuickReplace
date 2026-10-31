# QA test suite (Test Plan v1.0)

These tests support the Quick Replace Test Plan. They use Node's built-in test
runner (`node:test`), the same as the existing `tests/*.test.cjs` SEO tests.

| File | Level | What it covers |
| --- | --- | --- |
| `unit-service-search.test.cjs` | Unit | Keyword search on the Services page (UT-01 to UT-14) |
| `unit-ai-search.test.cjs` | Unit | AI search ranking rules with a fake model (AI-01 to AI-06) |
| `api-enquiry.test.cjs` | Integration | `/api/enquiry` validation, uploads, spam, email (API-01 to API-22) |
| `e2e-browser.test.cjs` | System / E2E | Chromium: navigation, search, post code, contact form, responsive, images, axe accessibility, load time (E2E-01 to E2E-19) |
| `e2e-backlog.test.cjs` | Acceptance | One or more checks per Product Backlog item (BL-01 to BL-11) |
| `_load.cjs` | Helper | Compiles `src/` ES modules in memory with esbuild |

Tests marked `# TODO DEF-xx` are known defects. They are reported but do not fail
the run. When a defect is fixed, remove the `todo` option so the test guards it.

## Running

```bash
npm install                      # npm ci currently fails, see DEF-01
npm run build                    # needed by the SEO and E2E tests
node --test tests/qa/unit-*.test.cjs
node --test tests/qa/api-enquiry.test.cjs

# E2E needs Playwright and axe-core (not in package.json yet):
npm install --save-dev playwright@1.56.0 axe-core@4.10.3
npx playwright install chromium
node --test --test-concurrency=1 tests/qa/e2e-browser.test.cjs
node --test --test-concurrency=1 tests/qa/e2e-backlog.test.cjs
```

No real email is sent: the tests replace `transporter.sendMail`. Screenshots and
`axe-report.json` are written to `../evidence/` (outside the repo folder).

Suggested `package.json` scripts:

```json
"test:unit": "node --test tests/qa/unit-*.test.cjs",
"test:api": "node --test tests/qa/api-enquiry.test.cjs",
"test:e2e": "node --test --test-concurrency=1 tests/qa/e2e-*.test.cjs"
```
