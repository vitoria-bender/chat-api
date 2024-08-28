
const db = require ("./db");

let listarSalas = async ()=>{
    let salas = await db.findAll("salas");
    return salas;
};

let buscarSala = async (idsala) => {
    return db.findOne("salas",idsala);
};  
  

let buscarMensagens = async (idsala, timestamp) => {
    let sala = await buscarSala(idsala);
    if (sala.msgs) {
      let msgs = [];
      sala.msgs.forEach((msg) => {
        if (msg.timestamp >= timestamp) {
          msgs.push(msg);
        }
      });
      return msgs;
    }
    return [];
}

let atualizarMensagens = async (sala) => {
  return await db.updateOne("salas", sala,{_id:sala._id});
};

module.exports = {listarSalas, buscarSala, atualizarMensagens, buscarMensagens};