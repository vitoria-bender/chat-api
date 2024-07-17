app.use("/entrar", router.psot("/entrar", async(req, res, next)=> {
    const usuarioController = require("./controllers/usuarioController");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}))