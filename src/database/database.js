// Importando o file system, leitor de arquivos
import fs from 'node:fs/promises'

// Definindo o endereço do nosso banco de dados, onde iremos armazenar as informações 
const DATABASE_PATH = new URL("db.json", import.meta.url)

export class Database {
    #database = {} // Criamos aqui nosso banco de dados e o deixamos privado, para ser acessado somente nessa classe 

    constructor() {
        // Para a leitura de arquivo, o primeiro parâmetro é o caminho e o segundo é o padrão de codificação de caracteres que permite representar todos os caracteres Unicode
        fs.readFile(DATABASE_PATH, "utf8").then( (data) => {
                this.#database = JSON.parse(data)
                // Aqui, se houver e encontrar um dado, fará a conversão de texto para JSON e o armazenará no banco de dados
            })
            .catch(() => {
                // Caso haja erro, chamamos o persist para retornar o dado para string
                this.#persist()
            })

        }

        // Criaremos aqui um método privado para criar um arquivo (db.json, caso ele não exista), passando como primeiro parâmetro o endereço e como segundo a conversão do nosso banco de dados em JSON para STRING
#persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
}
// Quando utilizarmos o script DEV, se o db.json não existir, esse método cria ele.

}