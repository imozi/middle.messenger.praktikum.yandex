import { Component } from '../../../core/Component';

export class NotFound extends Component {
  render() {
    return `
    <section class="not-found">
        <div class="not-found__img">
          <img src="img/svg/404.svg" alt="OziHub Messanger">
        </div>
      <h1 class="not-found__title">Такой страницы не существует!</h1>
      {{{Link url="login" class="home__link" text="Вернуться"}}}
    </section>
    `;
  }
}
