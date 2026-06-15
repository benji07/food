# benji07's food — guide pour l'agent

Ce dépôt est un blog culinaire statique (Astro) publié sur GitHub Pages. C'est un
**carnet de marque-pages** : il rassemble les recettes que Benjamin cuisine
régulièrement. La langue du site est le **français**.

## La règle d'or de ce blog : du bookmarking, pas de l'invention

**Aucune recette n'est inventée et aucune n'est « de la maison ».** Chaque recette
provient d'une source identifiable et doit la **créditer et y renvoyer**. Donc :

- **N'invente jamais une recette**, une quantité ou une étape. Tu transcris une
  recette qui existe déjà, à partir d'une **source réelle et vérifiable**.
- Le champ **`source` (url + name) est OBLIGATOIRE**. Une recette sans source fait
  échouer le build — c'est voulu.
- Reste fidèle à la source : on reprend les ingrédients et les étapes par commodité,
  on ne les « réécrit » pas pour s'en attribuer le mérite. En cas de doute, cite
  moins et renvoie davantage vers l'original.

## La règle d'or technique

**Pour ajouter une recette : crée UN seul fichier `.md` dans le bon dossier, puis
commit.** Ne modifie pas la configuration, les layouts, les composants, le workflow,
ni les autres recettes — sauf demande explicite.

## Où écrire

| Type | Dossier |
| --- | --- |
| Recette sucrée | `src/content/sucre/` |
| Recette salée | `src/content/sale/` |

## Nommage du fichier

- **kebab-case, ASCII, sans accents ni espaces** : le nom du fichier devient le slug
  de l'URL.
- Exemples : `cake-citron-pavot-vegan.md`, `gratin-dauphinois.md`.

## Frontmatter (en-tête YAML)

```yaml
title: "Titre de la recette"            # requis
description: "Résumé court (≤ 160 caractères)."  # requis
date: 2026-06-13                          # requis, format AAAA-MM-JJ
draft: false                              # false pour publier ; true pour masquer
tags: ["vegan", "citron"]                # optionnel

# Attribution OBLIGATOIRE — c'est du bookmarking.
source:
  url: "https://exemple.org/la-recette"   # requis (URL valide)
  name: "Nom du site, du blog ou de l'auteur"  # requis
sourceNote: "Ex : site disparu, sauvegardé ici."  # optionnel

servings: 4                               # optionnel — base du recalcul des portions
servingsLabel: "4 personnes"             # optionnel — rendement en texte libre
prepTime: 15                              # optionnel — minutes
cookTime: 45                              # optionnel — minutes
restTime: 0                               # optionnel — minutes
difficulty: facile                        # optionnel — facile | moyen | difficile

# Ingrédients : une liste de GROUPES. Une recette simple = un seul groupe sans titre.
ingredients:
  - items:
      - { qty: 200, unit: "g", name: "farine" }
      - { name: "sel", note: "une pincée" }   # sans qty : non recalculé
  - title: "Pour le glaçage"                  # sous-groupe optionnel
    items:
      - { qty: 100, unit: "g", name: "sucre glace" }

# Étapes : une liste de paragraphes, dans l'ordre.
steps:
  - "Première étape…"
  - "Deuxième étape…"
```

### Règles sur les ingrédients

- `qty` est une **quantité numérique** (recalculée quand on change les portions).
  Utilise un nombre (`0.5`, pas `1/2`). Pour les quantités non chiffrables (« une
  pincée », « le zeste d'un citron »), n'indique pas de `qty` : mets l'info dans
  `name` et/ou `note`.
- `unit` : `g`, `ml`, `c. à café`, `c. à soupe`, `pincée`… (chaîne libre).
- Groupe-les avec un `title` quand la recette a des parties distinctes (pâte, sauce,
  glaçage…).

## Le corps markdown (facultatif)

Sous le frontmatter, tu peux écrire une courte intro, des notes ou des astuces
(variantes, conseils de conservation…). Commence les éventuelles sections en `##`,
**jamais** `#` (le titre vient du frontmatter). Les ingrédients et les étapes ne se
mettent **pas** dans le corps : ils sont dans le frontmatter.

## Images (optionnel)

- **Par défaut, n'ajoute PAS de `cover`** : un dégradé de repli coloré s'affiche
  automatiquement. C'est l'option la plus sûre (jamais de build cassé).
- **Image locale (recommandé)** — fichier dans `src/assets/covers/`, puis
  `cover: ../../assets/covers/mon-image.jpg` + `coverAlt: "…"`.
- **URL externe (autorisé)** — `cover: "https://…"`. N'utilise que des images dont
  la licence le permet, ou la photo de la source en la créditant via `coverCredit`
  et `coverSource` (l'image devient cliquable vers la source).

## Avant de commit

Lance le build — c'est lui qui valide le schéma :

```bash
npm install   # la première fois seulement
npm run build
```

Si le build échoue, corrige le frontmatter signalé par l'erreur avant de commit.
Détails et exemple complet : voir `docs/AUTHORING.md`. Le déploiement (GitHub Pages)
se fait automatiquement à chaque push sur `main`.
