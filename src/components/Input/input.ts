import { Component } from 'core/Component';
import { debounce } from 'core/utils';

interface InputProps {
  id: string;
  text: string;
  type: string;
  hide?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  change?: (evt: Event) => void;
  blur?: (evt: Event) => void;
  focus?: (evt: Event) => void;
  keyup?: (evt: Event) => void;
  keydown?: (evt: Event) => void;
}

export class Input extends Component {
  static componentName = 'Input';

  constructor(
    props: InputProps,
    { focus, blur, keyup, keydown, change } = props,
  ) {
    super({
      ...props,
      events: {
        blur,
        focus,
        keyup: debounce(keyup as Function),
        keydown,
        change,
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
      value="{{value}}"
      {{#if required}} required {{/if}}
      {{#if disabled}} disabled {{/if}}
      >
    `;
  }
}
