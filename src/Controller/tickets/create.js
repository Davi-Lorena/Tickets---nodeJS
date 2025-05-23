// Importamos aqui essa função para gerar um ID desse tipo, muito utilizado para identificadores
import { randomUUID } from "node:crypto"

// Função será nosso controller, responsável pelo envio de respostas para cada rota. Desestruturamos parâmetros para que a ordem não interfira (requisição, resposta e o banco de dados para salvar os tickets)
export function create ({ request, response, database }){

    // Utilizamos essa const para desestruturar o corpo da nossa requisição e separar essas três propriedades, que serão utilizadas no corpo de cada ticket
    const { equipment, description, user_name } = request.body

    // Aqui, teremos, de fato, o objeto contendo todas as informações necessárias para cada ticket 
    const ticket = {
        id: randomUUID(), // IDentificador
        equipment, // Equipamento que será reparado
        description, // Descrição do problema
        user_name, // Nome do solicitante 
status: "open", // Status do ticket, demonstrando que ele está aberto, em cheque 
// Abaixo, data de criação desse ticket e data de atualização do mesmo. 
        created_at: new Date(),
        updated_at: new Date()
    }

    // Chamamos a função para inserir os dados) do banco de dados) e passamos a table tickets e o dado ticket como parâmetros 
database.insert("tickets", ticket)


    // Essa será nossa resposta enviada, uma mensagem positiva e o ticket (com seu corpo  definido) convertido para strings JSON 
    response.writeHead(201).end(JSON.stringify(ticket))
}