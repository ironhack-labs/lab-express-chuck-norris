const Chuck  = require('chucknorris-io');
const client = new Chuck();

client.getJokeCategories()
.then((response)=>  {
    debugger;

})
.catch((err)=> {
debugger;
});
