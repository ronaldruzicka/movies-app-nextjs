/**
 * Formats an array of strings into a human-readable list with proper separators
 * @param items Array of strings to format
 * @param locale The locale to use for formatting (defaults to 'en')
 * @returns Formatted string with appropriate separators
 */
export function formatList(items: string[], locale = 'en-US'): string {
  if (!items?.length) {
    return '';
  }

  const formatter = new Intl.ListFormat(locale, {
    style: 'long',
    type: 'conjunction',
  });

  return formatter.format(items);
}
