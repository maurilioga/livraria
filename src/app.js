import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import trataErros from "./middlewares/trataErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await connectDatabase();

conexao.on("error", (erro) => {
    console.error("erro de conexao", erro)
});

conexao.once("open", () => {
    console.log("Conexão com banco de dados realizada com sucesso!")
})

const app = express();
routes(app);

app.use(manipulador404);

app.use(trataErros)

export default app;