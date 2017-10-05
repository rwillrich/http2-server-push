const container = document.getElementById('app-container')
const content = document.createElement('div')
content.className = 'component'
content.style['background-color'] = '#ae8a33'
content.innerHTML = 'Component C-B'

export default () => container.appendChild(content)
