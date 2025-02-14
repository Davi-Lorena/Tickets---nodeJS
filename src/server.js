import http from "node:http"

import { jsonHandler} from "./middlewares/jsonHandler.js"

async function listener(request, response) {
// Função que será executada quando o servidor receber uma requisição
await jsonHandler(request, response)

}

http.createServer(listener).listen(3333)