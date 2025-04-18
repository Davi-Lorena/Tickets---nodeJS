// Esse arquivo será utilizado para agrupar os métodos/rotas dos tickets, visto que serão feitos de maneira independente  

import { tickets } from "./tickets.js"

//Vamos importar o método que formata o caminho das rotas 

import { parseRoutePath } from "../utils/parseRoutePath.js"

// Importamos o array tickets e aqui desestruturamos, despejamos eles para ter a rota de cada um (com cada método separado)
export const routes = [...tickets].map((route) => ({
    ...route,
    path: parseRoutePath(route.path),
}))