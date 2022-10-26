import { Component } from 'core/Component';

export class MessengerPage extends Component {
  render() {
    return `
    <main class="messenger">
      {{{Notification className="messenger__notification" type="" text="" ref="notification"}}}
      <aside class="messenger__aside">

        <div class="messenger__header">
          <div class="messenger__header-row">
            <div class="messenger__header-logo">
              <img src="img/svg/logo-light.svg" alt="OziHub Messanger">
            </div>
            {{{Button className="messenger__new" icon="new-chat" ref="newChat"}}}
          </div>
          
          <div class="messenger__aside-search">
            {{{Input
              id="search"
              type="text"
              name="search"
              placeholder="Поиск"
              icon="search"
              ref="search"
            }}}
            {{{Icon className="input-icon" icon="search" ref="icon"}}}
          </div>
        </div>

        <ul class="messenger__list">
          <div class="messenger__list-wrap">
          {{#each usersRoom}}
            {{#with this}}
              <li>
              {{{UserRoom 
                className=className 
                userAvatar=userAvatar 
                userName=userName 
                lastMessage=lastMessage
                time=time
                countUnread=countUnread
              }}}
              </li>  
            {{/with}}
          {{/each}}             
        </ul>

        {{{Navigation className="messenger__nav" active="chats"}}}
        
      </aside>

      <section class="messenger__content">
        <span class="messenger__placeholder">Выберите, кому хотели бы написать</span>
      </section>

    </main>
    `;
  }
}
