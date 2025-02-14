export const tickets = [
    {
        method: "POST",
        url: "/tickets",
        controller: (request, response) => {
            response.writeHead(201)
            response.end("Ticket created")
        }
    }
]