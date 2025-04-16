// Importamos as rotas desestrurudas ness endereço 
import { routes } from "../routes/index.js"

// Importando nosso banco de dados
import { Database } from "../database/database.js"

// Criamos um nosso banco de dados, INSTANCIAMOS (como é uma classe)
const database = new Database()

// Criamos essa função para manipular as rotas, que recebe uma requisição e envia uma resposta
export function routeHandler (request, response) {

    // Nessa const capturamos uma rota 
    const route = routes.find((route) => {
        // Retornamos uma verificação se a rota do método e a url da rota são iguais ao método e url da requisição, para tudo ocorrer bem
        return route.method === request.method && route.url === request.url
    })

    // Se ocorrer, retornamos a rota com o controlador, passando como parâmetros a requisição, a resposta e o banco de dados, desestrurando a ordem deles, para aceitar e associar em qualquer poisção o que for enviado. 
if(route) {
    return route.controller({ request, response, database })
}

// Caso não dê certo, retornamos um erro (Não encontrado)
response.writeHead(404).end()

}