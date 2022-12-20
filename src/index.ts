import {
  cursesType,
  RequestWithBody,
  RequestWithParam,
  RequestWithParamsAndBody,
} from "./types"
import express, { Request, Response } from "express"
import { CreateInputModel } from "./model/createModel"

export const app = express()

app.use(express.json())

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
}

const port = 3000

const db: { courses: cursesType[] } = {
  courses: [
    { id: 1, title: "front" },
    { id: 2, title: "back" },
    { id: 3, title: "web3" },
  ],
}

const getDataViewModel = (db: cursesType): cursesType => { // need
  return {
    id: db.id,
    title: db.title,
  }
} 

//GET_ALL
app.get(
  "/skill",
  (req: Request<{}, {}, {}, CreateInputModel>, res: Response<cursesType[]>) => {
    let foundCurse = db.courses

    if (req.query.title) {
      foundCurse = foundCurse.filter(
        (s) => s.title.indexOf(req.query.title) > -1
      )
    }

    res.json(
      foundCurse.map((db) => {
        return {
          id: db.id,
          title: db.title,
        }
      })
    )
  }
)
//GET_ID
app.get(
  "/skill/:id",
  (req: RequestWithParam<{ id: string }>, res: Response<cursesType>) => {
    const findSkill = db.courses.find((c) => c.id === +req.params.id)

    if (!findSkill) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
      return
    }

    res.json(getDataViewModel(findSkill))
  }
)
//POST
app.post(
  "/skill",
  (req: RequestWithBody<CreateInputModel>, res: Response<cursesType>) => {
    if (!req.body.title) {
      res.sendStatus(400)
      return
    }

    const createSkill = {
      id: +new Date(),
      title: req.body.title,
    }

    db.courses.push(createSkill)

    res.status(201).json(getDataViewModel(createSkill))
  }
)

app.delete(
  "/skill/:id",
  (req: RequestWithParam<{ id: string }>, res: Response) => {
    db.courses = db.courses.filter((c) => c.id !== +req.params.id)

    res.sendStatus(204)
  }
)
app.put(
  "/skill/:id",
  (req: RequestWithParamsAndBody<{ id: string }, CreateInputModel>, res) => {
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
  }
)
app.delete("/__test__/data", (req, res) => {
  db.courses = []
  res.sendStatus(204)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
