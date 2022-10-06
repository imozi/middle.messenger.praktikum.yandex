import { Component } from 'core/Component';
import { debounce } from 'core/utils';

interface InputProps {
  id: string;
  text: string;
  type: string;
  hide?: string;
  blur?: (e: Event) => void;
  focus?: (e: Event) => void;
  keyup?: (e: Event) => void;
  keydown?: (e: Event) => void;
}

export class Input extends Component {
  static componentName = 'Input';

  constructor(props: InputProps, { focus, blur, keyup, keydown } = props) {
    super({
      ...props,
      events: {
        blur,
        focus,
        keyup: debounce(keyup as Function),
        keydown,
      },
    });
  }

  render() {
    return `
      <input 
      type={{type}} 
      id={{id}} 
      name={{name}} 
      placeholder="{{placeholder}}" 
      {{#if value}}value="{{value}}"{{/if}}
      {{#if pattern}}pattern={{pattern}}{{/if}} 
      {{#if hide}}data-hide={{hide}}{{/if}} 
      data-invalid="false"
      {{#if required}} required {{/if}}
      >
    `;
  }
}
