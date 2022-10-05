const markov = require("./markov");
const fs = require("fs");
const process = require("process");
const axios = require("axios");

function ranText(text) {
  let markMach = new markov.MarkovMachine(text);
  console.log(markMach.makeText());
}

function text(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`${err}`);
      process.exit(1);
    } else {
      ranText(data);
    }
  });
}

async function makeURLText(url) {
  let res;

  try {
    res = await axios.get(url);
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
  ranText(res.data);
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  text(path);
} else if (method === "url") {
  makeURLText(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
