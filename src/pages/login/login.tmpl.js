import Templater from '../../utils/Templater';

export default `
<section class="login">
  <a href="/">
    <div class="login__logo">
      <img src="img/svg/logo.svg" alt="OziHub Messanger">
    </div>
  </a>
  <h1 class="login__title">Вход</h1>
     ${Templater.patrials.get('form')}
  <a href="/registration">У вас нет аккаунта?</a>
</section>
`;
