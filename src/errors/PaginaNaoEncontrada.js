import ErroBase from "./ErroBase.js";

class PaginaNaoEncontrada extends ErroBase {
    constructor() {
        super("Página não encontrada!", 404)
    }
}

export default PaginaNaoEncontrada;