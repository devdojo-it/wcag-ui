/**
 * Parses command line arguments in the format --key=value or --key.
 * Returns an object with key-value pairs.
 *
 * @example <caption>Parse CLI arguments</caption>
 * const args = parseArgs(process.argv);
 * // args = { foo: 'bar', dryRun: true }
 *
 * @export
 * @param {string[]} argv - Array of CLI arguments (usually process.argv)
 * @returns {Object} Parsed arguments as key-value pairs
 */
export function parseArgs(argv) {
  const args = {};

  // Iterate over CLI arguments, skipping the first two (node and script path)
  for (const token of argv.slice(2)) {
    // Match --key or --key=value
    const m = token.match(/^--([^=\s]+)(?:=(.*))?$/);

    if (!m) {
      continue;
    }

    const key = m[1];
    // If no value is provided, treat as boolean true
    const val = m[2] === undefined ? true : m[2];
    args[key] = val;
  }

  return args;
}
