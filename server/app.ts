/**
 * @file app.js
 */

//  Modules
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from 'express';
import { Routes } from "./v1/routes";

// constants
const {
  PORT,
} = process.env
const app = express();
const port = PORT || "8000";

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

// support parsing of application/json type post data
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Here we are in sms management app' });
})

// Routes
Routes.forEach(route => {
  (app as any)[route.method](
    route.route,
    async (req: Request, res: Response, next: Function ) => {
      const controller = new route.controller() as any;
      try {
        const result = await controller[route.action](req, res, next)

        if(result && result.writable) return result;
        return res.status(200).json(result)
      } catch (error) {
        return res.status(500).json(`error: ${error}`)
      }
    }
  )
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;
