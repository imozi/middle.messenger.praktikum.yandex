import { Component } from 'core/Component';

interface LabelProps {
  id: string;
  text: string;
}

export class Label extends Component<LabelProps> {
  static componentName = 'Label';

  constructor(props: LabelProps) {
    super({ ...props });
  }

  render() {
    return `
    <label for={{id}}>{{text}}</label>
    `;
  }
}
