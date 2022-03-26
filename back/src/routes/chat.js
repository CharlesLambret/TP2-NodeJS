import { randomUUID } from 'crypto';


/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 */

/** @type { Message[] } */

const messages = []
const firstdate = new Date();
/*let testdate = firstdate.getTime()
let testdate1 = firstdate.getDate()

console.log(firstdate.toString());
console.log(firstdate.getTimezoneOffset());
console.log(testdate1)
*/




/**
 * @param {string} pseudo
 * @param {string} body
 * @param {firstdate} firstdate
 */
function handleNewMessage(pseudo, body, firstdate) {
  const message = {
    id: randomUUID(),
    pseudo,
    body,
    firstdate,
  }
  messages.push(message)
  return message
}

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function chatRoutes(app) {
  /**
   * @param {{ type: string, payload: object }} data
   */
  function broadcast(data) {
    app.websocketServer.clients.forEach((client) => {
      client.send(JSON.stringify(data))
    })
  }

  // /chat/
  app.get('/', { websocket: true }, (connection, reply) => {
    connection.socket.on('message', (message) => {
      const data = JSON.parse(message.toString('utf-8'))
      broadcast({
        type: 'NEW_MESSAGE',
        payload: handleNewMessage(data.pseudo, data.body, data.firstdate),
      })
    })
  })
}
