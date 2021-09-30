const express =require('express');
const app = express();
const path = require('path');
const routes = require('./routes');

const middlewares = [
  express.json(),
  express.urlencoded({extended: true})
];

console.log(__dirname);

app.use(middlewares);
app.use("/", routes);

//express.static is neccessary to tell express to look for static files in the  public directory of the application i.e html/css
app.use(express.static(path.join(__dirname, "/public")));

app.listen(8008, () => {
  console.log("Listening on port 8008");
})