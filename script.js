const express = require("express");
const cors = require("cors"); // Add this line
const app = express();
const path = require("path");
app.use(cors()); // Add this line

app.use(express.static(path.join(__dirname, "build")));
const port = 3100;

let users = [
  {
    id: "1",
    password: "123",
    name: "User1",
    description: "Neki Opis 1",
    groupName: "Group1",
    expense: {
      description: "Neko vreme",
      amount: "Neka Vrednost",
      expenseGroup: "Neka Akcija",
    },
    incomeGroup: {
      name: "Neko ime",
      description: "Neki opis",
    },
    income: {
      description: "nesto opisano",
      amount: "Neka Suma",
      incomeGroup: "Neka grupa",
    },
    reminder: {
      reminderDay: "Neki dan",
      type: "tip",
      active: "Neka aktivna sta god",
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
// Globalna autorizacija i find funkcija

let user = false;
function findUser(id, password) {
  users.find((user) => {
    user = false;
    console.log(user.id === id);
    console.log(user.password === password);
    return user.id === id && user.password === password;
  });
}

app.get("/users", (req, res) => {
  const id = req.query.id;
  const password = req.query.password;
  // Now you can use the id and password for further processing
  // For example, you might want to find the user with this id and password
  findUser(id, password);
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.get("/expense", (req, res) => {
  const id = req.query.id;
  const password = req.query.password;
  // Now you can use the id and password for further processing
  // For example, you might want to find the user with this id and password
  findUser(id, password);

  console.log(user);
  if (user) {
    res.json(user.expense);
  } else {
    res.status(401).json({ message: "User not autorized" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
