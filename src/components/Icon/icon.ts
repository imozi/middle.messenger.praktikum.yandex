import { Component } from 'core/Component';

interface IconProps {
  className: string;
  icon: string;
  events?: {
    click: (evt: Event) => void;
  };
}

export class Icon extends Component {
  static componentName = 'Icon';

  constructor(props: IconProps) {
    const onClick = () => {
      const password = this.refs.password;

      if (!password) {
        return;
      }

      const el = password?.getEl() as HTMLInputElement;

      if (el.type === 'password') {
        el.type = 'text';

        this.setProps({
          icon: 'visible',
        });
      } else {
        el.type = 'password';

        this.setProps({
          icon: 'hide',
        });
      }
    };

    super({ ...props, events: { click: onClick } });
  }

  render() {
    return `
    <span class={{className}}><img src="img/icons/icon-{{icon}}.svg" alt="icon {{icon}}"></span>
    `;
  }
}
