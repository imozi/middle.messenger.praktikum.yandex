export default `
<form action="#" class="{{class}} form">
    {{#each inputs}}
        {{> input this}}
    {{/each}}
    <div class="form__row">
    {{> button button}}
    </div>
</form>
`;
