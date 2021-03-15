import { Component, JSX } from 'preact';
import { readyException } from 'jquery';
import { ComponentChildren, render } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

function Separator() {
  return <hr class="padded" />;
}

function Menu({
  menuIndex,
  items,
}: {
  menuIndex: number;
  items: Array<MenuItem>;
}) {
  return (
    <ul class="padded">
      {items.map((item, itemIndex) => (
        <Item
          id={`menu-${menuIndex}-${itemIndex}`}
          item={item}
          key={`item-${itemIndex}`}
        />
      ))}
    </ul>
  );
}

function Item({ id, item }: { id: string; item: MenuItem }) {
  return (
    <li className={item.isHidden ? 'hidden' : ''}>
      <a className={item.className} data-icon={item.icon} data-menu-id={id}>
        {item.label}
      </a>
    </li>
  );
}

export interface MenuItem {
  className?: string;
  icon: string;
  isHidden?: boolean;
  label: string;
  onClick: () => void;
}

export interface Props {
  items: Array<Array<MenuItem>>;
}

export default class DragListMenu extends Component<Props> {
  menuBtn: Garnish.MenuBtn | null = null;

  render() {
    const { items } = this.props;

    return (
      <>
        <a
          class="settings icon menubtn"
          title="Aktionen"
          aria-label="Aktionen"
          role="button"
          ref={this.setActions}
          tabIndex={0}
        ></a>

        <div class="menu">
          {items.map((item, index) => (
            <>
              {index > 0 ? <Separator key={`sep-${index}`} /> : null}
              <Menu items={item} key={`menu-${index}`} menuIndex={index} />
            </>
          ))}
        </div>
      </>
    );
  }

  onMenuOptionSelect = (option: Element) => {
    const { items } = this.props;
    const id = option.getAttribute('data-menu-id') || '';
    const match = /^menu-(\d+)-(\d+)$/.exec(id);
    if (!match) {
      return;
    }

    const group = items[parseInt(match[1])];
    if (!group) {
      return;
    }

    const item = group[parseInt(match[2])];
    if (item) {
      item.onClick();
    }
  };

  setActions = (el: HTMLAnchorElement | null) => {
    let { menuBtn } = this;
    if (menuBtn) {
      menuBtn.destroy();
      this.menuBtn = null;
    }

    if (el) {
      this.menuBtn = menuBtn = new Garnish.MenuBtn($(el));
      menuBtn.menu.settings.onOptionSelect = this.onMenuOptionSelect;
    }
  };
}
