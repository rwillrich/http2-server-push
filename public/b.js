const container = document.getElementById('app-container')
const content = document.createElement('div')
content.className = 'component'
content.style['background-color'] = '#81a558'
content.innerHTML = 'Component B'

export default () => container.appendChild(content)
