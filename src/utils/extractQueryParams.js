//Criamos a função que irá formatar as querys no padrão desejado: chave e valor
export function extractQueryParams(query) {
// primeiro essa função retorna a query com um corte na interrogação (para ela não entrar no jogo, visto que separamos desde ela no regex) pelo slice, depois realiza o split para quebrar ela no &, caso haja esse caracter, em objetos (ou strings) e após isso utilizamos o reduce, um método que passamos dois parâmetros, queryParams e param. 
    return query.slice(1).split("&").reduce((queryParams, param) => {
        // Dentro do Reduce, temos essa const que vai capturar a query já cortada em chave e valor e vai pegar o parâmetro param e dividi-lo em dois (está no formato chave=valor, isso fará com que fique chave, valor) sendo cada um dos dois "pedaços" adicionados em chave e valor
        const [key, value] = param.split("=")

        // Aqui formalizamos nossa queryParams, passando a chave capturada acima como a própria chave e valor como valor. 
queryParams[key] = value 

// Retornamos queryParams já formatada no padrão que queremos: { 'Key': "Value"; }
return queryParams

    }, {}) // No final, temos aqui um objeto vazio, para segundo caso, se não houver query (que seria um parâmetro não nomeado)
}