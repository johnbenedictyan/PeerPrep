import app from "./app";

const port = process.env["SERVER_PORT"];

app.listen(port, () => {
  console.log(
    `⚡️[server]: Matching Service is running at http://localhost:${port}`
  );
});
