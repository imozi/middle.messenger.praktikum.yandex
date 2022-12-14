import { Component } from 'core/Component';
import { debounce } from 'core/utils';

enum typeNotification {
  Info = 'info',
  Error = 'error',
  Success = 'success',
}

interface NotificationProps {
  text: string;
  type: typeNotification;
  className?: string;
  close?: (e: Event) => void;
  events: any;
}

export class Notification extends Component<NotificationProps> {
  static componentName = 'Notification';

  constructor(
    props: NotificationProps,
    { close, type = typeNotification.Info } = props,
  ) {
    super({
      ...props,
      type,
      events: { close: debounce(close as Function, 2500) },
    });
  }

  show() {
    this.getEl().style.opacity = '1';
    setTimeout(() => (this.getEl().dataset.hide = 'false'), 100);
  }

  hide() {
    this.getEl().style.opacity = '0';
    setTimeout(() => (this.getEl().dataset.hide = 'true'), 100);
  }

  render() {
    return `
      <div class="notification {{className}} notification--{{type}}" data-hide="true">
        <p>{{text}}</p>
      </div>
    `;
  }
}
