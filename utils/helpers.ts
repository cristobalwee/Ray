/**
 * Format a date object into a readable string
 * @param date The date to format
 * @param format 'full' for full date, 'short' for short date
 * @returns Formatted date string
 */
export const formatDate = (date: Date, format: 'full' | 'short' = 'full'): string => {
  const options: Intl.DateTimeFormatOptions = format === 'full' 
    ? { weekday: 'long', month: 'long', day: 'numeric' }
    : { month: 'short', day: 'numeric' };
  
  return date.toLocaleDateString('en-US', options);
};