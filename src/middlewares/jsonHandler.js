//Essa função abaixo será responsável por capturar a requisição feita pelo usuário (Lembrando que ela e quebrada, feita em chunks), aclopá-la no array Buffers para formalizar a requisição 

export async function jsonHandler(request, response) {
const buffers = []

// Esse for é responsável por capturar cada chunk da requisição é adicionál-a ao array buffers
for await (const chunk of request) {
    buffers.push(chunk)
}

try {
    //Na linha abaixo, adicionamos a propriedade corpo para a requisição para montar os buffers com os pedaços (chunks) e convertê-los para string
    request.body = JSON.parse(Buffer.concat(buffers).toString())
} catch (error) {
    // Caso dê erro, o corpo fica vazio
    request.body = []
}

// Nessa linha, definimos o tipo de conteúdo da resposta que será enviada como JSON. 
response.setHeader("Content-type", "application/json")

}



