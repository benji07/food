# Rédiger une recette — exemple complet

Ce guide complète [`../CLAUDE.md`](../CLAUDE.md) avec un exemple commenté de bout en
bout. Rappel essentiel : **ce blog n'est que du bookmarking**. On ne crée pas de
recette, on transcrit une recette existante en **créditant sa source**.

## 1. Choisir le dossier et le nom du fichier

- Sucré → `src/content/sucre/` · Salé → `src/content/sale/`
- Nom de fichier en **kebab-case ASCII** (sans accents) : il devient le slug d'URL.
  Ex : `src/content/sucre/cake-citron-pavot-vegan.md` →
  `/food/sucre/cake-citron-pavot-vegan/`.

## 2. Exemple complet

```markdown
---
title: "Cake citron pavot (vegan)"
description: "Un cake moelleux citron-pavot, sans œufs ni beurre, nappé d'un glaçage au citron."
date: 2023-06-15
tags: ["vegan", "citron", "cake", "goûter"]
source:
  url: "http://www.desfruitsetdeslegumes.com/cake-citron-plus-facile-vegan/"
  name: "Des fruits et des légumes"
sourceNote: "Le site d'origine n'existe plus ; recette sauvegardée ici pour ne pas la perdre."
servings: 8
servingsLabel: "1 cake (~8 parts)"
prepTime: 15
cookTime: 45
difficulty: facile
ingredients:
  - items:
      - { qty: 200, unit: "g", name: "farine" }
      - { qty: 125, unit: "g", name: "sucre de canne non raffiné" }
      - { qty: 0.5, unit: "c. à café", name: "bicarbonate" }
      - { name: "sel", note: "une pincée" }
      - { name: "le zeste d'un citron" }
      - { qty: 200, unit: "ml", name: "eau tiède" }
      - { qty: 85, unit: "ml", name: "huile végétale neutre" }
  - title: "Pour le glaçage"
    items:
      - { name: "le jus d'un petit citron" }
      - { qty: 100, unit: "g", name: "sucre glace" }
steps:
  - "Préchauffez le four à 180 °C. Mélangez les ingrédients secs."
  - "Ajoutez les liquides, mélangez, versez dans un moule et enfournez 40 à 45 min."
  - "Laissez tiédir, nappez du glaçage, laissez prendre et servez."
---

Une courte intro libre, des notes ou des astuces (facultatif). Les ingrédients et
les étapes restent dans le frontmatter ci-dessus, pas ici.
```

## 3. Champs, un par un

| Champ | Requis | Détail |
| --- | --- | --- |
| `title` | ✅ | Titre affiché. |
| `description` | ✅ | Résumé court (≤ ~160 car.), utilisé en listing, méta et RSS. |
| `date` | ✅ | `AAAA-MM-JJ`. Sert au tri (du plus récent au plus ancien). |
| `source.url` + `source.name` | ✅ | **Obligatoire.** Lien et nom de la source d'origine. |
| `draft` | — | `true` masque la recette en production. Défaut `false`. |
| `tags` | — | Liste de mots-clés. |
| `sourceNote` | — | Précision sur la source (ex : « site disparu »). |
| `servings` | — | Nombre de portions de référence → base du **recalcul** des quantités. |
| `servingsLabel` | — | Rendement libre affiché (« 12 muffins », « 4 personnes »). |
| `prepTime` / `cookTime` / `restTime` | — | Durées en **minutes** (entiers). |
| `difficulty` | — | `facile` \| `moyen` \| `difficile`. |
| `ingredients` | ✅ | Liste de **groupes** (voir ci-dessous). |
| `steps` | ✅ | Liste de paragraphes, dans l'ordre. |
| `cover` / `coverAlt` / `coverCredit` / `coverSource` | — | Voir `CLAUDE.md` → Images. |

### Ingrédients

- Toujours une **liste de groupes**. Recette simple → un seul groupe sans `title`.
- Un ingrédient : `{ qty?, unit?, name, note? }`.
  - `qty` numérique (`0.5`, pas `1/2`) → recalculé avec les portions.
  - Pas de `qty` pour « une pincée », « le zeste d'un citron » : tout dans `name`/`note`.

### Le recalcul des portions

Si `servings` est renseigné, la page affiche un sélecteur −/+ qui multiplie toutes
les quantités numériques. Les ingrédients sans `qty` restent inchangés. Sans
`servings`, pas de sélecteur.

## 4. Valider

```bash
npm run build
```

Le build applique le schéma Zod. S'il échoue, le message indique le fichier et le
champ fautif. Corrige, rebuild, puis commit.
