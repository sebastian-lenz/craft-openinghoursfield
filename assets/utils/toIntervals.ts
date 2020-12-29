export type Interval = [number, number];

export default function toIntervals(
  values: Array<number>,
  loop: number = -1
): Array<Interval> {
  values = [...values].sort((a, b) => a - b);

  const intervals = values.reduce((intervals, value) => {
    const lastIndex = intervals.length - 1;
    if (lastIndex >= 0 && intervals[lastIndex][1] === value - 1) {
      intervals[lastIndex][1] = value;
    } else {
      intervals.push([value, value]);
    }

    return intervals;
  }, [] as Array<Interval>);

  const { length } = intervals;
  if (length > 1 && loop !== -1) {
    const first = intervals[0];
    const last = intervals[length - 1];
    if (first[0] === 0 && last[1] === loop) {
      intervals.shift();
      last[1] = first[1];
    }
  }

  return intervals;
}
