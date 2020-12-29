import * as cx from 'classnames';

import FieldPanel from '../../base/FieldPanel';
import t from '../../../utils/t';

import './index.styl';

interface Month {
  label: string;
  month: number;
}

const months: Array<Month> = (() => {
  const { monthNames } = Craft.datepickerOptions;
  return monthNames.map((label, month) => ({
    label,
    month,
  }));
})();

export interface Props {
  onChange: (value: Array<number>) => void;
  value: Array<number>;
}

export default function Months({ onChange, value }: Props) {
  function renderMonth({ label, month }: Month) {
    const checked = value.indexOf(month) !== -1;

    function onClick() {
      const next = checked
        ? value.filter((n) => n !== month)
        : [...value, month];

      onChange(next.sort());
    }

    return (
      <div
        className={cx('tohField--monthsItem', { checked })}
        key={month}
        onClick={onClick}
      >
        <div className={cx('checkbox', { checked })} />
        <span style={{ paddingLeft: 7 }}>{label}</span>
      </div>
    );
  }

  return (
    <FieldPanel label={t('In the months')}>
      <div className="tohField--months">{months.map(renderMonth)}</div>
    </FieldPanel>
  );
}
