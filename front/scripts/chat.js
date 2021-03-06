import { appendMessage } from './dom'
import { fetchAPI } from './api'

/** @param {MessageEvent} event */
function handleWSMessage(event) {
  const data = JSON.parse(event.data)

  if (data?.type === 'NEW_MESSAGE') {
    appendMessage(data.payload)
  }

  if (data?.type === 'ERROR') {
    const popup = document.querySelector('.error')
    const notification = document.createElement('div')
    notification.classList.add('errorMessage')
    notification.innerText = 'Votre message ou pseudo est trop long'
    popup?.appendChild(notification)
    setTimeout(() => {
      notification.remove();
  }, 5000);
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
/*
    let errormessages = []
    if (pseudo > 25 || pseudo === null) {
      pseudo.slice(0, 25);
      errormessages.push("Tapez un pseudo valable (entre 1 et 25 caractères).")
    }
    if (body > 20 || body === null) {
      body.slice(0, 240);
      errormessages.push("Veuillez rentrer un message compris entre 0 et 240 caractères.")
    }
*/
   
    if (!pseudo || !body) return
    localStorage.setItem("pseudo", pseudo)
    ws.send(JSON.stringify({ pseudo, body }))
    messageForm.body.value = null

    

  })
}

async function getHistory() {
  const messages = await fetchAPI('/chat/history')
  messages.forEach(appendMessage)
}
getHistory()


/** Petit bouton Darkmode */
import Darkmode from 'darkmode-js';

new Darkmode().showWidget();

const options = {
  bottom: '64px', // default: '32px'
  right: 'unset', // default: '32px'
  left: '32px', // default: 'unset'
  time: '0.5s', // default: '0.3s'
  mixColor: '#fff', // default: '#fff'
  backgroundColor: '#fff',  // default: '#fff'
  buttonColorDark: '#100f2c',  // default: '#100f2c'
  buttonColorLight: '#fff', // default: '#fff'
  saveInCookies: false, // default: true,
  label: '🌃', // default: ''
  autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();
