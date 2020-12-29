import parseDate from './parseDate';

export default function formatDate(
  value: string | Date,
  format: string = Craft.datepickerOptions.dateFormat
): string {
  return jQuery.datepicker.formatDate(
    format,
    typeof value === 'string' ? parseDate(value) : value
  );
}
