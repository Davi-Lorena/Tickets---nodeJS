export function update({ request, response, database }) {
    
    // Criamos uma constante que desetrutura o id dos parâmetros da request
    const { id } = request.params
    const { equipment, description } = request.body

    database.update("tickets", id, {equipment, description, updated_at: new Date(),})

    // Aqui exibimos um status code de atualizado como resposta (padrão 200, não precisamos colocar .writeHead(200) aqui) 
return response.end()
}