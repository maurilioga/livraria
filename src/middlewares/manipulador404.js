import PaginaNaoEncontrada from "../errors/PaginaNaoEncontrada.js";

function manipulador404(req, res, next) {
    const erro404 = new PaginaNaoEncontrada();
    next(erro404)
}

export default manipulador404;