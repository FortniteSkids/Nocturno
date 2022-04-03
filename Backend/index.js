const express = require("express")
const app = express()
const port = process.env.PORT || 80;

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get("/", (req, res) => {
    res.send("Your mother")
})

app.use(require(`./Handlers/MainHandler`))
app.use(require(`./Handlers/McpHandler`))
app.use(require(`./Handlers/StwHandler`))

app.listen(port, () => {
    console.log("NocturnoServer listening on port " + port)
})