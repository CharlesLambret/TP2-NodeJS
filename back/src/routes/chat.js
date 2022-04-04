import { randomUUID } from 'crypto'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 */

/** @type { Message[] } */
const messages = []
const date = new Date()
//tableau pour stocker les messages envoyés
//tableau =[]
formatDistanceToNow(date, [options])

JSON.stringify(date)

/*Sécurisation du chat avec une limite de caractères*/
const pseudo = document.getElementById("pseudo");
const body = document.getElementById("body");

/*Sécurisation du chat avec coupe des entrées si elles sont trop longues */
const errormessages = []
  if (pseudo.value > 25 || pseudo.value === null) {
    pseudo.slice(0, 25);
    errormessages.push("Tapez un pseudo valable (entre 1 et 25 caractères).")
  }
  if (body.value > 240 || body.value === null) {
    body.slice(0, 240);
    errormessages.push("Veuillez rentrer un message compris entre 0 et 240 caractères.")
  }

/*Tableau pour contenir les messages envoyés*/
const savedmessages =[];

/*Si le message est contenu dans le tableau il est affiché à droite sinon à gauche*/
  savedmessages.includes(messages) ? messages.style.displayright : messages.style.displayleft;


const deletelastmessage = savedmessages.pop();

/**
 * @param {string} pseudo
 * @param {string} body
 */
function handleNewMessage(pseudo, body) {
  const message = {
    id: randomUUID(),
    pseudo,
    date,
    body,
  }
  messages.push(message)
/*Envoie les messages dans le tableau*/
savemessages.append(message);
  return message
}

// matrice regroupant les utilisateurs que l'on nomme identification
/**identifiant = [] //id de l'utilisateur
mdp = [] //mdp de l'utilisateur

identification = [identifiant][mdp]
// pour pouvoir ajouter un nouvel utilisateur
identication.append(id, mdp)
// exemple de format pour la matrice
identification = [[charlotte, zbuovbruo], [marc, jbsfveiu], [julie, zvobu]]

// si l'utilisateur n'est pas nouveau il suffit de vérif s'il fait parti de la matrice et si oui autoriser la connection



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
}
