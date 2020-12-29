import { TimeRangeModel } from '../models/types';
import formatTime from './formatTime';

export default function formatTimeRange({
  closes,
  opens,
}: TimeRangeModel): string {
  return [formatTime(opens), formatTime(closes)].join('–');
}
