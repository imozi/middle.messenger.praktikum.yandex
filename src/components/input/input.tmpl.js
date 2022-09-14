export default `
  <div class="form__row">
    <div class="form__label"><label for={{id}}>{{title}}</label></div>
    <div class="form__input"><input type={{type}} name={{name}} placeholder="{{placeholder}}" {{#if value}}value="{{value}}"{{/if}}> {{#if icon}}<span class="input-icon"><img src="img/icons/icon-{{icon}}.svg" alt="icon user"></span>{{/if}}</div>
  </div>
`;
