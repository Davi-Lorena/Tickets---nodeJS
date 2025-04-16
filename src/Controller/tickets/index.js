// Exportaremos a função responsável por exibir cada um dos tickets. Nomenclatura padronizada
export function index({ request, response, database }) {
// Criamos essa constante para acessar o banco de dados instanciado e selecionar a tabela de tickets (ajustada no database)

const tickets = database.select("tickets")

// Retornamos nossa resposta com o conteúdo dos tickets convertidos de JSON para string 
return response.end(JSON.stringify(tickets))
}