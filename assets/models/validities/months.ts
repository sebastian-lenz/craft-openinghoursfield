import MonthsValidity from '../../components/field/Validity/MonthsValidity';
import formatMonths from '../../utils/formatMonths';
import formatWeekDays from '../../utils/formatWeekDays';
import t from '../../utils/t';
import { MonthsValidityModel, ValidityApi } from '../types';

const monthsValidity: ValidityApi<MonthsValidityModel> = {
  value: 'months',
  editor: MonthsValidity,
  explain({ months, weekDays }) {
    if (!months.length || !weekDays.length) {
      return [t('Never')];
    }

    return [formatMonths(months), formatWeekDays(weekDays)];
  },
  create() {
    return {
      type: 'months',
      months: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      weekDays: [0, 1, 2, 3, 4, 5, 6],
    };
  },
  label() {
    return t('In certain months');
  },
};

export default monthsValidity;
