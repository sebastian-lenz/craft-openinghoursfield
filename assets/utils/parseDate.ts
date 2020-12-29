export default function parseDate(value: string): Date {
  const match = /(\d+)-(\d+)-(\d+)/.exec(value);
  return match
    ? new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]))
    : new Date();
}
