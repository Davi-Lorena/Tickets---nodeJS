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

// No método abaixo, verificamos se existe a tabela com os dados e a armazenamos na variável let data. Caso exista, retornamos a tabela, caso não, retornamos um array vazio. Além disso, passaremos o parâmetro dos filtros
select(table, filters) {
    let data = this.#database[table] ?? []
    
    // Se houverem filtros
    if(filters) {
        // a let data (que recebeu um array) filtra cada linha da tabela 
        data = data.filter((row) => {
            // retorna o objeto (que seria o status que definimos no index), aplicamos nele a função entries, que retorna um array com chave e valor separados dentro dele e depois aplicamos a função some, que recebe, desestruturados e no array, a chave e o valor e verifica se em meio à todas as respostas recebidas há no mínimo uma que satisfaz o que solicitamos (closed ou open)
            return Object.entries(filters).some(([key, value]) => {
                // Nesse return, pegamos da linha a chave, convertemos ela para letras minúsculas (prevenção) e verificamos se nela há inclusa um valor (que também convertemos para letras minúsculas) e retornamos ele (que seria na exibição realizada pelo método GET)
                return row[key].toLowerCase().includes(value.toLowerCase())
            })
            // Depois disso, se utilizarmos o método GET com um status definido, conseguiremos filtrar os open e os closed 
        })
    }

    // Retornamos os dados 
    return data
}

update(table, id, data) {
    // Criamos essa const para acessar a tabela desse nosso banco de dados e verificar se o id da linha que consta nesse database é igual ao id que estou procurando para atualização do ticket
const rowIndex = this.#database[table].findIndex((row) => row.id === id)

if(rowIndex > -1) {
    // Se existir o index procurado, pegamos essa tabela e o index desestururados
this.#database[table][rowIndex] = {
// Aqui despejamos aqui o banco de dados e os dados pelo operador spread
    ...this.#database[table][rowIndex], 
    ...data // como despejamos os dados depois do banco, se houver alguma alteração ou diferença, os novos dados irão sobrescrever os do banco 
}

this.#persist() // Utilizamos o persist para salvar os novos dados (sobrescrever)

}
}

// Criamos o método para deletar um ticket, capturando o id da mesma forma que no update e fazendo a verificação que, se esse index capturado existir, ele será removido pelo método splice e o #persist será chamado para atualizar o documento sem o referido ticket 
delete(table, id) {
const rowIndex = this.#database[table].findIndex((row) => row.id === id)

if (rowIndex > -1) {
    this.#database[table].splice(rowIndex, 1)
    this.#persist()
}

}

}