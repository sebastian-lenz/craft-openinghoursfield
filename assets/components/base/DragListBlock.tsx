import { ComponentChildren } from 'preact';

export interface Props {
  children: ComponentChildren;
  label?: string;
  onDelete?: () => void;
  preview?: string;
  uid: string;
}

export default function DragListBlock({
  children,
  label,
  onDelete,
  preview,
  uid,
}: Props) {
  return (
    <div class="matrixblock" data-uid={uid}>
      <div class="titlebar">
        <div class="blocktype">{label}</div>
        <div class="preview">{preview}</div>
      </div>
      <div class="actions">
        {onDelete ? (
          <a class="delete icon" role="button" onClick={onDelete} />
        ) : null}
        <a class="move icon" role="button" />
      </div>
      <div class="fields" style="opacity: 1; display: block;">
        {children}
      </div>
    </div>
  );
}
