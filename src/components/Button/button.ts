import { Component } from 'core/Component';

interface ButtonProps {
  className: string;
  type?: string;
  text?: string;
  icon: string;
  click?: (evt: Event) => void;
}

export class Button extends Component {
  static componentName = 'Button';

  constructor(props: ButtonProps, { click } = props) {
    super({ ...props, events: { click } });
  }

  render() {
    return `
    {{#if icon}}
    <button class="btn-icon {{className}}">
    <span><img src="img/icons/icon-{{icon}}.svg" alt="icon {{icon}}"></span>
    </button>
    {{else}}
    <button class="btn {{className}}" type="{{type}}">{{text}}</button>
    {{/if}}
    `;
  }
}
