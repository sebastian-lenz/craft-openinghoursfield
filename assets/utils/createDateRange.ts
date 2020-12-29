import createDate from './createDate';
import createUid from './createUid';
import { DateRangeModel } from '../models/types';

export default function createDateRange(): DateRangeModel {
  return { from: createDate(), to: createDate(), uid: createUid() };
}
