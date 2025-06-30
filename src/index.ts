import { server } from "./server/server";

server.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on http://localhost:4000");
});