import formatDate from './formatDate';
import parseDate from './parseDate';
import { DateRangeModel } from '../models/types';

export default function formatDateRanges(
  dateRanges: Array<DateRangeModel>
): string {
  return [...dateRanges]
    .map(({ from, to }) => {
      const fromDate = parseDate(from);
      const toDate = parseDate(to);
      return fromDate.getTime() < toDate.getTime()
        ? { from: fromDate, to: toDate }
        : { from: toDate, to: fromDate };
    })
    .sort((lft, rgt) =>
      lft.from.getTime() === rgt.from.getTime()
        ? lft.to.getTime() - rgt.to.getTime()
        : lft.from.getTime() - rgt.from.getTime()
    )
    .map(({ from, to }) => {
      let fromFormat = Craft.datepickerOptions.dateFormat;
      if (from.getFullYear() === to.getFullYear()) {
        fromFormat = fromFormat.replace(/y+/g, '');
      }

      return `${formatDate(from, fromFormat)}–${formatDate(to)}`;
    })
    .join(', ');
}
