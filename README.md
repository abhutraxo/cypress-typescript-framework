## Test Setup

Checkout the common framework for the cypress.
At root directory `npm install`

---

## Running test in local

To run the test in Headless mode
`npx cypress open` - open the cypress application
Click on spec file to run the test

---

## Spec file

All spec files should be at
`cypress/e2e/test-suites/rapid-qa/**`
We must post fix `.e2e-spec.ts` for all the test files

---

## Configuration through command line

`npx run e2e -- --config --baseUrl=https://abc.com`
Multiple configuration can be passed with comma separation
use extra -- with custom commands
Refer https://docs.cypress.io/guides/references/configuration.html#Command-Line for more details

---
