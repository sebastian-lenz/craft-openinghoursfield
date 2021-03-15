import { ComponentType } from 'preact';

// Primitives
// ----------

export type DateRangeModel = {
  from: string;
  to: string;
  uid: string;
};

export interface TimeRangeModel {
  closes: number;
  uid: string;
  opens: number;
}

// API
// ---

export interface DataApi {
  deleteSpec(uid: string): void;
  update(model: Partial<OpeningHoursModel>): void;
  updateSpec(uid: string, model: Partial<SpecificationModel>): void;
}

export type ValidityEditorType<T extends ValidityModel> = ComponentType<
  ValidityEditorProps<T>
>;

export interface ValidityEditorProps<T extends ValidityModel = any> {
  onUpdate: (validity: T) => void;
  validity: T;
}

export interface ValidityApi<T extends ValidityModel = AnyValidity> {
  create(): T;
  editor: ValidityEditorType<T>;
  explain(validity: T): string[];
  label(): string;
  value: T['type'];
}

// Field data
// ----------

export interface OpeningHoursModel {
  specifications: Array<SpecificationModel>;
}

export interface SpecificationModel {
  enabled: boolean;
  state: 'closed' | 'opened';
  timeRanges: Array<TimeRangeModel>;
  uid: string;
  validity: AnyValidity;
}

// Validity data
// -------------

export type AnyValidity =
  | AlwaysValidityModel
  | DatesValidityModel
  | MonthsValidityModel
  | RangesValidityModel;

export interface ValidityModel {
  type: string;
}

export interface AlwaysValidityModel {
  type: 'always';
  weekDays: Array<number>;
}

export interface DatesValidityModel {
  type: 'dates';
  dates: Array<string>;
}

export interface MonthsValidityModel {
  type: 'months';
  months: Array<number>;
  weekDays: Array<number>;
}

export interface RangesValidityModel {
  type: 'ranges';
  dateRanges: Array<DateRangeModel>;
  weekDays: Array<number>;
}
