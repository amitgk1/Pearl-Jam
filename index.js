const https = require("https");
const { parse } = require("node-html-parser");
const { insertConcerts } = require("./db");

https
  .get("https://pearljam.com/tour", (res) => {
    // console.log("statusCode:", res.statusCode);
    // console.log("headers:", res.headers);

    const body = [];
    res.on("data", (chunk) => {
      body.push(chunk);
    });

    res.on("end", () => {
      data = Buffer.concat(body).toString();
      const root = parse(data, { script: true });
      const concertsString = root.querySelector("#data");
      const concertsArray = JSON.parse(concertsString.childNodes[0]).shows.tour;
      const modifiedConcerts = concertsArray.reduce((prev, curr) => {
        if (curr.title.includes("Pearl Jam")) {
          const DateObjShows = curr.shows.map((show) => ({
            ...show,
            date: new Date(show.date),
          }));
          return [...prev, ...DateObjShows];
        }
        return prev;
      }, []);
      insertConcerts(modifiedConcerts);
    });
  })
  .on("error", (e) => {
    console.error(e);
  });
