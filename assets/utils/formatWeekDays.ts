import toIntervals from './toIntervals';

export default function formatWeekDays(
  weekDays: Array<number>,
  short: boolean = true
) {
  const { firstDay } = Craft.datepickerOptions;
  const dayNames = short
    ? Craft.datepickerOptions.dayNamesShort
    : Craft.datepickerOptions.dayNames;

  return toIntervals(weekDays, 6)
    .map(([min, max]) => {
      if (min === max) {
        return dayNames[min];
      } else if (min === 0 && max === 6 && firstDay) {
        return `${dayNames[1]}–⁠${dayNames[0]}`;
      }

      return `${dayNames[min]}–⁠${dayNames[max]}`;
    })
    .join(', ');
}
