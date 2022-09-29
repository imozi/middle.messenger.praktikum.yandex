import { Component } from '../../core/Component';

interface LinkProps {
  url: string;
  class: string;
  text: string;
}

export class Link extends Component {
  constructor(props: LinkProps) {
    super({ ...props });
  }

  render() {
    return `
    <a href="/{{url}}" class="link {{class}}">{{text}}</a>
    `;
  }
}
