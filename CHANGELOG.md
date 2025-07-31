#### 0.1.0-alpha (2025-06-30)

##### Tests

* **release:**  replace npm in release.mjs script in favor or pnpm (b26eceb9)

##### Documentation Changes

* **packages:**  add authors and contributors, add description to all packages (1ba51ffd)
*  added switch,textarea,tooltip,textfield and update (9b89d09f)
*  write something in .2 to describe how use the comp (cd2422fc)
*  Deleted useless section in documentation (8f14f69d)
* **button:**
  *  removed variants docs (0708efe7)
  *  add a description to variants for button (13f57f63)
  *  add button variants (449185cb)
  *  update primary button template (07859990)

##### New Features

* **docs:**
  *  update docs website responsive, add import maps example in button component (17f33440) 
  *  update docs website responsive (190662e7)
  *  update docs layout min-height variables for header and footer (8f5c9738)
  *  prepare for initial release (2b83c28c)
  *  add pages for foundations and components (f78f346a)
* **accordion:**
  *  add accordion component main behaviors (0454b20f)
  *  add details/accordion component (822071a2)
  *  add accordion css layer (10b31abb)
  *  add accordion component main behaviors (3fe3162b)
* **core:**  :recycle: expose string helpers instead of string prototype extensions (fixes #4) (60ab1c72)
* **input:**  add check for ariaLabel in order to avoid rendering wrapping label element (abce7a00)
* **select:**  add empty component code structure (3b51ee91)
* **tooltip:**  add empty component code structure (b82b32c8)
* **components:**
  *  add checkbox, switch and radio first draft (3724fa13)
  *  added css structure for button (271607d2)
  *  update core components and decorator structure (bac25bde)
* **maxart2501:**  pushing updates after first discussion with Massimo Artizzu, who just joined the project as Core Team Member (8dc2e699)
* **cname:**  added CNAME file (6acfd046)
* **gh-actions:**  add github actions (cf0e94a1)
* **footer:**  add footer styling and layout (e053f65b)
* **typography:**  add typography system (57bfa40b)
* **bootstrap:**  initialize project (caece15e)

##### Bug Fixes

*  update github actions, gitignore, package.json build script; remove dist folder (fixes #12) (c6bf8043)
* **docs:**  fix handleAsideMenu method (07ea15dc)
* **checkbox:**  remove empty lines from css code (57e3fbfe)
* **details:**  remove unused css code (8fbb0f3e)
* **textarea:**  remove unused css variables (7ab59db8)
* **accordion:**  fix accordion css structure (cbb6edbf)
* **package-manager:**  replace yarn with pnpm (56427ee6)
* **commitlint:**  add --from-last-tag flag for the commitlint script (1ab444f0)
* **husky:**  fix husky pre push hook (291b0318)

##### Refactors

* **structure:**  refactor of files and libraries import/export structures (34479dff)

