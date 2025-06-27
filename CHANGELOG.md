#### 0.1.0 (2025-06-27)

##### Documentation Changes

* **packages:**  add authors and contributors, add description to all packages (665de8bb)
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
  *  update docs website responsive, add import maps example in button component (fdb44a7e)
  *  update docs layout min-height variables for header and footer (8f5c9738)
  *  prepare for initial release (2b83c28c)
  *  add pages for foundations and components (f78f346a)
* **accordion:**
  *  add accordion css layer (d4296269)
  *  add accordion component main behaviors (74f69a3a)
  *  add accordion component main behaviors (0454b20f)
  *  add details/accordion component (822071a2)
* **select:**  add empty component code structure (231dede7)
* **tooltip:**  add empty component code structure (ea741227)
* **core:**  :recycle: expose string helpers instead of string prototype extensions (fixes #4) (60ab1c72)
* **input:**  add check for ariaLabel in order to avoid rendering wrapping label element (abce7a00)
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

* **package-manager:**  replace yarn with pnpm (2182f651)
* **commitlint:**  add --from-last-tag flag for the commitlint script (d2899ff6)
* **husky:**  fix husky pre push hook (e0bb781f)
*  update github actions, gitignore, package.json build script; remove dist folder (fixes #12) (c6bf8043)
* **docs:**  fix handleAsideMenu method (07ea15dc)

##### Refactors

* **structure:**  refactor of files and libraries import/export structures (34479dff)

##### Tests

* **relase:**  replace npm in relase.mjs script in favor or pnpm (4eb06f4f)
