# benji07's food

Un blog culinaire statique : **un carnet de marque-pages** pour les recettes que je
cuisine régulièrement. Publié sur GitHub Pages :
<https://benjamin.leveque.me/food/>

> **C'est uniquement du bookmarking.** Aucune recette n'est de moi, aucune n'est
> recopiée pour me l'approprier. Chaque recette **crédite et renvoie à sa source
> d'origine**, qu'il faut aller voir. Quelques quantités/étapes sont reprises par
> commodité (pour ne pas dépendre d'un site qui peut fermer — c'est déjà arrivé),
> mais l'intention est toujours de ramener vers l'original.

## Structure du contenu

Les recettes sont des fichiers Markdown rangés par catégorie :

| Catégorie | Dossier |
| --- | --- |
| Sucré | `src/content/sucre/` |
| Salé | `src/content/sale/` |

Le nom de fichier (en kebab-case) devient le slug de l'URL. Les ingrédients, les
étapes et les métadonnées (source, portions, temps) sont décrits dans le frontmatter
YAML, **validé au build** par un schéma Zod : une recette sans `source`, ou mal
remplie, fait échouer le build.

Pour ajouter une recette : voir [`CLAUDE.md`](./CLAUDE.md) (règles) et
[`docs/AUTHORING.md`](./docs/AUTHORING.md) (exemple complet commenté).
[`docs/ROUTINE.md`](./docs/ROUTINE.md) fournit un prompt « routine Claude Code »
pour transformer une URL de recette en fichier prêt à publier.

## Développement

```bash
npm install
npm run dev      # serveur local sur http://localhost:4321/food
npm run build    # build de production + validation du schéma
npm run preview  # sert le build de production
```

## Stack

- [Astro](https://astro.build) 6.4 (content collections + validation Zod)
- `@astrojs/sitemap` et `@astrojs/rss`
- Déploiement automatique sur GitHub Pages (GitHub Actions, voir
  `.github/workflows/deploy.yml`) à chaque push sur `main`.

> Première mise en ligne : dans les réglages GitHub du dépôt, choisir
> **Settings → Pages → Build and deployment → Source : GitHub Actions**.
