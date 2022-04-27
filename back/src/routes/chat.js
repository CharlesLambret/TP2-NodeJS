import { randomUUID } from 'crypto';
import { format } from 'date-fns';


/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 */

/** @type { Message[] } */

const messages = []

/**
 * @param {string} pseudo
 * @param {string} body
 */
function handleNewMessage(pseudo, body) {
  const now = format(new Date(), "'Sent at 'hh:mm:ss ")
  const message = {
    id: randomUUID(),
    pseudo: pseudo,
    body: body,
    firstdate: now.toString(),
    lenght: 240,
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

  app.get('/', { websocket: true }, (connection, req) => {
    connection.socket.on('message', (message) => {
      const data = JSON.parse(message.toString('utf-8'))
      if (data.pseudo.length > 16 || data.body.length > 200) {
        connection.socket.send(JSON.stringify({
          type: 'ERROR',
          payload: 'pseudo or body too long',

        }))
        return
      }
      broadcast({
        type: 'NEW_MESSAGE',
        payload: handleNewMessage(data.pseudo, data.body),
        })


    })
  })



  //history


app.get('/history', (request, reply) => {
  reply.send(messages.slice(-30))
})
// secu chat 
/*

 

let secupseudo = pseudo.slice(0, 25);
let secubody = message.body.slice(0, 240);
let errormessages = []

app.listen(3000, (err) => {
  if (err) throw err
})


if (secubody > message.lenght) {
      errormessages.push("Tapez un pseudo valable (entre 1 et 25 caractères).")
}


if (pseudo > 25 || pseudo === null) {
      secupseudo;
      errormessages.push("Tapez un pseudo valable (entre 1 et 25 caractères).")
    }
if (body > 240 || body === null) {
      secubody;
      errormessages.push("Veuillez rentrer un message compris entre 0 et 240 caractères.")
     
    } 
*/

}