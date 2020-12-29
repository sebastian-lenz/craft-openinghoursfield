import DateRanges from '../DateRanges';
import Weekdays from '../Weekdays';
import {
  RangesValidityModel,
  ValidityEditorProps,
} from '../../../models/types';

export default function RangesValidity({
  onUpdate,
  validity,
}: ValidityEditorProps<RangesValidityModel>) {
  return (
    <>
      <DateRanges
        onChange={(dateRanges) => onUpdate({ ...validity, dateRanges })}
        value={validity.dateRanges}
      />
      <Weekdays
        onChange={(weekDays) => onUpdate({ ...validity, weekDays })}
        value={validity.weekDays}
      />
    </>
  );
}
