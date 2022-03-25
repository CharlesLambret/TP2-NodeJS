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

/* Securisation du chat en coupant les valeurs trop hautes avec un message d'erreur*/
if ("pseudo".length > 25 || null) {
  "pseudo".slice(0, 25);
  alert("Tapez un pseudo valable (entre 1 et 25 caractères) pour avoir une réponse.")}
if ("body".length > 240 || null) {
  "pseudo".slice(0, 240);
  alert("Veuillez rentrer un message compris entre 0 et 240 caractères.")}

export function initChat() {
  /** @type {HTMLFormElement | null} */
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
