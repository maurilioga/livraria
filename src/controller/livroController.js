import { livro, autor } from "../models/index.js";
import DadosNaoEncontrados from "../errors/DadosNaoEncontrados.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";

class LivroController {

    static async listarLivros(req, res, next) {
        try {
            let { 
                limite = 10, 
                pagina = 1, 
                ordenacao = "_id:-1",
            } = req.query;

            let [campoOrdenacao, ordem] = ordenacao.split(":");

            limite = parseInt(limite);
            pagina = parseInt(pagina);
            ordem = parseInt(ordem);

            if (limite > 0 && pagina > 0) {
                const livros = await livro
                    .find({})
                    .sort({ [campoOrdenacao]: ordem })
                    .skip((pagina - 1) * limite)
                    .limit(limite)
                    .populate("autor")
                    .exec();

                res.status(200).json(livros);
            } else {
                next(new RequisicaoIncorreta())
            }
        } catch (error) {
            next(error);
        }
    }

    static async listarLivroPorId(req, res, next) {
        try {
            const id = req.params.id;
            const buscaLivro = await livro.findById(id);
            res.status(200).json(buscaLivro);
        } catch (error) {
            next(error);
        }
    }

    static async listarLivrosPorFiltro(req, res, next) {
        try {
            const busca = await filtros(req);

            if (busca != null) {
                const livrosBusca = await livro
                    .find(busca)
                    .populate("autor");

                res.status(200).json(livrosBusca);
            } else {
                res.status(200).json([]);
            }
        } catch (error) {
            next(error);
        }
    }

    static async cadastrarLivro(req, res, next) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);

            if (autorEncontrado == null) {
                next(new DadosNaoEncontrados("Autor(a) não encontrado(a)!"));
            }

            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({
                message: "Livro criado com sucesso!",
                livro: livroCriado
            });
        } catch (error) {
            next(error);
        }
    }

    static async atualizarLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado com sucesso!" });
        } catch (error) {
            next(error);
        }
    }

    static async excluirLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "Livro excluido com sucesso!" });
        } catch (error) {
            next(error);
        }
    }
};

async function filtros(req) {
    const {
        editora,
        titulo,
        minPaginas,
        maxPaginas,
        minPreco,
        maxPreco,
        nomeAutor
    } = req.query;

    let busca = {};

    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
    if (minPaginas) busca.paginas = { $gte: minPaginas };
    if (maxPaginas) busca.paginas = { $lte: minPaginas };
    if (minPreco) busca.preco = { $gte: minPreco };
    if (maxPreco) busca.preco = { $lte: maxPreco };
    if (nomeAutor) {
        const autorLivro = await autor.findOne({ nome: nomeAutor });

        if (autorLivro !== null) busca.autor = autorLivro._id;
        else busca = null
    }

    return busca;
}

export default LivroController;