const express = require("express")
const app = express()

app.get("/fortnite/api/game/v2/world/info", (req, res) => {
    const worldResponse = require("../Files/Responses/worldstw.json")
    res.json(worldResponse)
})

module.exports = app