import { Component } from 'core/Component';
import { Router } from 'core/Router';

interface LinkProps {
  url: string;
  className?: string;
  text: string;
}

export class Link extends Component {
  static componentName = 'Link';

  constructor(props: LinkProps) {
    const onClick = (evt: MouseEvent) => {
      evt.preventDefault();

      const router = new Router();

      if (this.props.url === '/back') {
        router.back();
        return;
      }

      router.go(this.props.url);
    };
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
    <a href="{{url}}" class="link {{className}}">{{text}}</a>
    `;
  }
}
