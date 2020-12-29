export default function createTime(
  hours: number,
  minutes: number,
  seconds: number = 0
): number {
  return (hours * 60 + minutes) * 60 + seconds;
}
