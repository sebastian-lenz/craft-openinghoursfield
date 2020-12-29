import AlwaysValidity from '../../components/field/Validity/AlwaysValidity';
import formatWeekDays from '../../utils/formatWeekDays';
import t from '../../utils/t';
import { AlwaysValidityModel, ValidityApi } from '../types';

const alwaysValidity: ValidityApi<AlwaysValidityModel> = {
  value: 'always',
  editor: AlwaysValidity,
  explain({ weekDays }) {
    return [weekDays.length === 0 ? t('Never') : formatWeekDays(weekDays)];
  },
  create() {
    return {
      type: 'always',
      weekDays: [0, 1, 2, 3, 4, 5, 6],
    };
  },
  label() {
    return t('Always');
  },
};

export default alwaysValidity;
