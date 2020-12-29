import formatTimeRange from '../utils/formatTimeRange';
import t from '../utils/t';
import { SpecificationModel } from './types';
import validities from './validities';

export default function explainSpecification(spec: SpecificationModel): string {
  const chunks = [];
  const validity = validities.find(
    (validity) => validity.value === spec.validity.type
  );

  if (validity) {
    chunks.push(...validity.explain(spec.validity));
  }

  if (spec.state === 'closed') {
    chunks.push(t('Closed'));
  } else if (spec.timeRanges.length) {
    const timeRanges = [...spec.timeRanges].sort((a, b) => a.opens - b.opens);
    chunks.push(...timeRanges.map(formatTimeRange));
  } else {
    chunks.push(t('Opened'));
  }

  return chunks.join(', ');
}
