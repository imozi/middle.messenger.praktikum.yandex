export default `
  <div class="form__row">
    <div class="form__label">
      <label for={{id}}>{{title}}</label>
    </div>
    <div class="form__input ">
    <input 
    type={{type}} 
    id={{id}} 
    name={{name}} 
    placeholder="{{placeholder}}" 
    {{#if value}}value="{{value}}"{{/if}}
    {{#ifEqual name "password"}}data-hide="true"{{/ifEqual}}
    >
     {{#if icon}}<span class="input-icon"><img src="img/icons/icon-{{icon}}.svg" alt="icon {{icon}}"></span>{{/if}}
     </div>
  </div>
`;
