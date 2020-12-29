import DatesValidity from '../../components/field/Validity/DatesValidity';
import createDate from '../../utils/createDate';
import formatDate from '../../utils/formatDate';
import t from '../../utils/t';
import { DatesValidityModel, ValidityApi } from '../types';

const datesValidity: ValidityApi<DatesValidityModel> = {
  value: 'dates',
  editor: DatesValidity,
  explain({ dates }: DatesValidityModel) {
    return dates.length
      ? [...dates].sort().map((date) => formatDate(date))
      : [t('Never')];
  },
  create() {
    return {
      type: 'dates',
      dates: [createDate()],
    };
  },
  label() {
    return t('At certain dates');
  },
};

export default datesValidity;
