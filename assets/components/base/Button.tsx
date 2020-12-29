import * as cx from 'classnames';
import { ComponentChildren, JSX } from 'preact';

export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children?: ComponentChildren;
  dashed?: boolean;
  icon?: 'add';
}

export default function Button({
  active,
  children,
  dashed,
  icon,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cx('btn', icon, { active, dashed, icon: !!icon })}
      type="button"
    >
      {children}
    </button>
  );
}
