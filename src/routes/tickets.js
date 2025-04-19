// Importando a função create, que é nosso controller. 
import { create } from "../Controller/tickets/create.js"
import { index } from "../Controller/tickets/index.js"
import { update } from "../Controller/tickets/update.js"
import { updateStatus } from "../Controller/tickets/uptadeStatus.js"
import { remove } from "../Controller/tickets/remove.js"
// Aqui, temos um array que contém os métodos que utilizaremos para lidar com os tickets, separados em objetos que contém: 
// Método 
// URL, onde estará acontecendo o método 
// E a função controller, importada (varia para método/rota), que envia uma mensagem referente a resposta da requisição e seu atendimento pelo nodejs
export const tickets = [
    {
        method: "POST",
        path: "/tickets",
        controller: create 
        // Utilizamos o controller dessa forma, pois teríamos que criar um para cada rota aqui nesse arquivo, mas separamos eles para uma melhor organização. Nesse caso, esse controller é específico para o método POST
    },
    {
        method: "GET",
        path: "/tickets",
        controller: index
        // Controller específico para o método GET, que exibe os tickets cadastrados. 
    },
    {
        method: "PUT",
        path: "/tickets/:id", // passamos o id com : para indicar que se trata de um código específico
        controller: update
        // Controller específico para o método PUT, que atualiza os tickets de acordo com a informação que for necessária. 
    },
    {
        method: "PATCH", // Esse método é utilizado para modificar uma informação específica (nesse caso é o status)
        path: "/tickets/:id/close", // adicionamos o /close porque queremos alterar esse status  
        controller: updateStatus
        // Controller específico para o método
    },
    { // Método para deletar um ticket 
        method: "DELETE",
        path: "/tickets/:id",
        controller: remove
    }
]