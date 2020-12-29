import { Component } from 'preact';

import Button from '../../base/Button';
import createUid from '../../../utils/createUid';
import createTime from '../../../utils/createTime';
import t from '../../../utils/t';
import TimeRange from './TimeRange';
import { TimeRangeModel } from '../../../models/types';

import './index.styl';

export interface Props {
  onChange: (value: Array<TimeRangeModel>) => void;
  value: Array<TimeRangeModel>;
}

export default class TimeRanges extends Component<Props> {
  handleCreate = () => {
    const { onChange, value } = this.props;
    onChange([
      ...value,
      { uid: createUid(), opens: createTime(8, 0), closes: createTime(18, 0) },
    ]);
  };

  handelChange = (uid: string, model: Partial<TimeRangeModel>) => {
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
      <div className="tohField--timeRanges">
        {value.map((item) => (
          <TimeRange
            onChange={this.handelChange}
            onDelete={this.handleDelete}
            key={item.uid}
            value={item}
          />
        ))}
        <div className="tohField--timeRangeActions">
          <Button dashed icon="add" onClick={this.handleCreate}>
            {t('Add time slot')}
          </Button>
        </div>
      </div>
    );
  }
}
