import { Component } from 'core/Component';

interface IconProps {
  className: string;
  icon: string;
  click?: (evt: Event) => void;
}

export class Icon extends Component {
  static componentName = 'Icon';

  constructor(props: IconProps, { click } = props) {
    super({ ...props, events: { click } });
  }

  render() {
    return `
    {{#ifEqual icon "hide"}}
    <span class="icon {{className}}" data-hide="true"></span>
    {{else}}
    <span class="icon {{className}}"><img src="img/icons/icon-{{icon}}.svg" alt="icon {{icon}}"></span>
    {{/ifEqual}}
    `;
  }
}
