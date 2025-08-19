const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export function formatDate(date: string | undefined): string {
  if (!date) {
    return '';
  }

  return formatter.format(new Date(date));
}
