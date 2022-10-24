import { Component } from 'core/Component';

export class HomePage extends Component {
  render() {
    return `
    <main class="home">
        <div class="home__logo">
          <img src="img/svg/logo.svg" alt="OziHub Messanger">
          {{user}}
        </div>
      <h1 class="home__title">Добро пожаловать! 👋</h1>
        {{{Link url="/sign-in" className="home__link" text="Стартуем! 🚀" ref="link"}}}
    </main>
    `;
  }
}
