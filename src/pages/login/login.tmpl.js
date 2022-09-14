import Templater from '../../utils/Templater';

export default `
<section class="login">
  <header class="login__header">
    <a href="/" class="login__header-link" area-label="home page">
    <div class="login__logo">
      <img src="img/svg/logo.svg" alt="OziHub Messanger">
    </div>
    </a>
    <h1 class="login__title">Вход</h1>
  </header>
     ${Templater.patrials.get('form')}
</section>
`;
