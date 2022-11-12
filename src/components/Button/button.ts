import { Component } from 'core/Component';

interface ButtonProps {
  className: string;
  type?: string;
  text?: string;
  active?: boolean;
  icon: string;
  dataset?: string;
  click?: (evt: Event) => void;
  events: any;
}

export class Button extends Component<ButtonProps> {
  static componentName = 'Button';

  constructor(props: ButtonProps, { click } = props) {
    super({ ...props, events: { click } });
  }

  render() {
    return `
    {{#if icon}}
    <button class="btn-icon {{className}}" {{#if active}}disabled{{/if}}  {{#if dataset}}data-ref="{{dataset}}"{{/if}}>
      <span><img src="img/icons/icon-{{icon}}.svg" alt="icon {{icon}}"></span>{{text}}
    </button>
    {{else}}
    <button class="btn {{className}}" type="{{type}}">{{text}}</button>
    {{/if}}
    `;
  }
}
