import DateInput from '../../base/DateInput';
import { DatesValidityModel, ValidityEditorProps } from '../../../models/types';
import Dates from '../Dates';

export default function DatesValidity({
  onUpdate,
  validity,
}: ValidityEditorProps<DatesValidityModel>) {
  return (
    <Dates
      onUpdate={(dates) => onUpdate({ ...validity, dates })}
      value={validity.dates}
    />
  );
}
