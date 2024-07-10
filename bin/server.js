require("dotenv").config();
const app = require("../src/api");

let port = process.env.API_PORT || 3000;

app.listen(port);

console.log("executando na porta " + port);