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
  const messageForm = document.querySelector('#new-message')
  if (!messageForm) throw new Error('missing form')
  
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const pseudo = messageForm.pseudo.value
    const body = messageForm.body.value
    const firstdate = messageForm.firstdate

    let errormessages = []
    if (pseudo > 25 || pseudo === null) {
      pseudo.slice(0, 25);
      errormessages.push("Tapez un pseudo valable (entre 1 et 25 caractères).")
    }
    if (body > 240 || body === null) {
      body.slice(0, 240);
      errormessages.push("Veuillez rentrer un message compris entre 0 et 240 caractères.")
    }

    if (!pseudo || !body) return

    ws.send(JSON.stringify({ pseudo, body, firstdate }))
    messageForm.body.value = null

  })
}
