const { default: ollama } = require('ollama')

const chat = async (content) => ollama.chat({ model: 'mistral', messages: [{ role: 'user', content }] })

module.exports = { chat }
