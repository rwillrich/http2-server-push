import componentCA from './c-a.js'
import componentCB from './c-b.js'
import componentCDA from './c-d-a.js'
import componentCDB from './c-d-b.js'
import componentCDC from './c-d-c.js'

const container = document.getElementById('app-container')
const content = document.createElement('div')
content.className = 'component'
content.style['background-color'] = '#81a558'
content.innerHTML = 'Component C'

componentCA()
componentCB()
componentCDA()
componentCDB()

componentCDC()

export default () => container.appendChild(content)
