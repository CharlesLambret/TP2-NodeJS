import { appendMessage } from './dom'

/** @param {MessageEvent} event */
function handleWSMessage(event) {
  const data = JSON.parse(event.data)

  if (data?.type === 'NEW_MESSAGE') {
    appendMessage(data.payload)
  }
}

const ws = new WebSocket('ws://localhost:5000/chat')
ws.onopen = function open() {
  console.log('ws connected')
}
ws.onmessage = handleWSMessage




export function initChat() {
  /** @type {HTMLFormElement | null} */
  const pseudo = document.getElementById("pseudo");
  const body = document.getElementById("body");
/* Securisation du chat en coupant les valeurs trop hautes avec un message d'erreur*/
  let errormessages = []
  if (pseudo.value > 25 || pseudo.value === null) {
    pseudo.slice(0, 25);
    errormessages.push("Tapez un pseudo valable (entre 1 et 25 caractères).")
  }
  if (body.value > 240 || body.value === null) {
    body.slice(0, 240);
    errormessages.push("Veuillez rentrer un message compris entre 0 et 240 caractères.")
  }

  const messageForm = document.querySelector('#new-message')
  if (!messageForm) throw new Error('missing form')

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
  
    const pseudo = messageForm.pseudo.value
    const body = messageForm.body.value

    if (!pseudo || !body) return

    ws.send(JSON.stringify({ pseudo, body }))
    messageForm.body.value = null
  })
}
