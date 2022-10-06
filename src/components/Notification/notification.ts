import { Component } from 'core/Component';
import { debounce } from 'core/utils';

interface NotificationProps {
  text: string;
  type: string;
  className?: string;
  click?: (e: Event) => void;
}

export class Notification extends Component {
  static componentName = 'Notification';

  constructor({ text, type, className, click }: NotificationProps) {
    super({
      text,
      type,
      className,
      events: { click: debounce(click as Function, 2500) },
    });
  }

  show(): void {
    this.getEl().style.opacity = '1';
  }

  hide(): void {
    this.getEl().style.opacity = '0';
  }

  render() {
    return `
      <div class="notification {{className}} notification--{{type}}">
      <p>{{text}}</p>
      </div>
    `;
  }
}
