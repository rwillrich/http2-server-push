const container = document.getElementById('app-container')
const content = document.createElement('div')
content.className = 'component'
content.style['background-color'] = '#229c81'
content.innerHTML = 'Component C-D-B'

export default () => container.appendChild(content)
