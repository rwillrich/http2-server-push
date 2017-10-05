const container = document.getElementById('app-container')
const content = document.createElement('div')
content.className = 'component'
content.style['background-color'] = '#229c81'
content.innerHTML = 'Component A'

export default () => container.appendChild(content)
