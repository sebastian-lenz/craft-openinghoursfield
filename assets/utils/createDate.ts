export default function createDate(value: Date = new Date()): string {
  const year = value.getFullYear().toString().padStart(4, '0');
  const month = (value.getMonth() + 1).toString().padStart(2, '0');
  const date = value.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${date}`;
}
