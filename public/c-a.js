const container = document.getElementById('app-container')
const content = document.createElement('div')
content.className = 'component'
content.style['background-color'] = '#cc9837'
content.innerHTML = 'Component C-A'

export default () => container.appendChild(content)
