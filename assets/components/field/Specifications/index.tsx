import DragList from '../../base/DragList';
import Specification from './Specification';
import { DataApi, SpecificationModel } from '../../../models/types';

export interface Props {
  api: DataApi;
  specs: Array<SpecificationModel>;
}

export default function Specifications({ api, specs }: Props) {
  function handleChange(uids: Array<string>) {
    api.update({
      specifications: uids
        .map((uid) => specs.find((spec) => spec.uid === uid))
        .filter((spec): spec is SpecificationModel => !!spec),
    });
  }

  return (
    <DragList onChange={handleChange}>
      {specs.map((spec) => (
        <Specification api={api} key={spec.uid} spec={spec} />
      ))}
    </DragList>
  );
}
