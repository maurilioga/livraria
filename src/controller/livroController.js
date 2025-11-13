import livro from "../models/Livro.js";
import autor from "../models/Autor.js"
import DadosNaoEncontrados from "../errors/DadosNaoEncontrados.js";

class LivroController {

    static async listarLivros(req, res, next) {
        try {
            const livros = await livro.find({});
            res.status(200).json(livros);
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

    static async listarLivrosPorEditora (req, res, next) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
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

            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
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
            res.status(200).json({message: "Livro atualizado com sucesso!"});
        } catch (error) {
            next(error);
        }
    }

    static async excluirLivro(req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "Livro excluido com sucesso!"});
        } catch (error) {
            next(error);
        }
    }
};

export default LivroController;