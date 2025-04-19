export function remove({ request, response, database }) {
    const { id } = request.params
    // Capturamos o id

    // Chamamos o método delete do database e passamos os parâmetros table e id
database.delete("tickets", id)

    return response.end()
}