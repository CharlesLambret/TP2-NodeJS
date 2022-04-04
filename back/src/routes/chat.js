import { randomUUID } from 'crypto';
import { format } from 'date-fns';

/*const messageForm = document.querySelector('#new-message')*/

/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 */

/** @type { Message[] } */

const messages = []

/*let testdate = firstdate.getTime()
let testdate1 = firstdate.getDate()
console.log(firstdate.toString());
console.log(firstdate.getTimezoneOffset());
console.log(testdate1)
*/

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
        payload: handleNewMessage(data.pseudo, data.body),
      })
    })
  })

  //history
/*   app.get('/history', (request, reply) => {
    reply.send(messages) 
  })*/
}
// secu chat inch'allah 
/*  
const pseudo = messageForm.pseudo.value
const body = messageForm.body.value
let secupseudo = pseudo.slice(0, 25);
let secubody = body.slice(0, 240);
let errormessages = []
if (pseudo > 25 || pseudo === null) {
      secupseudo;
      errormessages.push("Tapez un pseudo valable (entre 1 et 25 caractères).")
    }
if (body > 240 || body === null) {
      secubody;
      errormessages.push("Veuillez rentrer un message compris entre 0 et 240 caractères.")
    } */