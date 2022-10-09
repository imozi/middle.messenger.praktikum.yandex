import { Component } from '../../core/Component';

export class ChatPage extends Component {
  protected initState(): void {
    this.state = {
      usersRoom: [
        {
          id: '1',
          userName: 'Андрей',
          lastMessage: 'Есть новости по вчерашней встречи.',
          time: '13:50',
          countUnread: '1',
        },
        {
          id: '2',
          userName: 'Света',
          lastMessage: 'Изображение',
          time: '16:30',
          countUnread: '4',
        },
        {
          id: '3',
          userName: 'Морские прогулки',
          lastMessage: 'Дорогие друзья! Хотим предложить вам отличный...',
          time: '15:50',
          countUnread: '2',
        },
        {
          id: '4',
          userName: 'Влад',
          lastMessage: 'Вы: Да конечно буду!',
          time: '19:50',
        },
        {
          id: '5',
          userName: 'Брат',
          lastMessage: 'Вы: Изображение',
          time: '13:50',
        },
        {
          id: '6',
          userName: 'Новости города',
          lastMessage: 'Вчера было открытие детской площадки по улице...',
          time: 'Пн',
        },
        {
          id: '7',
          userName: 'Работа',
          lastMessage: 'Нужна помощь в подготовке отчета за прошедший месяц...',
          time: 'Ср',
        },
        {
          id: '8',
          userName: 'Юльчик 👑',
          lastMessage: 'Дорогая ты когда прилетишь обязятельно позвони мне...',
          time: '24 июня 2022',
        },
      ],
    };
  }

  render() {
    return `
    <main class="chat">
      {{{Notification className="chat__notification" type="" text="" ref="notification"}}}
      <aside class="chat__aside">
        <div class="chat__header">
        <div class="chat__header-row">
          <div class="chat__header-logo">
                <img src="img/svg/logo-light.svg" alt="OziHub Messanger">
          </div>
          {{{Button className="chat__new" icon="new-chat" ref="newChat"}}}
          </div>
          
          <div class="chat__aside-search">
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

        <ul class="chat__list">
          <div class="chat__list-wrap">
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
        <nav class="chat__nav">
        <ul class="chat__nav-list">
        <li>
        {{{Button className="chat__nav-item" icon="contacts" ref="contacts"}}}
        </li>
        <li>
        {{{Button className="chat__nav-item" icon="chats" ref="chats"}}}
        </li>
        <li>
        {{{Button className="chat__nav-item" icon="settings" ref="settings"}}}
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
