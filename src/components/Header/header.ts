import { Component } from 'core/Component';

interface HeaderProps {
  className: string;
  title: string;
}

export class Header extends Component {
  static componentName = 'Header';

  constructor(props: HeaderProps) {
    super({ ...props });
  }

  render() {
    return `
    <header class="{{className}} header">
        <a href="/" class="header__link" area-label="home page">
        <div class="header__logo">
          <img src="img/svg/logo.svg" alt="OziHub Messanger">
        </div>
        </a>
        <h1 class="header__title">{{title}}</h1>
    </header>
    `;
  }
}
