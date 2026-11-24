import * as fs from 'fs';

/**
 * Reads a simple CSV file (first row = column names) into a list of objects.
 * Keep it simple: values must not contain commas or quotes.
 *
 * Example: readCsv<{ amount: string }>('test-data/transfers.csv')
 */
export function readCsv<T = Record<string, string>>(filePath: string): T[] {
  const [header, ...rows] = fs.readFileSync(filePath, 'utf-8').trim().split(/\r?\n/);
  const columns = header.split(',').map((c) => c.trim());

  return rows
    .filter((row) => row.trim() !== '')
    .map((row) => {
      const values = row.split(',');
      return Object.fromEntries(columns.map((col, i) => [col, (values[i] ?? '').trim()])) as T;
    });
}
