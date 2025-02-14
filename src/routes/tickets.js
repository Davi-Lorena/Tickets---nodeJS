import { create } from "../Controller/tickets/create.js"

export const tickets = [
    {
        method: "POST",
        url: "/tickets",
        controller: create
    }
]