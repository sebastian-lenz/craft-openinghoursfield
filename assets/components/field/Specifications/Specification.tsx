import DragListBlock from '../../base/DragListBlock';
import FieldPanel from '../../base/FieldPanel';
import Lightswitch from '../../base/LightSwitch';
import t from '../../../utils/t';
import TimeRanges from '../TimeRanges';
import Validity from '../Validity';
import { DataApi, SpecificationModel } from '../../../models/types';
import explainSpecification from '../../../models/explainSpecification';

export interface Props {
  api: DataApi;
  spec: SpecificationModel;
}

export default function Specification(props: Props) {
  const { api, spec } = props;

  return (
    <DragListBlock
      enabled={spec.enabled}
      label={t('Specification')}
      onDelete={() => api.deleteSpec(spec.uid)}
      onEnabled={(enabled) => api.updateSpec(spec.uid, { enabled })}
      preview={explainSpecification(spec)}
      uid={spec.uid}
    >
      <Validity
        onChange={(validity) => api.updateSpec(spec.uid, { validity })}
        value={spec.validity}
      />

      <FieldPanel label={t('Opening state')}>
        <Lightswitch
          onChange={(value) =>
            api.updateSpec(spec.uid, {
              state: value ? 'opened' : 'closed',
            })
          }
          value={spec.state === 'opened'}
        />
      </FieldPanel>

      {spec.state === 'opened' ? (
        <FieldPanel label={t('Opening times')}>
          <TimeRanges
            onChange={(timeRanges) => api.updateSpec(spec.uid, { timeRanges })}
            value={spec.timeRanges}
          />
        </FieldPanel>
      ) : null}
    </DragListBlock>
  );
}
