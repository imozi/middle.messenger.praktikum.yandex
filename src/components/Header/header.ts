import { Component } from 'core/Component';

interface HeaderProps {
  className: string;
  title: string;
}

export class Header extends Component<HeaderProps> {
  static componentName = 'Header';

  constructor(props: HeaderProps) {
    super({ ...props });
  }

  render() {
    return `
    <header class="{{className}} header">
        <div class="header__logo">
          <img src="img/svg/logo.svg" alt="OziHub Messanger">
        </div>
        <h1 class="header__title">{{title}}</h1>
    </header>
    `;
  }
}
