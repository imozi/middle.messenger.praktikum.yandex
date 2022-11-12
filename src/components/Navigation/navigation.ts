import { Component } from 'core/Component';

interface NavigationProps {
  active: string;
  className?: string;
}

export class Navigation extends Component<NavigationProps> {
  static componentName = 'Navigation';

  constructor(props: NavigationProps) {
    super({ ...props });
  }

  render() {
    return `
      <nav class="{{className}} nav">
        <ul class="nav__list">
          <li>
            {{#ifEqual active "contacts"}}
              {{{Link className="nav__item active" icon="contacts" ref="contacts"}}}
            {{else}}
              {{{Link url="/contacts" className="nav__item" icon="contacts" ref="contacts"}}}
            {{/ifEqual}}
          </li>
          <li>
            {{#ifEqual active "chats"}}
              {{{Link className="nav__item active" icon="chats" ref="chats"}}}
            {{else}}
              {{{Link url="/messenger" className="nav__item" icon="chats" ref="chats"}}}
            {{/ifEqual}}
          </li>
          <li>
            {{#ifEqual active "settings"}}
                {{{Link className="nav__item active" icon="settings" ref="settings"}}}
            {{else}}
              {{{Link url="/settings" className="nav__item" icon="settings" ref="settings"}}}
            {{/ifEqual}}
          </li>
        </ul>
      </nav>
      `;
  }
}
