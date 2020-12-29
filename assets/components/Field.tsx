import { Component } from 'preact';

import Button from './base/Button';
import createSpecification from '../models/createSpecification';
import DragListControls from './base/DragListControls';
import Specifications from './field/Specifications';
import t from '../utils/t';
import {
  DataApi,
  OpeningHoursModel,
  SpecificationModel,
} from '../models/types';

import './Field.styl';

export interface Props {
  input: HTMLInputElement;
}

export default class Field extends Component<Props> implements DataApi {
  model: OpeningHoursModel;

  constructor(props: Props) {
    super(props);

    this.model = {
      specifications: [],
      ...JSON.parse(props.input.value),
    };
  }

  addSpec = () => {
    let { specifications } = this.model;
    specifications = [...specifications, createSpecification()];

    this.update({ specifications });
  };

  deleteSpec = (uid: string) => {
    const { specifications: specs } = this.model;
    this.update({
      specifications: specs.filter((spec) => spec.uid !== uid),
    });
  };

  render() {
    const { model } = this;
    return (
      <>
        <Specifications api={this} specs={model.specifications} />
        <DragListControls>
          <Button icon="add" dashed onClick={this.addSpec}>
            {t('Add specification')}
          </Button>
        </DragListControls>
      </>
    );
  }

  update(data: Partial<OpeningHoursModel>) {
    this.model = { ...this.model, ...data };
    this.props.input.value = JSON.stringify(this.model);

    this.forceUpdate();
  }

  updateSpec(uid: string, model: Partial<SpecificationModel>) {
    let { specifications } = this.model;
    specifications = specifications.map((specification) => {
      return specification.uid === uid
        ? { ...specification, ...model }
        : specification;
    });

    this.update({ specifications });
  }
}
