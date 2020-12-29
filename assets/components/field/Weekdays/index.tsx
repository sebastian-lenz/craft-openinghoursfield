import * as cx from 'classnames';

import Button from '../../base/Button';
import FieldPanel from '../../base/FieldPanel';
import t from '../../../utils/t';

interface WeekDay {
  label: string;
  weekDay: number;
}

const weekDays: Array<WeekDay> = (() => {
  const { dayNamesShort, firstDay } = Craft.datepickerOptions;
  const weekDays = dayNamesShort.map((label, weekDay) => ({
    label,
    weekDay,
  }));

  if (firstDay) {
    weekDays.push(weekDays.shift() as any);
  }

  return weekDays;
})();

export interface Props {
  onChange: (value: Array<number>) => void;
  value: Array<number>;
}

export default function Weekdays({ onChange, value }: Props) {
  function renderWeekDay({ label, weekDay }: WeekDay) {
    const checked = value.indexOf(weekDay) !== -1;

    function onClick() {
      const next = checked
        ? value.filter((n) => n !== weekDay)
        : [...value, weekDay];

      onChange(next.sort());
    }

    return (
      <Button active={checked} key={weekDay} onClick={onClick}>
        <div className={cx('checkbox', { checked })} />
        <span style={{ paddingLeft: 7 }}>{label}</span>
      </Button>
    );
  }

  return (
    <FieldPanel label={t('On the weekdays')}>
      <div className="btngroup fullwidth">{weekDays.map(renderWeekDay)}</div>
    </FieldPanel>
  );
}
