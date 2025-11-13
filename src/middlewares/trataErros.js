import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErroValidacao from "../errors/ErroValidacao.js";
import DadosNaoEncontrados from "../errors/DadosNaoEncontrados.js";
import PaginaNaoEncontrada from "../errors/PaginaNaoEncontrada.js";

// eslint-disable-next-line no-unused-vars
function trataErros(error, req, res, next) {
    console.log(error);

    if (error instanceof mongoose.Error.CastError) {
        new RequisicaoIncorreta().enviarResposta(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ErroValidacao(error).enviarResposta(res);
    } else if (error instanceof DadosNaoEncontrados) {        
        error.enviarResposta(res);
    } else if (error instanceof PaginaNaoEncontrada) {        
        error.enviarResposta(res);
    } else {
        new ErroBase().enviarResposta(res);
    }
}

export default trataErros;