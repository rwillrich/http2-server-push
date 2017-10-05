const container = document.getElementById("app-container")
const content = document.createElement("span")
content.style.color = "blue"
content.innerHTML = "My blue text"

export default (name = 'World') => container.appendChild(content)
