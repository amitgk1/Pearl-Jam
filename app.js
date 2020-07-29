const express = require("express");
const { makeDBQuery } = require("./db");
const capitalize = require("./util");
const moment = require("moment");
const app = express();
const port = 5000;

const FORMAT = "DD/MM/YYYY";

app.get("/concerts", (req, res) => {
  if ("city" in req.query) {
    makeDBQuery({ city: capitalize(req.query.city) }).then((results) =>
      res.send(results)
    );
  } else if (["startTime", "endTime"].every((prop) => prop in req.query)) {
    const startTime = moment(req.query.startTime, FORMAT);
    const endTime = moment(req.query.endTime, FORMAT);
    if (startTime.isValid() && endTime.isValid()) {
      makeDBQuery({
        date: {
          $gte: startTime.toDate(),
          $lt: endTime.toDate(),
        },
      }).then((results) => res.send(results));
    } else {
      res.send(
        `You Have Entered an Invaid Date, please use the the date format: ${FORMAT}`
      );
    }
  } else {
    res.send(
      `<p>query the db using the url query params: city or startTime & endTime :) <br /> date format: ${FORMAT} </p>`
    );
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
