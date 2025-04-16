// Importando a função create, que é nosso controller. 
import { create } from "../Controller/tickets/create.js"
import { index } from "../Controller/tickets/index.js"
// Aqui, temos um array que contém os métodos que utilizaremos para lidar com os tickets, separados em objetos que contém: 
// Método 
// URL, onde estará acontecendo o método 
// E a função controller, importada (varia para método/rota), que envia uma mensagem referente a resposta da requisição e seu atendimento pelo nodejs
export const tickets = [
    {
        method: "POST",
        url: "/tickets",
        controller: create 
        // Utilizamos o controller dessa forma, pois teríamos que criar um para cada rota aqui nesse arquivo, mas separamos eles para uma melhor organização. Nesse caso, esse controller é específico para o método POST
    },
    {
        method: "GET",
        url: "/tickets",
        controller: index
        // Controller específico para o método GET, que exibe os tickets cadastrados. 
    }
]