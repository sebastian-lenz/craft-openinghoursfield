import { Component } from 'preact';

import Button from '../../base/Button';
import createDate from '../../../utils/createDate';
import FieldPanel from '../../base/FieldPanel';
import DateInput from '../../base/DateInput';
import t from '../../../utils/t';

import './index.styl';

export interface Props {
  onUpdate: (value: Array<string>) => void;
  value: Array<string>;
}

export default class Dates extends Component<Props> {
  handleAdd = () => {
    const { onUpdate, value } = this.props;
    onUpdate([...value, createDate()]);
  };

  handleDelete = (index: number) => {
    const { onUpdate, value } = this.props;
    const newValue = [...value];
    newValue.splice(index, 1);
    onUpdate(newValue);
  };

  handleUpdate = (at: number, newDate: string) => {
    const { onUpdate, value } = this.props;
    const newValue = value.map((oldDate, index) =>
      index === at ? newDate : oldDate
    );

    onUpdate(newValue);
  };

  render() {
    const { onUpdate, value } = this.props;

    return (
      <FieldPanel label={t('Dates')}>
        <div className="tohField--dates">
          {value.map((date, index) => (
            <div key={index} className="tohField--datesRow">
              <DateInput
                onChange={(newDate) => this.handleUpdate(index, newDate)}
                value={date}
              />
              <div
                className="delete icon"
                role="button"
                onClick={() => this.handleDelete(index)}
              />
            </div>
          ))}

          <div className="tohField--datesActions">
            <Button dashed icon="add" onClick={this.handleAdd}>
              {t('Add date')}
            </Button>
          </div>
        </div>
      </FieldPanel>
    );
  }
}
