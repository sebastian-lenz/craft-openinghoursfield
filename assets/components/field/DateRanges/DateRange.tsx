import DateInput from '../../base/DateInput';
import { DateRangeModel } from '../../../models/types';

export interface Props {
  onChange: (uid: string, value: Partial<DateRangeModel>) => void;
  onDelete: (uid: string) => void;
  value: DateRangeModel;
}

export default function DateRange({ onChange, onDelete, value }: Props) {
  return (
    <div className="tohField--dateRangesRow">
      <DateInput
        value={value.from}
        onChange={(from) => onChange(value.uid, { from })}
      />
      <span>–</span>
      <DateInput
        value={value.to}
        onChange={(to) => onChange(value.uid, { to })}
      />
      <a
        class="delete icon"
        role="button"
        onClick={() => onDelete(value.uid)}
      />
    </div>
  );
}
