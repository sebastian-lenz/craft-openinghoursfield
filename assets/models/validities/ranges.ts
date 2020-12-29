import RangesValidity from '../../components/field/Validity/RangesValidity';
import createDateRange from '../../utils/createDateRange';
import formatDateRanges from '../../utils/formatDateRanges';
import formatWeekDays from '../../utils/formatWeekDays';
import t from '../../utils/t';
import { RangesValidityModel, ValidityApi } from '../types';

const rangesValidity: ValidityApi<RangesValidityModel> = {
  value: 'ranges',
  editor: RangesValidity,
  explain({ dateRanges, weekDays }) {
    if (!dateRanges.length || !weekDays.length) {
      return [t('Never')];
    }

    return [formatDateRanges(dateRanges), formatWeekDays(weekDays)];
  },
  create() {
    return {
      type: 'ranges',
      dateRanges: [createDateRange()],
      weekDays: [0, 1, 2, 3, 4, 5, 6],
    };
  },
  label() {
    return t('Between certain dates');
  },
};

export default rangesValidity;
