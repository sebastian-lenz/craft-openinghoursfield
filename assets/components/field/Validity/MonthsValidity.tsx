import Months from '../Months';
import Weekdays from '../Weekdays';
import {
  MonthsValidityModel,
  ValidityEditorProps,
} from '../../../models/types';

export default function MonthsValidity({
  onUpdate,
  validity,
}: ValidityEditorProps<MonthsValidityModel>) {
  return (
    <>
      <Months
        onChange={(months) => onUpdate({ ...validity, months })}
        value={validity.months}
      />
      <Weekdays
        onChange={(weekDays) => onUpdate({ ...validity, weekDays })}
        value={validity.weekDays}
      />
    </>
  );
}
