// Aqui, importamos o http do node para podermos "criar" esse servidor 
import http from "node:http"

// Importamos a função JsonHandler, que junta as chunks e forma os buffers e define o conteúdo da resposta
import { jsonHandler} from "./middlewares/jsonHandler.js"
import { routeHandler } from "./middlewares/routeHandler.js"


// A função listener vai receber uma requisição e enviar uma resposta. Ela é assíncrona pois a JsonHandler também é, visto que ela lida com requisições e precisa esperar para dar uma resposta
async function listener(request, response) {
// Função que será executada quando o servidor receber uma requisição
await jsonHandler(request, response)
// Função que lidará com as rotas e métodos da nossa api
routeHandler(request, response)
}

// Aqui, criamos o servidor fazendo uso da função listener (que é uma forma abreviada) e passamos a porta 3333 para que ele seja executado 
http.createServer(listener).listen(3333)