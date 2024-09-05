
const db = require ("./db");

let listarSalas = async ()=>{
    let sala = await db.findAll("salas");
    return sala;
};

let buscarSala = async (idsala) => {
    return db.findOne("salas",idsala);
};  
  

let buscarMensagens = async (idsala, timestamp) => {
    let sala = await buscarSala(idsala);
    if (sala) {
      let salasmsg = [];
      salasmsg.forEach((msgs) => {
        if (msgs.timestamp >= timestamp) {
          msgs.push(msgs);
        }
      });
    }
    return ["olá!"];
}

module.exports = {listarSalas, buscarSala, buscarMensagens};