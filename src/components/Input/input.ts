import { Component } from '../../core/Component';

interface InputProps {
  id: string;
  text: string;
}

export class Input extends Component {
  constructor(props: InputProps) {
    super({ ...props });
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
      {{#ifEqual name "password"}}data-hide="true"{{/ifEqual}}
      required
      >
    `;
  }
}
