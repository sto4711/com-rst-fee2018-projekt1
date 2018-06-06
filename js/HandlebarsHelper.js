/* import * as Handlebars from './js/handlebars-v4.0.11.js'; */

Handlebars.registerHelper('for_zero_to_n', function(n, block) {
    let result = "";
    for(let i = 0; i < n; ++i)  {
        result += block.fn(i);
    }
    return result;
});