import DadosNaoEncontrados from "../errors/DadosNaoEncontrados.js";
import autor from "../models/Autor.js";

class AutorController {

    static async listarAutores(req, res, next) {
        try {
            const autores = await autor.find({});
            res.status(200).json(autores);
        } catch (error) {
            next(error);
        }
    }

    static async buscarAutorPorId(req, res, next) {
        try {
            const id = req.params.id;
            const buscaAutor = await autor.findById(id);

            if (buscaAutor == null) {
                next(new DadosNaoEncontrados("Autor não Encontrado!"));
            }

            res.status(200).json(buscaAutor);
        } catch (error) {
            next(error);
        }
    }

    static async cadastrarAutor(req, res, next) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({
                message: "Autor criado com sucesso!", 
                autor: novoAutor
            });
        } catch (error) {
            next(error);
        }
    }

    static async atualizarAutor(req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Autor atualizado com sucesso!"});
        } catch (error) {
            next(error);
        }
    }

    static async excluirAutor(req, res, next) {
        try {
            const id = req.param.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "Autor excluido com sucesso!"});
        } catch (error) {
            next(error);
        }
    }
};

export default AutorController;