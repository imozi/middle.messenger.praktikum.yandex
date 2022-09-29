import { Component } from '../../core/Component';

interface ButtonProps {
  class: string;
  type: string;
  text: string;
}

export class Button extends Component {
  constructor(props: ButtonProps) {
    super({ ...props });
  }

  render() {
    return `
    <button class="btn {{class}}" type="{{type}}">{{text}}</button>
    `;
  }
}
