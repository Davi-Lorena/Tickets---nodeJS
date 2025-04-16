// Esse arquivo será utilizado para agrupar os métodos/rotas dos tickets, visto que serão feitos de maneira independente  

import { tickets } from "./tickets.js"

// Importamos o array tickets e aqui desestruturamos, despejamos eles para ter a rota de cada um (com cada método separado)
export const routes = [...tickets]