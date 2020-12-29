import * as cx from 'classnames';
import { ComponentChildren } from 'preact';

export interface Props {
  children: ComponentChildren;
  id?: string;
  isRequired?: boolean;
  isTranslated?: boolean;
  label: string;
}

export default function FieldPanel({
  children,
  id,
  isRequired,
  isTranslated,
  label,
}: Props) {
  return (
    <div className="field width-100">
      <div className="heading">
        <label className={cx({ required: isRequired })} for={id}>
          {label}
        </label>
        {isTranslated ? (
          <div
            className="t9n-indicator"
            data-icon="language"
            title="Dieses Feld wird für jede Website übersetzt."
          ></div>
        ) : null}
      </div>
      <div className="input ltr">{children}</div>
    </div>
  );
}
