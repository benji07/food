// Plugin rehype : transforme une image isolée dans un paragraphe en <figure>
// légendée, sans dépendance externe (parcours manuel de l'arbre hast).
//
// Convention d'écriture côté article (markdown) :
//
//   [![Texte alternatif](https://exemple.org/image.jpg "Auteur — Source, licence")](https://page-source)
//
//   - le `title` de l'image  -> texte de la légende (crédit, affiché en petit) ;
//   - le lien autour de l'image -> image cliquable vers la source ;
//   - sans lien (`![alt](url "crédit")`) : figure + légende, image non cliquable.
//
// Règle : un paragraphe dont le seul enfant significatif est un <img> (ou un
// <a> contenant un <img>) et dont l'<img> porte un `title` devient une <figure>.

/** Renvoie les enfants « significatifs » (on ignore le texte vide / espaces). */
function significantChildren(node) {
  return (node.children ?? []).filter(
    (child) => !(child.type === 'text' && child.value.trim() === '')
  );
}

/** Trouve l'élément <img> dans un nœud image ou lien-enveloppant-image. */
function findImage(node) {
  if (node.type !== 'element') return null;
  if (node.tagName === 'img') return node;
  if (node.tagName === 'a') {
    const inner = significantChildren(node);
    if (inner.length === 1 && inner[0].type === 'element' && inner[0].tagName === 'img') {
      return inner[0];
    }
  }
  return null;
}

export default function rehypeFigure() {
  return (tree) => {
    const visit = (node) => {
      if (!node.children) return;
      for (const child of node.children) {
        if (child.type === 'element' && child.tagName === 'p') {
          const inner = significantChildren(child);
          if (inner.length === 1) {
            const media = inner[0]; // <img> ou <a><img></a>
            const img = findImage(media);
            const title = img?.properties?.title;
            if (img && typeof title === 'string' && title.trim() !== '') {
              // Le title devient la légende ; on le retire de l'<img>.
              delete img.properties.title;
              child.tagName = 'figure';
              child.properties = { ...(child.properties ?? {}), className: ['figure'] };
              child.children = [
                media,
                {
                  type: 'element',
                  tagName: 'figcaption',
                  properties: { className: ['figure__credit'] },
                  children: [{ type: 'text', value: title }],
                },
              ];
            }
          }
        }
        visit(child);
      }
    };
    visit(tree);
  };
}
