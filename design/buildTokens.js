const fs = require('node:fs');
const path = require('node:path');

/**
 * Funzione di utilità per effettuare il merge profondo di due oggetti.
 * @param {Object} target
 * @param {Object} source
 * @returns {Object} L'oggetto target aggiornato.
 */
function mergeDeep(target, source) {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        if (!target[key]) {
          target[key] = {};
        }
        mergeDeep(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

/**
 * Estrae il valore effettivo dal token, gestendo riferimenti e modalità responsive
 */
function extractTokenValue(token) {
  if (!token) return null;
  
  // Gestisce i riferimenti ad altri token
  if (typeof token === 'string' && token.startsWith('{') && token.endsWith('}')) {
    // TODO: Implementare la risoluzione dei riferimenti
    return token;
  }

  // Gestisce i valori diretti
  if (token.$value || token.value) {
    return token.$value || token.value;
  }

  // Gestisce i valori responsive
  if (token.$extensions?.mode || token.extensions?.mode) {
    const modes = token.$extensions?.mode || token.extensions?.mode;
    return {
      default: modes.Desktop || modes.default,
      tablet: modes['Tablet Landascape'],
      mobile: modes.Mobile
    };
  }

  return null;
}

/**
 * Genera le media queries per i breakpoint responsive
 */
function generateMediaQueries(tokens) {
  const mediaQueries = {
    tablet: [],
    mobile: []
  };

  for (const [key, value] of Object.entries(tokens)) {
    if (typeof value === 'object' && value.default) {
      if (value.tablet) {
        mediaQueries.tablet.push(`    --${key}: ${value.tablet};`);
      }
      if (value.mobile) {
        mediaQueries.mobile.push(`    --${key}: ${value.mobile};`);
      }
      // Aggiorna il token con il valore di default
      tokens[key] = value.default;
    }
  }

  return mediaQueries;
}

/**
 * Funzione ricorsiva per appiattire le proprietà dell'oggetto.
 * Genera chiavi concatenate tramite il trattino, in modo da poterle utilizzare come variabili CSS.
 *
 * Esempio:
 * { colors: { primary: { base: "#007bff" } } }  diventa { "colors-primary-base": "#007bff" }
 *
 * @param {Object} obj Oggetto da appiattire.
 * @param {string} [prefix=''] Prefisso per la chiave ricorsiva.
 * @returns {Object} Oggetto appiattito.
 */
function flattenTokens(obj, prefix = '') {
  const result = {};
  
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      // Salta le chiavi che iniziano con $ o sono extensions
      if (key.startsWith('$') || key === 'extensions') continue;
      
      const newKey = prefix ? `${prefix}-${key.toLowerCase()}` : key.toLowerCase();
      
      if (typeof value === 'object' && value !== null) {
        const tokenValue = extractTokenValue(value);
        if (tokenValue !== null) {
          result[newKey] = tokenValue;
        } else {
          Object.assign(result, flattenTokens(value, newKey));
        }
      }
    }
  }
  
  return result;
}

// Percorsi file
const designDir = __dirname;
const outputFilePath = path.resolve(__dirname, '../packages/ui/core/styles/_tokens.css');

// Legge e unisce i file JSON
let aggregatedTokens = {};
const files = ['grid.json', 'specific-token.json', 'typography.json'];

for (const file of files) {
  const filePath = path.join(designDir, file);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    aggregatedTokens = mergeDeep(aggregatedTokens, jsonData);
  } catch (error) {
    console.error(`Errore durante il parsing di ${file}: ${error}`);
  }
}

// Appiattisce i token
const flatTokens = flattenTokens(aggregatedTokens);

// Genera le media queries
const mediaQueries = generateMediaQueries(flatTokens);

// Genera il CSS
let cssContent = ':root {\n';

// Raggruppa i token per categoria
const categories = {
  grid: '/* Grid System */',
  typography: '/* Typography */',
  spacing: '/* Spacing */',
  'border-radius': '/* Border Radius */',
  color: '/* Colors */'
};

// Genera le variabili CSS raggruppate per categoria
for (const [category, comment] of Object.entries(categories)) {
  cssContent += `\n  ${comment}\n`;
  for (const [key, value] of Object.entries(flatTokens)) {
    if (key.startsWith(category)) {
      cssContent += `  --${key}: ${value};\n`;
    }
  }
}

cssContent += '}\n\n';

// Aggiunge le media queries
if (mediaQueries.tablet.length > 0) {
  cssContent += `@media screen and (max-width: 1024px) {\n  :root {\n${mediaQueries.tablet.join('\n')}\n  }\n}\n\n`;
}

if (mediaQueries.mobile.length > 0) {
  cssContent += `@media screen and (max-width: 375px) {\n  :root {\n${mediaQueries.mobile.join('\n')}\n  }\n}\n`;
}

// Crea la directory se non esiste
const outputDir = path.dirname(outputFilePath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Scrive il file
fs.writeFileSync(outputFilePath, cssContent, 'utf8');
console.log(`File _tokens.css generato correttamente in ${outputFilePath}`); 
