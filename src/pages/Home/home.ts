import { Component } from 'core/Component';

export class HomePage extends Component {
  constructor(props?: any) {
    super(props);

    this.setProps({
      onClickLink: (evt: Event) => {
        evt.preventDefault();
        if (this.props.user) {
          this.props.router.go('/messenger');
        } else {
          this.props.router.go('/sign-in');
        }
      },
    });
  }

  render() {
    return `
    <main class="home">
        <div class="home__logo">
          <img src="img/svg/logo.svg" alt="OziHub Messanger">
        </div>
      {{#if user}}
      <h1 class="home__title">С возвращением {{user.first_name}} {{user.second_name}}! 👋</h1>
      {{else}}
      <h1 class="home__title">Добро пожаловать! 👋</h1>
      {{/if}}
        {{{Link url="/sign-in" className="home__link" text="Стартуем! 🚀" ref="link" click=onClickLink}}}
    </main>
    `;
  }
}
