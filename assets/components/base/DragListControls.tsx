import { ComponentChildren } from 'preact';

export interface Props {
  children?: ComponentChildren;
}

export default function DragListControls({ children }: Props) {
  return (
    <div className="buttons last">
      <div className="btngroup">{children}</div>
    </div>
  );
}
