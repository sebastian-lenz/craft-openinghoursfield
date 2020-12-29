import { Component } from 'preact';

import formatTime from '../../utils/formatTime';

export interface Props {
  onChange: (value: number) => void;
  value: number;
}

export default class TimeInput extends Component<Props> {
  element: HTMLInputElement | null = null;

  setElement = (value: HTMLInputElement | null) => {
    const { element } = this;
    this.element = value;

    if (element) {
      jQuery(element).datepicker('destroy');
    }

    if (value) {
      jQuery(value)
        .timepicker({
          ...Craft.timepickerOptions,
          defaultDate: new Date(),
          show2400: true,
        })
        .on('change', () => {
          const time = jQuery(value).timepicker('getSecondsFromMidnight');
          this.props.onChange(time);
        });
    }
  };

  render() {
    const { value } = this.props;

    return (
      <div class="timewrapper">
        <input
          autocomplete="off"
          className="text"
          ref={this.setElement}
          size={6}
          value={formatTime(value)}
        />
        <div data-icon="time"></div>
      </div>
    );
  }
}
