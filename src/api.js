
const express = require("express");
const app = express();

app.use(express.urlencoded ({extended : true}));
app.use(express.json());

const router = express.Router();


app.use('/', router.get('/', (req, res, next)=> {
    res.status(200).send("<h1>API - CHAT<h1>")
}));

app.use('/', router.get('/sobre', (req, res) =>{
    res.status(200).send({
        "nome": "Chatinfo",
        "versao": "1.0.0.0",
        "autor": "Vitória Bender"
    });
}));

app.use("/entrar", router.post("/entrar", async(req, res, next) =>{
    const usuarioController = require ("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

app.use("/salas", router.get("/salas", async(req, res, next)=>{
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    const teste = await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick);
    if(teste){
        let resp = await salaController.get();
        res.status(200).send(resp);
    }
    else{
        res.status(401).send({msg:"usuário não autorizado!"});
    }
}));

app.use("/sala/entrar", router.post("/sala/entrar", async(req, res)=>{
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    if(token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)){
        let resp = await salaController.entrar(req.headers.iduser, req.query.idSala);
        res.status(200).send(resp);
    }else{
        res.status(401).send({msg:"Usuário não autorizado"});
    }
}));

app.use("/sala/listar", router.get("/sala/listar", async (req, res) => {
    const token = require("./util/token");
    const salaController = require("./controllers/salaController");
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp= await salaController.buscarMensagens(req.query.idSala, req.query.timestamp);
    res.status(200).send(resp);
}));

app.use("/sala/enviar", router.post("/sala/enviar", async (req, res) => {
    const token = require("../../util/token");
    const salaController = require("./controllers/salaController");
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)) return false;
    let resp= await salaController.enviarMensagem(req.headers.nick, req.body.msg,req.body.idSala);
    res.status(200).send(resp);
}))
    

module.exports = app;