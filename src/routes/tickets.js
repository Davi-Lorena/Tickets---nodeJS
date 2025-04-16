// Importando a função create, que é nosso controller. 
import { create } from "../Controller/tickets/create.js"

// Aqui, temos um array que contém os métodos que utilizaremos para lidar com os tickets, separados em objetos que contém: 
// Método 
// URL, onde estará acontecendo o método 
// E a função controller, importada, que envia uma mensagem referente a resposta da requisição e seu atendimento pelo nodejs
export const tickets = [
    {
        method: "POST",
        url: "/tickets",
        controller: create 
        // Utilizamos o controller dessa forma, pois teríamos que criar um para cada rota (cada método diferente) e assim é possível aproveitar essa função, esse código. 
    }
]