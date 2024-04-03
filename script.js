const express = require("express");
const app = express();
const port = 3000;

let users = [
  {
    id: "1",
    password: "123",
    name: "User1",
    Description: "Neki Opis 1",
    groupName: "Group1",
    category: {
      createdAt: "Neko vreme",
      amount: "Neka Vrednost",
      action: "Neka Akcija",
    },
  },
  {
    id: "2",
    password: "321",
    name: "User2",
    group: "Group2",
    category: "Category2",
  },
  // Add more users as needed
];

app.get("/users", (req, res) => {
  const id = req.query.id;
  const password = req.query.password;
  // Now you can use the id and password for further processing
  // For example, you might want to find the user with this id and password
  const user = users.find((user) => {
    console.log(user.id === id);
    console.log(user.password === password);
    return user.id === id && user.password === password;
  });
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
