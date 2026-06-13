// Préfixe tous les liens internes par le `base` du site (ex : /food).
// Indispensable sur une page de projet GitHub Pages servie sous un sous-chemin.
// Robuste quelle que soit la présence d'un slash final sur BASE_URL.
const BASE = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  const base = BASE.replace(/\/+$/, ''); // -> "/food"
  const clean = path.replace(/^\/+/, ''); // retire les slashs de tête
  return clean ? `${base}/${clean}` : `${base}/`;
}

// Lien vers l'éditeur GitHub du fichier source d'une recette. Ouvre l'éditeur
// en ligne : un visiteur sans droits d'écriture est automatiquement invité à
// forker le dépôt et à proposer une Pull Request — le chemin le plus court pour
// soumettre une correction.
const REPO = 'https://github.com/benji07/food';
const DEFAULT_BRANCH = 'main';

export function githubEditUrl(collection: string, id: string): string {
  return `${REPO}/edit/${DEFAULT_BRANCH}/src/content/${collection}/${id}.md`;
}
