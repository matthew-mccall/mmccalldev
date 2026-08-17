/**
 * Formats a date into a readable string (e.g., "July 26, 2025").
 *
 * This is the prerendered, no-JS fallback text for <time> elements — when
 * JavaScript runs, PageLayout re-renders each date with the visitor's own
 * locale (the <time> element itself never formats anything).
 * @param date The date to format
 * @returns A formatted date string
 */
export function formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date

    // Frontmatter dates parse as UTC midnight; format in UTC so the day
    // doesn't shift with the build machine's timezone.
    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    })
}
