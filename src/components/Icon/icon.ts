import { Component } from '../../core/Component';

interface IconProps {
  class: string;
  icon: string;
}

export class Icon extends Component {
  constructor(props: IconProps) {
    super({ ...props });
  }

  render() {
    return `
    <span class={{class}}><img src="img/icons/icon-{{icon}}.svg" alt="icon {{icon}}"></span>
    `;
  }
}
