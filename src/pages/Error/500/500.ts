import { Component } from 'core/Component';

export class ServError extends Component {
  render() {
    return `
    <section class="serv-error">
        <div class="serv-error__img">
          <img src="img/svg/500.svg" alt="OziHub Messanger">
        </div>
      <h1 class="serv-error__title">Ошибка сервера!</h1>
      {{{Link url="/back" text="Вернуться"}}}
    </section>
    `;
  }
}
