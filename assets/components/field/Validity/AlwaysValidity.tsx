import Weekdays from '../Weekdays';
import {
  AlwaysValidityModel,
  ValidityEditorProps,
} from '../../../models/types';

export default function AlwaysValidity({
  onUpdate,
  validity,
}: ValidityEditorProps<AlwaysValidityModel>) {
  return (
    <Weekdays
      onChange={(weekDays) => onUpdate({ ...validity, weekDays })}
      value={validity.weekDays}
    />
  );
}
