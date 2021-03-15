import alwaysValidity from './validities/always';
import createUid from '../utils/createUid';
import { SpecificationModel } from './types';

export default function createSpecification(): SpecificationModel {
  return {
    enabled: true,
    uid: createUid(),
    state: 'opened',
    timeRanges: [],
    validity: alwaysValidity.create(),
  };
}
