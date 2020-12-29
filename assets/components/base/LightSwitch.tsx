import * as cx from 'classnames';

import { useEffect, useRef } from 'preact/hooks';

export interface Props {
  onChange: (value: boolean) => void;
  value: boolean;
}

export default function Lightswitch({ onChange, value }: Props) {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    let lightSwitch = jQuery.data(ref.current, 'lightswitch');
    if (!lightSwitch) {
      lightSwitch = new Craft.LightSwitch(ref.current, {});
    }

    if (lightSwitch instanceof Craft.LightSwitch) {
      if (value) lightSwitch.turnOn();
      lightSwitch.onChange = () => {
        onChange(lightSwitch.on);
      };

      return () => lightSwitch.destroy();
    }
  }, []);

  return (
    <div
      className={cx('lightswitch', { on: value })}
      tabIndex={0}
      role="switch"
      ref={ref}
    >
      <div class="lightswitch-container">
        <div class="handle"></div>
      </div>
    </div>
  );
}
