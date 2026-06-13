import type { CollectionKey } from 'astro:content';

// Métadonnées partagées par les catégories du blog.
// Centralisées ici pour éviter toute duplication dans les pages/composants.
// Ajouter une catégorie = une entrée ici + un dossier src/content/<slug>/ +
// les deux pages src/pages/<slug>/ (index + [...slug]).
export interface Category {
  collection: CollectionKey;
  slug: string; // segment d'URL (sous base)
  label: string; // libellé affiché
  singular: string;
  description: string;
}

export const categories: Category[] = [
  {
    collection: 'sucre',
    slug: 'sucre',
    label: 'Sucré',
    singular: 'Recette sucrée',
    description:
      'Gâteaux, biscuits, desserts et autres douceurs que je refais régulièrement.',
  },
  {
    collection: 'sale',
    slug: 'sale',
    label: 'Salé',
    singular: 'Recette salée',
    description:
      'Plats, entrées et accompagnements du quotidien, glanés au fil de mes lectures.',
  },
];

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function categoryByCollection(collection: string): Category | undefined {
  return categories.find((c) => c.collection === collection);
}
