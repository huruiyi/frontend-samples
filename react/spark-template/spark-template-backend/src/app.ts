import cors from "cors"
import express, { type ErrorRequestHandler } from "express"
import helmet from "helmet"
import { ZodError } from "zod"

import { config } from "./config.js"
import { notesRouter } from "./routes/notes.js"
import { vaultsRouter } from "./routes/vaults.js"

export const createApp = () => {
  const app = express()
  app.disable("x-powered-by")
  app.use(helmet())
  app.use(cors({ origin: config.corsOrigins, methods: ["GET", "POST", "PUT", "DELETE"] }))
  app.use(express.json({ limit: "2mb" }))

  app.get("/api/health", (_request, response) => response.json({ status: "ok" }))
  app.use("/api/v1/vaults", vaultsRouter)
  app.use("/api/v1/vaults/:vaultId/notes", notesRouter)

  app.use((_request, response) => response.status(404).json({ message: "Not found" }))
  const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
    if (error instanceof ZodError) {
      response.status(400).json({ message: "Invalid request", issues: error.issues })
      return
    }
    console.error(error)
    response.status(500).json({ message: "Internal server error" })
  }
  app.use(errorHandler)
  return app
}
