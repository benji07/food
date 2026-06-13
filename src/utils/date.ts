// Formatage des dates en français, via l'API Intl native.
const formatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: Date): string {
  return formatter.format(date);
}

// Pour l'attribut datetime="" des balises <time>.
export function isoDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
