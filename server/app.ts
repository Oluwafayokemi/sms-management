/**
 * @file app.js
 */

//  Modules
import * as express from "express";
import * as bodyParser from "body-parser";
// constants
const app = express();
const port = process.env.PORT || 8000;

// support parsing of application/json type post data
app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json('Here we are in sms management app');
});


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;
