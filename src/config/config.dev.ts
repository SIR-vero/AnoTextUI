const serverProtocol = "http"
const server = "localhost"
const port = "3500"
const basePath = `${serverProtocol}://${server}:${port}`
const uiPort = "3000"
const uiBasePath = `${serverProtocol}://${server}:${uiPort}`



export default {
    env: "dev",
    basePath,
    uiBasePath
}