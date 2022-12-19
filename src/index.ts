import express from "express"

export const app = express()

app.use(express.json())

const port = 3000

const db = {
  courses: [
    { id: 1, title: "front" },
    { id: 2, title: "back" },
    { id: 3, title: "web3" },
  ],
}

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
}

// app.use(bodyParser.json({ type: 'application/*+json' }))
app.get("/skill", (req, res) => {
  let foundCurses = db.courses

  if (req.query.title) {
    foundCurses = foundCurses.filter(
      (s) => s.title.indexOf(req.query.title as string) > -1
    )
  }

  res.json(foundCurses)
})

app.get("/skill/:id", (req, res) => {
  const findSkill = db.courses.find((c) => c.id === +req.params.id)

  if (!findSkill) {
    res.sendStatus(404)
    return
  }

  res.json(findSkill)
})

app.post("/skill", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(400)
    return
  }

  const createSkill = {
    id: +new Date(),
    title: req.body.title,
  }

  db.courses.push(createSkill)

  res.status(201).json(createSkill)
})

app.delete("/skill/:id", (req, res) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id)

  res.sendStatus(204)
})
app.put("/skill/:id", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(400)
    return
  }
  const findSkill = db.courses.find((c) => c.id === +req.params.id)

  if (!findSkill) {
    res.sendStatus(404)
    return
  }
  findSkill.title = req.body.title

  res.sendStatus(204)
})
app.delete("/__test__/data", (req, res) => {
  db.courses = []
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
