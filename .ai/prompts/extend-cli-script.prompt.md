# Extend CLI Script

## Prompt

Add a new option to the `component-add.mjs` CLI script.

Follow these steps:

1. Add the flag in the `parseArgs` section with the new option
2. Update the JSDoc at the top of the file with the option description
3. Implement the logic in the `main()` flow
4. Update `docs/COMPONENTS-CLI.md` with the new option
5. Update `.github/copilot-instructions.md` if the workflow changes
6. Update `.ai/context/cli-scripts.md` with the documentation
