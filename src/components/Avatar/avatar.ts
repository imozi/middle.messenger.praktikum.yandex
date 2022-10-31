import { Component } from 'core/Component';
import User from 'services/User';

interface AvatarProps {
  src?: string;
  className?: string;
  change?: (evt: Event) => void;
  click?: (evt: Event) => void;
}

export class Avatar extends Component {
  static componentName = 'Avatar';

  constructor(props: AvatarProps, { change, src } = props) {
    super({
      ...props,
      src: `https://ya-praktikum.tech/api/v2/resources/${src}`,
      events: { change },
    });

    this.setProps({
      onChangeImages: async () => {
        const file = this.refs.file.getEl() as HTMLInputElement;

        if (file.files?.length) {
          const label = this.getEl().firstElementChild as HTMLLabelElement;

          const formData = new FormData();
          formData.append('avatar', file.files[0]);
          this.props.click();
          label.dataset.loading = 'true';
          await User.avatarUpdate(formData);
        }
      },
    });
  }

  render() {
    return `
    <div class="avatar {{className}}">
        <label for="avatar" class="avatar__img" data-loading="false">
          <img 

                {{#if src}}
                  src="{{src}}"
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
