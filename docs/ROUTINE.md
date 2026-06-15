# Routine Claude Code — ajouter une recette depuis une URL

Contrairement à un blog éditorial, ce carnet **ne s'auto-alimente pas** : on n'invente
pas de recettes. La « routine » utile ici est **à la demande** : tu donnes une URL de
recette (ou une recette que tu as sous la main), et Claude Code la transforme en
fichier `.md` propre, conforme au schéma, **en conservant l'attribution**.

Tu peux t'en servir dans une session Claude Code classique, ou en créer une routine
planifiée pointant sur `benji07/food` / `main` avec **accès web activé** (pour aller
lire la page source).

## Prompt à copier

```text
Tu ajoutes UNE recette au blog « benji07's food » (dépôt courant). Lis d'abord
CLAUDE.md et docs/AUTHORING.md et respecte-les à la lettre. Rappel : ce site n'est
que du bookmarking — tu ne dois RIEN inventer, et la recette doit créditer et
renvoyer à sa source.

Recette à ajouter : <COLLE ICI L'URL DE LA RECETTE (ou la recette + sa source)>.
Catégorie : <sucre | sale> (déduis-la si évident).

1. Si tu as accès au web, ouvre l'URL et lis la recette : titre, ingrédients (avec
   quantités), étapes, temps et portions s'ils sont indiqués. Ne déduis aucune
   quantité que tu n'as pas lue ; en cas de doute, omets plutôt que d'inventer.
2. Choisis un nom de fichier kebab-case ASCII (sans accents) et crée-le dans
   src/content/<sucre|sale>/.
3. Remplis le frontmatter selon le schéma : title, description (≤160 car.), date du
   jour, tags pertinents, et surtout source.url + source.name OBLIGATOIRES (l'URL et
   le nom du site/auteur d'origine). Ajoute sourceNote si utile (ex : page d'archive).
   Structure les ingredients en groupes { qty?, unit?, name, note? } et les steps en
   liste de paragraphes. Renseigne servings/servingsLabel et les temps si la source
   les donne.
4. Le corps markdown reste court : une intro ou des notes facultatives, jamais les
   ingrédients ni les étapes (ils sont dans le frontmatter).
5. npm install si besoin, puis npm run build ; corrige le frontmatter tant que le
   build échoue (le schéma refuse notamment une recette sans source).
6. Commit clair (ex : « Ajoute <titre> (source : <nom>) ») et push sur main. Pas de PR.

Ne modifie aucun autre fichier que la nouvelle recette.
```

## Bon à savoir

- **Source obligatoire** : le build échoue si `source` manque. C'est le garde-fou du
  bookmarking — il n'y a pas de recette sans origine.
- **Quantités recalculables** : renseigne `servings` pour activer le sélecteur de
  portions ; mets des `qty` numériques (`0.5`, pas `1/2`).
- **Images** : par défaut, pas de `cover` (un dégradé de repli s'affiche). Si tu
  reprends la photo de la source, crédite-la via `coverCredit` + `coverSource`.
