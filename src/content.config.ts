import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Champs communs à toutes les recettes. La validation Zod est le garde-fou :
// une recette mal remplie fait échouer le build avec une erreur précise,
// plutôt que de produire une page silencieusement cassée.
//
// IMPORTANT : ce blog n'est QUE du bookmarking. Aucune recette n'est de moi,
// aucune n'est « copiée » pour me l'approprier — chacune renvoie à sa source.
// Le champ `source` (url + name) est donc OBLIGATOIRE : une recette sans
// source fait échouer le build.
const baseFields = ({ image }: { image: () => ReturnType<typeof z.object> | any }) => ({
  title: z.string(),
  // Résumé court, réutilisé dans les listings et les métadonnées (≤ ~160 car.).
  description: z.string(),
  // Date au format ISO "2026-06-06" ; coerce parse la chaîne en vraie Date.
  date: z.coerce.date(),
  // Mettre à true pour masquer une recette en production.
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  // Image de couverture optionnelle. Deux formes acceptées :
  //  - un chemin relatif vers un fichier local (helper image() -> optimisé) ;
  //  - une URL externe (string) servie telle quelle via <img>.
  // Optionnelle -> une couverture manquante ne casse jamais le build (repli automatique).
  cover: z.union([image(), z.string().url()]).optional(),
  coverAlt: z.string().optional(),
  coverCredit: z.string().optional(),
  coverSource: z.string().url().optional(),
});

// Un ingrédient. `qty` (quantité numérique) est optionnelle : présente, elle
// est recalculée quand on change le nombre de portions ; absente (« une pincée
// de sel », « le zeste d'un citron »), seul le `name` est affiché.
const ingredient = z.object({
  qty: z.number().optional(),
  unit: z.string().optional(), // g, ml, c. à café, c. à soupe…
  name: z.string(),
  note: z.string().optional(), // ex : « bien mûre », « à température ambiante »
});

// Les ingrédients sont groupés (ex : « Pour la pâte », « Pour le glaçage »).
// Une recette sans sous-groupe = un seul groupe sans `title`.
const ingredientGroup = z.object({
  title: z.string().optional(),
  items: z.array(ingredient).min(1),
});

const recipeFields = ({ image }: { image: () => ReturnType<typeof z.object> | any }) => ({
  ...baseFields({ image }),
  // Attribution OBLIGATOIRE — le blog n'est que du bookmarking.
  source: z.object({
    url: z.string().url(),
    name: z.string(), // nom du site / blog / livre / auteur d'origine
  }),
  // Précision optionnelle (ex : « site disparu, sauvegardé ici »).
  sourceNote: z.string().optional(),
  // Nombre de portions de référence -> base du recalcul des quantités.
  servings: z.number().positive().optional(),
  // Rendement en texte libre (« 1 cake », « 12 muffins », « 4 personnes »).
  servingsLabel: z.string().optional(),
  // Durées en minutes.
  prepTime: z.number().int().nonnegative().optional(),
  cookTime: z.number().int().nonnegative().optional(),
  restTime: z.number().int().nonnegative().optional(),
  difficulty: z.enum(['facile', 'moyen', 'difficile']).optional(),
  ingredients: z.array(ingredientGroup).min(1),
  steps: z.array(z.string()).min(1),
});

const sucre = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sucre' }),
  schema: ({ image }) => z.object(recipeFields({ image })),
});

const sale = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sale' }),
  schema: ({ image }) => z.object(recipeFields({ image })),
});

export const collections = { sucre, sale };
