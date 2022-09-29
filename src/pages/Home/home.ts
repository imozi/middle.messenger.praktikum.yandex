import { Component } from '../../core/Component';

export class HomePage extends Component {
  render() {
    return `
    <main class="home">
        <div class="home__logo">
          <img src="img/svg/logo.svg" alt="OziHub Messanger">
        </div>
      <h1 class="home__title">Добро пожаловать! 👋</h1>
        {{{Link url="404" class="home__link" text="Стартуем! 🚀"}}}
    </main>
    `;
  }
}
