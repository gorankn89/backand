const express = require("express");
const app = express();
const port = 3000;

let users = [
  { id: 1, name: "User1", group: "Group1", category: "Category1" },
  { id: 2, name: "User2", group: "Group2", category: "Category2" },
  // Add more users as needed
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
