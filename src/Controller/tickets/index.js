// Exportaremos a função responsável por exibir cada um dos tickets. Nomenclatura padronizada
export function index({ request, response, database }) {
// Criamos essa constante para acessar o banco de dados instanciado e selecionar a tabela de tickets (ajustada no database)

// Se dermos um console.log nesse status, ele irá mostrar o valor atribuido à chave na query. Simples, com a função extract nós formatamos a query para ter uma chave e um valor, essa chave estaria nomeada "status" e como ela tem um valor ("closed", por exemplo), por isso ser solicitarmos o status ele mostrará o valor, aberto ou fechado. 
const { status } = request.query

// Verificando se existe status antes de passar os filtros como parâmetro para a função select
// Se existir, passe-os como objeto, caso não, passe nulo 
const filters = status ? { status } : null

// Essa constante tickets acessea nosso banco de dados (copiado) e seleciona a tabela de tickets que existem para exibição, além de receber os filtros para exibição de acordo com o status
const tickets = database.select("tickets", filters)

// Retornamos nossa resposta com o conteúdo dos tickets convertidos de JSON para string 
return response.end(JSON.stringify(tickets))
}