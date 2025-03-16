Per creare una scala tipografica “modulare” (cioè in progressione geometrica) partendo dal minimo (1em) fino al massimo (2.5em), puoi usare questa formula generale:

\[
r = \Bigl(\frac{\text{massimo}}{\text{minimo}}\Bigr)^{\frac{1}{N-1}}
\]

dove “N” è il numero di step (in questo caso 6, da h6 a h1). Qui, il minimo è 1em e il massimo 2.5em, dunque:

\[
r = (2.5/1)^{1/5} \approx 2.5^{0.2} \approx 1.201
\]

Quindi, partendo da h6 = 1em, la scala ideale (in una progressione geometrica) sarebbe:

- h6 = \(1em \times r^0 = 1em\)
- h5 = \(1em \times r^1 \approx 1 \times 1.201 \approx 1.201em\)
- h4 = \(1em \times r^2 \approx 1.201^2 \approx 1.443em\)
- h3 = \(1em \times r^3 \approx 1.201^3 \approx 1.731em\)
- h2 = \(1em \times r^4 \approx 1.201^4 \approx 2.074em\)
- h1 = \(1em \times r^5 \approx 1.201^5 \approx 2.5em\)

Noterai che questi valori sono molto vicini a quelli che hai indicato (ad esempio h5 da 1em a 1.25em, h4 da 1.25em a 1.5em, ecc.), ma non coincidono esattamente:  
- Il tuo t5 (presumibilmente h5) è 1.25em contro 1.201em,  
- t4 (h4) è 1.5em contro 1.443em,  
- t3 (h3) è 1.75em contro 1.731em,  
- t2 (h2) è 2.375em contro 2.074em.

Questo indica che la scala che hai riportato potrebbe essere stata “aggiustata” manualmente per esigenze visive o per ottenere un determinato ritmo tipografico, mentre una progressione geometrica pura con base \(r \approx 1.201\) porterebbe ai valori calcolati sopra.

**Considerando che 1em = 16px**, avresti in pixel:
- h6: \(16px\)
- h5: \(16 \times 1.201 \approx 19.22px\)
- h4: \(16 \times 1.443 \approx 23.09px\)
- h3: \(16 \times 1.731 \approx 27.70px\)
- h2: \(16 \times 2.074 \approx 33.18px\)
- h1: \(16 \times 2.5 = 40px\)

Riassumendo, **la ratio da elevare progressivamente (se si vuole una progressione geometrica pura) è circa 1.201**, ottenuta con:

\[
r = 2.5^{\frac{1}{5}} \approx 1.201
\]

Da qui, puoi ottenere ogni step come \(1em \times r^{n}\) con \(n = 0, 1, 2, 3, 4, 5\).

Se i valori esatti che vuoi usare (ad es. 1.25em, 1.5em, 1.75em, 2.375em, 2.5em) non seguono perfettamente una progressione geometrica, potrebbe essere perché sono stati leggermente arrotondati o modificati per esigenze di design. Tuttavia, il metodo per ottenere una scala modulare geometrica è proprio quello indicato.
