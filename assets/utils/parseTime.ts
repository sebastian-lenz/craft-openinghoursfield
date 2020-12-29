export default function parseTime(value: number) {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor(value / 60) % 60;
  const seconds = value % 60;

  return [hours, minutes, seconds];
}
