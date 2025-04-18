export function parseRoutePath(path) {

    const routeParametersRegex = /:([a-zA-Z]+)/g // Criamos essa função e utilizamos esse regex para capturar os caracteres desejados: 
    // Esse regex indica que eu quero pegar os dois pontos, todas as letras minúsculas e maiúsculas de a - z e o mais antes de fechar o parênteses para pegar em e sequência e o g depois da barra indica que eu quero pegar em qualquer lugar da url


    // A constante abaixo será responsável por substituir, no caminho, toda a expressão os parâmetros de rota por outra
const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_]+)") // Esse novo regex indica que eu quero pegar, antes da interrogação tudo o que estiver de a-z, 0-9, maiúsculo ou minúsculo e em sequência (+)

const pathRegex = new RegExp(`^${params}(?<query>\\?(.*))?$`)
// Essa const é responsável por concatenar o parâmetro antes da interrogação e depois da interrogação: Utilizando a const params, já definida e uma nova expressão regular, que indica que eu vou pegar o grupo "query", remover a interrogação e pegar TUDO o que vem depois dela (.*)

// Retorno a expressão utilizada para a comparação dos caminhos das rotas 
return pathRegex

}