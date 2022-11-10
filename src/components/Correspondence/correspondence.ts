import { Component } from 'core/Component';
import { Rec } from 'core/types';

interface CorrespondenceProps {
  className: string;
  userId: string;
  messages: Rec<Message>;
}

export type Message = {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: string;
  file: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
  currentUserId: string;
  userData: any;
};

export class Correspondence extends Component<CorrespondenceProps> {
  static componentName = 'Correspondence';

  constructor(props: CorrespondenceProps) {
    if (props.messages) {
      Object.entries(props.messages).forEach(([_, msg]) => {
        msg.currentUserId = props.userId;
      });
    }
    super({ ...props });
  }

  render() {
    return `
    <div class="correspondence {{className}}">
      {{#each messages}}
        {{#with this}}
          {{#ifEqual currentUserId user_id}}
            {{{Message src=avatar text=content isMy="true" }}}
          {{else}}
            {{{Message text=content src=ss}}}
          {{/ifEqual}}
        {{/with}}
    {{/each}}             
    </div>
    `;
  }
}
