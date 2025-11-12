import { autor } from "../models/Autor.js";

class AutorController {

    static async listarAutores(req, res) {
        try {
            const autores = await autor.find({});
            res.status(200).json(autores);
        } catch (error) {
            res.status(500).json({
                message: `Erro ao buscar autores! - Erro: ${error.message}`
            })
        }
    }

    static async buscarAutorPorId(req, res) {
        try {
            const id = req.params.id;
            const buscaAutor = await autor.findById(id);
            res.status(200).json(buscaAutor);
        } catch (error) {
            res.status(500).json({
                message: `Erro ao buscar autor! - Erro: ${error.message}`
            })
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({
                message: "Autor criado com sucesso!", 
                autor: novoAutor
            });
        } catch (error) {
            res.status(500).json({
                message: `Falha ao cadastrar autor! - Erro: ${error.message}`
            })
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Autor atualizado com sucesso!"});
        } catch (error) {
            res.status(500).json({
                message: `Erro ao atualizar Autor! - Erro: ${error.message}`
            })
        }
    }

    static async excluirAutor(req, res) {
        try {
            const id = req.param.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "Autor excluido com sucesso!"});
        } catch (error) {
            res.status(500).json({
                message: `Erro ao atualizar autor! - Erro: ${error.message}`
            })
        }
    }
};

export default AutorController;