# .ai — LLM & AI-Assisted Development Guidelines

This folder contains structured instructions to guide LLMs, copilots, and AI agents during development on the **wcag-ui** project.

## Structure

```
.ai/
├── README.md                          ← This file
├── instructions/
│   ├── general.md                     ← General LLM rules
│   ├── javascript.md                  ← JavaScript conventions
│   ├── css.md                         ← CSS conventions
│   ├── html.md                        ← HTML conventions
│   └── testing.md                     ← Testing patterns and conventions
├── context/
│   ├── architecture.md                ← Project architecture
│   ├── component-anatomy.md           ← wcag-ui component anatomy
│   ├── design-tokens.md               ← Design tokens and CSS variable system
│   ├── accessibility.md               ← WCAG 2.2 patterns and accessibility
│   ├── build-and-release.md           ← Build, release, and publishing pipeline
│   └── cli-scripts.md                 ← CLI scripts and automation
├── skills/                            ← Agent Skills (agentskills.io standard)
│   ├── custom-element-building/       ← Build components (JS + CSS + ARIA)
│   │   └── SKILL.md
│   ├── custom-element-testing/        ← Unit test components (node:test + happy-dom)
│   │   └── SKILL.md
│   └── accessibility-testing/         ← A11y audit components (axe-core + WCAG 2.2)
│       └── SKILL.md
├── styleguides/                       ← Merged coding styleguides
│   ├── css.md                         ← CSS styleguide (project-specific + general)
│   ├── html.md                        ← HTML styleguide (project-specific + general)
│   ├── javascript.md                  ← JavaScript styleguide (project-specific + general)
│   └── accessibility.md               ← Accessibility styleguide (WCAG 2.2)
├── prompts/                           ← Reusable prompt templates
│   ├── create-component.prompt.md     ← Create a new component
│   ├── add-css-variant.prompt.md      ← Add CSS variant to a component
│   ├── add-css-state.prompt.md        ← Add CSS state to a component
│   ├── add-design-token.prompt.md     ← Add a global design token
│   ├── create-docs-page.prompt.md     ← Create a documentation page
│   ├── extend-cli-script.prompt.md    ← Extend a CLI script
│   └── add-color-scheme.prompt.md     ← Add light/dark color scheme support
```

> The `skills/`, `styleguides/`, `instructions/`, and `prompts/` folders are symlinked into `.github/` for broad tool compatibility.

## How to Use

- **AI-assisted development**: AI agents should read `instructions/general.md` as a starting point, then dive into the relevant section for the task.
- **New component**: follow `context/component-anatomy.md` and the root `CONTRIBUTING.md`.
- **CSS changes**: consult `instructions/css.md` and `context/design-tokens.md`.
- **Architecture**: `context/architecture.md` provides the full map.
- **Agent skills**: the `skills/` folder contains self-contained skill definitions following the [agentskills.io](https://agentskills.io) open standard.
- **Prompts**: the `prompts/` folder contains reusable `*.prompt.md` templates for common development tasks.

## Guiding Principle

> **Existing code is the single source of truth.** All rules in this folder were extracted from the current codebase. When in doubt, refer to the implementation in packages.
