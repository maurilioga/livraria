import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: { 
        type: mongoose.Schema.Types.ObjectId 
    },
    titulo: { 
        type: String, 
        required: [true, "O título do livro é obrigatório"] 
    },
    editora: { 
        type: String,
        enum: {
            values: ["Editora Teste", "Alura"],
            message: "Editora {VALUE} não é um valor permitido"
        }
    },
    preco: { 
        type: Number,
        validate: {
            validator: (valor) => {
                return valor >= 0;
            },
            message: "Valor do livro inválido!"
        }
    },
    paginas: { 
        type: Number, 
        min: [1, "O número de páginas deve ser maior que 0"], 
        max: [5000, "O número de páginas deve ser menor que 5000"] 
    },
    autor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "autores", 
        required: [true, "O título do livro é obrigatório"] 
    }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;