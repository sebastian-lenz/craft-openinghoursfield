import TimeInput from '../../base/TimeInput';
import { TimeRangeModel } from '../../../models/types';

export interface Props {
  onChange: (uid: string, value: Partial<TimeRangeModel>) => void;
  onDelete: (uid: string) => void;
  value: TimeRangeModel;
}

export default function TimeRange({ onChange, onDelete, value }: Props) {
  return (
    <div className="tohField--timeRangesRow">
      <TimeInput
        value={value.opens}
        onChange={(opens) => onChange(value.uid, { opens })}
      />
      <TimeInput
        value={value.closes}
        onChange={(closes) => onChange(value.uid, { closes })}
      />
      <div
        class="delete icon"
        role="button"
        onClick={() => onDelete(value.uid)}
      />
    </div>
  );
}
