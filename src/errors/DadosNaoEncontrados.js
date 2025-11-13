import ErroBase from "./ErroBase.js";

class DadosNaoEncontrados extends ErroBase {
    constructor(mensagem = "Dados não Encontrados!") {
       super(mensagem, 404); 
    }
}

export default DadosNaoEncontrados;