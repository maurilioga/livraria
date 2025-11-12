import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js"

class LivroController {

    static async listarLivros(req, res) {
        try {
            const livros = await livro.find({});
            res.status(200).json(livros);
        } catch (error) {
            res.status(500).json({
                message: `Erro ao buscar livros! - Erro: ${error.message}`
            })
        }
    }

    static async listarLivroPorId(req, res) {
        try {
            const id = req.params.id;
            const buscaLivro = await livro.findById(id);
            res.status(200).json(buscaLivro);
        } catch (error) {
            res.status(500).json({
                message: `Erro ao buscar livro! - Erro: ${error.message}`
            })
        }
    }

    static async listarLivrosPorEditora (req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na busca` });
        }
    }

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({
                message: "Livro criado com sucesso!", 
                livro: livroCriado
            });
        } catch (error) {
            res.status(500).json({
                message: `Falha ao cadastrar livro! - Erro: ${error.message}`
            })
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Livro atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({
                message: `Erro ao atualizar livro! - Erro: ${error.message}`
            })
        }
    }

    static async excluirLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "Livro excluido com sucesso!"});
        } catch (error) {
            res.status(500).json({
                message: `Erro ao atualizar livro! - Erro: ${error.message}`
            })
        }
    }
};

export default LivroController;