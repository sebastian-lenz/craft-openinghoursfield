import * as cx from 'classnames';
import { ComponentChildren } from 'preact';

import DragListMenu, { MenuItem } from './DragListMenu';
import t from './../../utils/t';

export interface Props {
  children: ComponentChildren;
  enabled?: boolean;
  label?: string;
  onDelete?: () => void;
  onEnabled?: (value: boolean) => void;
  preview?: string;
  uid: string;
}

export default function DragListBlock({
  children,
  enabled,
  label,
  onDelete,
  onEnabled,
  preview,
  uid,
}: Props) {
  const menuItems: Array<Array<MenuItem>> = [];

  if (onEnabled) {
    menuItems.push([
      {
        icon: 'enabled',
        isHidden: enabled,
        label: t('Activate'),
        onClick: () => onEnabled(true),
      },
      {
        icon: 'disabled',
        isHidden: !enabled,
        label: t('Deactivate'),
        onClick: () => onEnabled(false),
      },
    ]);
  }

  if (onDelete) {
    menuItems.push([
      {
        className: 'error',
        icon: 'remove',
        label: t('Remove'),
        onClick: onDelete,
      },
    ]);
  }

  return (
    <div className={cx('matrixblock', { disabled: !enabled })} data-uid={uid}>
      <div class="titlebar">
        <div class="blocktype">{label}</div>
        <div
          class="preview"
          style={{ textDecoration: enabled ? 'none' : 'line-through' }}
        >
          {preview}
        </div>
      </div>
      <div class="actions">
        {onEnabled && !enabled ? (
          <div class="status off" title={t('Deactivated')}></div>
        ) : null}
        {menuItems.length ? <DragListMenu items={menuItems} /> : null}
        <a class="move icon" role="button" />
      </div>
      <div class="fields" style="opacity: 1; display: block;">
        {children}
      </div>
    </div>
  );
}
