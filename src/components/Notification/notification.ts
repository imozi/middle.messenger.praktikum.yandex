import { Component } from 'core/Component';
import { debounce } from 'core/utils';

interface NotificationProps {
  text: string;
  type: string;
  className?: string;
  close?: (e: Event) => void;
}

export class Notification extends Component {
  static componentName = 'Notification';

  constructor(props: NotificationProps, { close } = props) {
    super({
      ...props,
      events: { close: debounce(close as Function, 2500) },
    });
  }

  show(): void {
    this.getEl().style.opacity = '1';
    this.getEl().dataset.hide = 'false';
  }

  hide(): void {
    this.getEl().style.opacity = '0';
    setTimeout(() => (this.getEl().dataset.hide = 'true'), 250);
  }

  render() {
    return `
      <div class="notification {{className}} notification--{{type}}" data-hide="true">
        <p>{{text}}</p>
      </div>
    `;
  }
}
