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

// O método abaixo é utilizado para inserir os dados (tickets) no banco e salvá-los. Passamos como parâmetros a tabela que irá conter esses dados e os dados em si 

insert(table, data) {
    //Verificamos se o array é um array mesmo e se esse banco de dados contém o table (que é o array)
    if(Array.isArray(this.#database[table])) {
        // Se sim, esse array do banco de dados vai adicionar o ticket (dado) 
        this.#database[table].push(data)
    } else {
        // Caso não exista, o ticket(dado) é o primeiro que está sendo cadastrado, então o array vai ser igual aos dados desse dado, tendo em vista que nesse momento é o único
        this.#database[table] = [data]
    }

// Chamamos o método persist para escrever no arquivo os dados e salvá-los  
this.#persist()

}

}