const main = document.querySelector('main')

/** @param {Record<string, string>} data */
export function appendMessage(data) {
  const msgEl = document.createElement('div')
  msgEl.classList.add('message')
  // <div class="message"></div>

  const pseudoSpan = document.createElement('span')
  pseudoSpan.classList.add('pseudo');
  pseudoSpan.textContent = data.pseudo
  // <span>Hugo</span>
  msgEl.append(pseudoSpan)

// DATE DANS UN MESSAGE

  const firstdateP = document.createElement('p')
  firstdateP.classList.add('date');
  firstdateP.textContent = data.firstdate
  // <p> 28/12/2001 10:10:10 </p>
  msgEl.append(firstdateP)

  const bodyP = document.createElement('p')
  bodyP.classList.add('msg');
  bodyP.textContent = data.body
  // <p>Hello world</p>
  msgEl.append(bodyP)

  main?.appendChild(msgEl)
  main?.scrollTo(0, main.scrollHeight)
}