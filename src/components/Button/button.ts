import { Component } from '../../core/Component';

interface ButtonProps {
  class: string;
  type: string;
  text: string;
}

export class Button extends Component {
  constructor(props: ButtonProps) {
    const onClick = (evt: MouseEvent) => {
      console.log('click');
      const { target } = evt;

      setTimeout(() => target.blur(), 250);
      evt.preventDefault();
    };
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
    <button class="btn {{class}}" type="{{type}}">{{text}}</button>
    `;
  }
}
