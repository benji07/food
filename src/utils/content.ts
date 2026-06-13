import { getCollection, type CollectionKey, type CollectionEntry } from 'astro:content';

// Récupère les entrées d'une collection : brouillons masqués en production,
// triées de la plus récente à la plus ancienne.
export async function getPublished<C extends CollectionKey>(
  collection: C
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection, ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });
  return entries.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  ) as CollectionEntry<C>[];
}
