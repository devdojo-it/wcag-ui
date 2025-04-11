import staticExt from './_static';
import prototypeExt from './_prototype';

// TODO: check already existing extension methods, and warn in the console in that case
Object.defineProperties(String, staticExt);
Object.defineProperties(String.prototype, prototypeExt);
