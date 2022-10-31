import { Component } from 'core/Component';
import User from 'services/User';

interface AvatarProps {
  src?: string;
  className?: string;
  change?: (evt: Event) => void;
}

export class Avatar extends Component {
  static componentName = 'Avatar';

  constructor(props: AvatarProps, { change } = props) {
    super({ ...props, events: { change } });

    this.setProps({
      onChangeImages: async () => {
        const file = this.refs.file.getEl() as HTMLInputElement;

        if (file.files?.length) {
          const reader = new FileReader();

          reader.onload = () => {
            if (reader.result) {
              this.setProps({
                src: reader.result,
              });
            }
          };

          reader.readAsDataURL(file.files[0]);
          await User.avatarUpdate(file.files[0]);
        }
      },
    });
  }

  render() {
    return `
    <div class="avatar {{className}}">
        <label for="avatar" class="avatar__img">
          <img 

                {{#if src}}
                  src="https://ya-praktikum.tech/api/v2/resources/{{src}}"
                {{else}} 
                  src="img/svg/user-default.svg"
                {{/if}}

                alt="avatar">
        </label>
      <div class="avatar__change">
      {{{Input id="avatar" type="file" name="" change=onChangeImages ref="file"}}}
      </div>
    </div>
      `;
  }
}
