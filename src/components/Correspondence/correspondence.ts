import { Component } from 'core/Component';

interface CorrespondenceProps {
  className: string;
}

export class Correspondence extends Component {
  static componentName = 'Correspondence';

  constructor(props: CorrespondenceProps) {
    super({ ...props });
  }

  render() {
    return `
    <div class="correspondence {{className}}">
      {{#each messages}}
        {{#with this}}
          {{{Message text=text}}}
        {{/with}}
    {{/each}}             
    </div>
    `;
  }
}
