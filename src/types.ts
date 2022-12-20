import { Request } from "express"

export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestQueryString<T> = Request<{}, {}, {}, T>
export type RequestWithParam<T> = Request<T>
