import express from "express";
import fs from "fs";
import https from "https";

const app = express();

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.post("/test-streaming", async (req, res) => {
  res.set({ "transfer-encoding": "chunked" });
  const testArray = Array.from({ length: 5000 }, (_, i) => i + 1);
  for (const element of testArray) {
    const toWrite = element % 500 === 0 ? `${element}\n` : `${element} `;
    res.write(toWrite);
    await sleep(50);
  }
  res.end();
})

https
  .createServer(
    {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
    app
  )
  .listen(3000);
