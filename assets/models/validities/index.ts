import { ValidityApi } from '../types';
import always from './always';
import dates from './dates';
import months from './months';
import range from './ranges';

export default [always, dates, months, range] as Array<ValidityApi>;
