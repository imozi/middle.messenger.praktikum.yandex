import { Component } from 'core/Component';

interface AvatarProps {
  src?: string;
  className?: string;
}

export class Avatar extends Component {
  static componentName = 'Avatar';

  constructor(props: AvatarProps) {
    super({ ...props });
  }

  render() {
    return `
    <div class="avatar {{className}}">
        <label for="avatar" class="avatar__img">
          <img 

                {{#if src}}
                  src={{src}}
                {{else}} 
                  src="img/svg/user-default.svg"
                {{/if}}

                alt="avatar">
        </label>
      <div class="avatar__change">
      {{{Input id="avatar" type="file" name=""}}}
      </div>
    </div>
      `;
  }
}
