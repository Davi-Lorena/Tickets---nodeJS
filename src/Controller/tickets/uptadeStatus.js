export function updateStatus({ request, response, database }) {
    // Esse método atualiza o status do ticket com o PATCH 
    // A primeira const captura o id, utilizado para selecionar o ticket específico 
const { id } = request.params

// Como já temos uma função de atualização, apenas a aproveitamos para esse novo método, passando a tabela de tickets, o id e o status atualizado como parâmetros
database.update("tickets", id, { status: "closed"})

// Retornamos a reposta 
    return response.end()
}