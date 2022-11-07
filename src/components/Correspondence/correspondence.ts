import { Component } from 'core/Component';

interface CorrespondenceProps {
  className: string;
  messages: [];
}

export class Correspondence extends Component {
  static componentName = 'Correspondence';

  constructor(props: CorrespondenceProps) {
    super({ ...props, messages: [{ text: 'Привет' }] });
  }

  render() {
    return `
    <div class="correspondence {{className}}">
      {{#each messages}}
        {{#with this}}
          {{{Message text=text isMy=true}}}
        {{/with}}
    {{/each}}             
    </div>
    `;
  }
}
