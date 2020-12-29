import { Component } from 'preact';

import Button from '../../base/Button';
import createDateRange from '../../../utils/createDateRange';
import DateRange from './DateRange';
import t from '../../../utils/t';
import { DateRangeModel } from '../../../models/types';

import './index.styl';

export interface Props {
  onChange: (value: Array<DateRangeModel>) => void;
  value: Array<DateRangeModel>;
}

export default class DateRanges extends Component<Props> {
  handleCreate = () => {
    const { onChange, value } = this.props;
    onChange([...value, createDateRange()]);
  };

  handelChange = (uid: string, model: Partial<DateRangeModel>) => {
    const { onChange, value } = this.props;
    onChange(
      value.map((item) => (item.uid === uid ? { ...item, ...model } : item))
    );
  };

  handleDelete = (uid: string) => {
    const { onChange, value } = this.props;
    onChange(value.filter((item) => item.uid !== uid));
  };

  render() {
    const { value } = this.props;

    return (
      <div className="tohField--dateRanges">
        {value.map((item) => (
          <DateRange
            onChange={this.handelChange}
            onDelete={this.handleDelete}
            key={item.uid}
            value={item}
          />
        ))}
        <div className="tohField--timeRangeActions">
          <Button dashed icon="add" onClick={this.handleCreate}>
            {t('Add date range')}
          </Button>
        </div>
      </div>
    );
  }
}
