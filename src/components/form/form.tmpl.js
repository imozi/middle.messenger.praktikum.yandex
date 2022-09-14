export default `
<form action="{{action}}" class="{{class}} form" method="{{method}}">
    {{#each inputs}}
        {{> input this}}
    {{/each}}
    <div class="form__row">
    {{> button button}}
    </div>
</form>
{{> link link}}
`;
