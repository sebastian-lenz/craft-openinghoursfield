import { useEffect, useRef } from 'preact/hooks';

import createDate from '../../utils/createDate';
import formatDate from '../../utils/formatDate';

export interface Props {
  onChange: (value: string) => void;
  value: string;
}

export default function DateInput({ onChange, value }: Props) {
  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    jQuery(ref.current)
      .datepicker(Craft.datepickerOptions)
      .on('change', () => {
        const date = jQuery(ref.current).datepicker('getDate');
        if (date) {
          onChange(createDate(date));
        }
      });

    return () => {
      jQuery(ref.current).datepicker('destroy');
    };
  }, []);

  return (
    <div class="datewrapper">
      <input
        autocomplete="off"
        className="text"
        ref={ref}
        size={10}
        value={formatDate(value)}
      />
      <div data-icon="date"></div>
    </div>
  );
}
