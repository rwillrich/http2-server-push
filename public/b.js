const container = document.getElementById("app-container")
const content = document.createElement("span")
content.style.color = "red"
content.innerHTML = "My red text"

export default (name = 'World') => container.appendChild(content)
