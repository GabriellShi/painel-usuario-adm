const express = require("express");
const app = express();
const port = 3008;
const methodOverride = require('method-override');
// Pacote para salvar aquivos no lado do cliente "no navegador do usuário"
const cookieParser = require('cookie-parser');


const indexRoute = require("./src/routes/indexRoute") 
const userRoute = require("./src/routes/userRoute"); 



// Configura o methodOverride no express
// methodOverride = Pacote que transforma um método http em outro
// Ex: POST => PUT
app.use(methodOverride("_method"));
// Converter corpo da requisição (body) em objeto literal
app.use(express.json());

app.use(express.urlencoded({ extended: false }))


//   
// Configura pasta estática para acesso externo
app.use(express.static(__dirname + "/public"));
// Configura o template engine, troca do padrão (jade) para ejs
app.set("view engine", "ejs");
// Configura o caminho para os views, troca o padrão que é no raiz para o src
app.set("views", __dirname + "/src/views");

app.use(cookieParser());

// Inicia o servidor
app.listen(port, () => {
  console.log("Estamos rodando na porta" + " " + port);
});




app.use("/", indexRoute) 
app.use("/user", userRoute) 



