// Placeholder « flou doux » pour les recettes sans cover, façon BlurHash mais
// 100 % CSS (aucune dépendance, aucun JS côté client). À partir du titre on
// dérive une couleur de base et quelques taches de couleur (radial-gradient)
// fondues les unes dans les autres. Le résultat est déterministe : un même
// titre donne toujours le même dégradé, mais deux titres différents diffèrent.

// Hash de chaîne simple et stable (variante FNV-1a 32 bits).
function hash(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Générateur pseudo-aléatoire déterministe (mulberry32) amorcé par le hash.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Renvoie une valeur de propriété CSS `background` colorée, prête à poser en
// style inline. On balaie tout le cercle des teintes (palette non limitée au
// sépia du site), avec saturation/luminosité maîtrisées pour rester agréable.
export function placeholder(seed: string): string {
  const rand = mulberry32(hash(seed));

  const baseHue = Math.floor(rand() * 360);
  // Décalages harmoniques autour de la teinte de base (analogues + complément).
  const offsets = [0, 35, -40, 160];

  const blobs = offsets.map((offset) => {
    const hue = (baseHue + offset + 360) % 360;
    const sat = 55 + Math.floor(rand() * 20); // 55–75 %
    const lum = 45 + Math.floor(rand() * 20); // 45–65 %
    const x = Math.floor(rand() * 100); // position en %
    const y = Math.floor(rand() * 100);
    const r = 45 + Math.floor(rand() * 40); // rayon en %
    return `radial-gradient(circle at ${x}% ${y}%, hsl(${hue} ${sat}% ${lum}%) 0%, hsla(${hue}, ${sat}%, ${lum}%, 0) ${r}%)`;
  });

  // Couleur de fond unie (teinte de base, plus sombre) en repli sous les taches.
  const baseColor = `hsl(${baseHue} 45% 38%)`;
  return `${blobs.join(', ')}, ${baseColor}`;
}
