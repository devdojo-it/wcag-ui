import staticExt from "./_static";
import prototypeExt from "./_prototype";

Object.defineProperties(String, staticExt);
Object.defineProperties(String.prototype, prototypeExt);
