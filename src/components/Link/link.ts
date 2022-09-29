import { Component } from '../../core/Component';

interface LinkProps {
  url: string;
  class: string;
  text: string;
}

export class Link extends Component {
  constructor(props: LinkProps) {
    const onClick = (evt: MouseEvent) => {
      console.log('click');
    };
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
    <a href="/{{url}}" class="{{class}} link">{{text}}</a>
    `;
  }
}
