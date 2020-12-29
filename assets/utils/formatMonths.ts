import toIntervals from './toIntervals';

export default function formatMonths(
  months: Array<number>,
  short: boolean = false
) {
  const monthNames = short
    ? Craft.datepickerOptions.monthNamesShort
    : Craft.datepickerOptions.monthNames;

  return toIntervals(months, 11)
    .map(([min, max]) =>
      min === max ? monthNames[min] : `${monthNames[min]}–⁠${monthNames[max]}`
    )
    .join(', ');
}
