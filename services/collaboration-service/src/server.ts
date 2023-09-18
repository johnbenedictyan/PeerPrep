import app from "./app";

const port = process.env["PORT"];

app.listen(port, () => {
  console.log(
    `⚡️[server]: Matching Service is running at http://localhost:${port}`
  );
});
