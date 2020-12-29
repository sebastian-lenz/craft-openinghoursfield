import FieldPanel from '../../base/FieldPanel';
import Select from '../../base/Select';
import t from '../../../utils/t';
import validities from '../../../models/validities';
import { AnyValidity } from '../../../models/types';

export interface Props {
  onChange: (value: AnyValidity) => void;
  value: AnyValidity;
}

export default function Validity({ onChange, value }: Props) {
  const { type } = value;
  const option = validities.find((validity) => validity.value === type);

  return (
    <>
      <FieldPanel label={t('This specification applies')}>
        <Select
          onChange={({ create }) => onChange(create())}
          options={validities}
          value={type}
        />
      </FieldPanel>

      {option ? (
        <option.editor
          onUpdate={(validity) => onChange(validity)}
          validity={value}
        />
      ) : null}
    </>
  );
}
