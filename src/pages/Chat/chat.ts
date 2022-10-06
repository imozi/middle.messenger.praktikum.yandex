import { Component } from '../../core/Component';

export class ChatPage extends Component {
  render() {
    return `
    <main class="chat">
      {{{Notification className="chat__notification" type="" text="" ref="notification"}}}
      <aside class="chat__aside">
        <div class="chat__header">
          <div class="chat__header-logo">
              <img src="img/svg/logo-light.svg" alt="OziHub Messanger">
          </div>
          <div class="chat__aside-search">
            {{{Input
              id="search"
              type="search"
              name="search"
              placeholder="Поиск"
              icon="search"
              ref="search"
            }}}
          </div>
        </div>
        <ul class="chat__list">
          <div class="chat__list-wrap">
          <li>Туту чаты</li>  
          <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>         
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li>  <li>Туту чаты</li> <li>Туту чаты</li> 
              <li>Туту чаты</li>  
              <li>Туту чаты</li> 
              <li>Туту чаты</li> 
              <li>Туту чаты</li> 
              <li>Туту чаты</li> 
              <li>Туту чаты</li> 
              <li>Туту чаты</li> 
              <li>Туту чаты</li> 
              <li>Туту чаты</li> 
              <li>Туту чаты</li> <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>         
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              <li>Туту чаты</li>  
              
        </ul>
        <nav class="chat__nav">
        <ul class="chat__nav-list">
        <li>
        {{{Icon className="chat__nav-icon" icon="contacts"}}}
        </li>
        <li>
        {{{Icon className="chat__nav-icon" icon="chats"}}}
        </li>
        <li>
        {{{Icon className="chat__nav-icon" icon="settings"}}}
        </li>
        </ul>
        </nav>
      </aside>
      <section class="chat__room">
        <p>Выберите, кому хотели бы написать</p>
      </section>
    </main>
    `;
  }
}
