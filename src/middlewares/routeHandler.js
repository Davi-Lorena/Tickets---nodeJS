// Importamos as rotas desestrurudas ness endereço 
import { routes } from "../routes/index.js"

// Importando nosso banco de dados
import { Database } from "../database/database.js"

//Importando a função que formatará os parâmetros 
import { extractQueryParams } from "../utils/extractQueryParams.js"

// Criamos um nosso banco de dados, INSTANCIAMOS (como é uma classe)
const database = new Database()

// Criamos essa função para manipular as rotas, que recebe uma requisição e envia uma resposta
export function routeHandler (request, response) {

    // Nessa const capturamos uma rota 
    const route = routes.find((route) => {
        // Retornamos uma verificação se a rota do método e a url da rota são iguais ao método e url da requisição, para tudo ocorrer bem
        return route.method === request.method && route.path.test(request.url) 
        // Após criar o util parseRoutePath, substituimos a parte de comparação de url para verificação se o caminho da rota é igual a expressão que definimos
        // Utilizo a expressão regular que está dentro de cada caminho para testar se a url que está dentro da requisição bate
    })

    // Se ocorrer, retornamos a rota com o controlador, passando como parâmetros a requisição, a resposta e o banco de dados, desestrurando a ordem deles, para aceitar e associar em qualquer poisção o que for enviado. 
if(route) {
    // Essa const separa a url em grupos, entre eles a query
const routeParams = request.url.match(route.path)

// Essa abaixo desestrutura as querys (grupos de parâmetros nomeados) e pega cada grupo dos parâmetros de rota
const { query } = routeParams.groups

// Aqui pegamos a requisição e acessamos a query dela, se existir, retornaremos a query já formatada pela função, com chave e valor, caso não, retornaremos um objeto vazio, pois não há querys (parâmetros nomeados)
request.query = query ? extractQueryParams(query) : {}

// Retornaremos a rota com o controller para executar a função destinada a cada um dos métodos, seja post, get, ou outros...
    return route.controller({ request, response, database })
}

// Caso não dê certo, retornamos um erro (Não encontrado)
response.writeHead(404).end()

}

