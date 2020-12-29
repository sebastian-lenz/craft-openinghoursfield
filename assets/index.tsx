/// <reference path="../node_modules/craft-cp-typings/index.d.ts"/>

import { render } from 'preact';
import Field from './components/Field';

const glob: any = (() => {
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('Unable to locate global object');
})();

const nsRoot = glob['lenz'] || (glob['lenz'] = {});
const nsField = nsRoot['openingHours'] || (nsRoot['openingHours'] = {});

nsField.create = function (id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const input = el.querySelector('input');
  const root = el.querySelector('.tohField--app');
  if (!input || !root) return;

  render(<Field input={input} />, root);
};
