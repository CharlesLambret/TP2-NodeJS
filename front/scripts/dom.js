import {ReactComponent as IconeDelete} from './img/trashicon.svg';
import deletelastmessage from '../../back/src/routes/chat.js';
const main = document.querySelector('main')

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')
  msgEl.classList.add(IconeDelete);

/*Supprime le dernier message sauvegardé dans le tableau*/
  IconeDelete.onClick(deletelastmessage);
  // <div class="message"></div>

  const pseudoSpan = document.createElement('span')
  pseudoSpan.textContent = data.pseudo
  // <span>Hugo</span>
  msgEl.append(pseudoSpan)

  const bodyP = document.createElement('p')
  bodyP.textContent = data.body
  // <p>Hello world</p>
  msgEl.append(bodyP)

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
}
