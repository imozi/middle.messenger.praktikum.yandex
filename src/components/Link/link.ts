import { Component } from 'core/Component';
import { Router } from 'core/Router';

interface LinkProps {
  url: string;
  className?: string;
  icon?: string;
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

      if (this.props.url) {
        router.go(this.props.url);
      }
    };
    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
    {{#if icon}}
      <a 
      {{#if url}}
       href="{{url}}"
        {{else}} 
      role="link" aria-disabled="true"
      {{/if}}
      class="link link--icon {{className}}">
        <img src="img/icons/icon-{{icon}}.svg" alt="icon {{icon}}">
        <span>{{text}}</span>
      </a>
    {{else}}
      <a href="{{url}}" class="link {{className}}">{{text}}</a>
    {{/if}}
    `;
  }
}
