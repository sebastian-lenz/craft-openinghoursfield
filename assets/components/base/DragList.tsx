import { Component, ComponentChildren, JSX } from 'preact';

export interface Props {
  axis?: 'x' | 'y';
  children: ComponentChildren;
  className?: string;
  handle?: string;
  onChange: (values: Array<string>) => void;
}

export default class DragList extends Component<Props> {
  drag: Garnish.DragSort | null = null;
  element: HTMLElement | null = null;

  componentDidUpdate() {
    const { drag, element } = this;
    const $items = drag ? drag.$items : null;
    if (!drag || !element || !$items) return;

    for (let index = 0; index < element.children.length; index++) {
      const child = element.children[index] as HTMLElement;
      if ($items.index(child) === -1) {
        drag.addItems($(child));
      }
    }

    for (let index = 0; index < $items.length; index++) {
      const item = $items[index] as HTMLElement;
      if (item.parentElement !== element) {
        drag.removeItems($(item));
      }
    }
  }

  render() {
    const { children, className = 'blocks' } = this.props;

    return (
      <div className={className} ref={this.setElement}>
        {children}
      </div>
    );
  }

  setElement = (el: HTMLElement | null) => {
    this.element = el;
    if (this.drag) {
      this.drag.destroy();
      this.drag = null;
    }

    if (el) {
      const { axis = 'y', handle = '> .actions > .move' } = this.props;
      const onSortChange = () => {
        const { onChange } = this.props;
        const { $items } = drag;

        if ($items) {
          const uids = $items
            .toArray()
            .map((element) => element.getAttribute('data-uid') || '');

          onChange(uids);
        }
      };

      const drag = (this.drag = new Garnish.DragSort($(el).children(), {
        handle,
        axis,
        collapseDraggees: true,
        magnetStrength: 4,
        helperLagBase: 1.5,
        helperOpacity: 0.9,
        onSortChange,
      }));
    }
  };
}
