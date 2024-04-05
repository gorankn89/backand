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
    user: "Test Testovic",
    description: "Neki Opis 1",
    groupName: "Group1",
    expense: {
      description: "Neko vreme",
      amount: "Neka Vrednost",
      expenseGroup: "Neka Akcija",
    },
    income: {
      description: "nesto opisano",
      amount: "Neka Suma",
      incomeGroup: {
        name: ["Prvi income"],
        description: ["Test prvog income"],
      },
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
user = "";
function findUser(name, password) {
  user = "";
  console.log(name);
  console.log(password);
  user = users.find((user) => {
    console.log(user.name === name);
    console.log(user.password === password);
    return user.name === name && user.password === password;
  });
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const password = req.query.password;
  // Now you can use the name and password for further processing
  // For example, you might want to find the user with this name and password
  findUser(name, password);
  console.log(user);
  let idPassName = { id: user.id, name: user.name, password: userr.password };
  if (user) {
    res.json(idPassName);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
//GET EXPENSE
app.get("/expense", (req, res) => {
  const name = req.query.name;
  const password = req.query.password;
  // Now you can use the name and password for further processing
  // For example, you might want to find the user with this name and password
  findUser(name, password);

  console.log(user);
  if (user) {
    res.json(user.expense);
  } else {
    res.status(401).json({ message: "User not autorized" });
  }
});

//GET INCOME
app.get("/income", (req, res) => {
  const name = req.query.name;
  const password = req.query.password;
  // Now you can use the name and password for further processing
  // For example, you might want to find the user with this name and password
  findUser(name, password);

  console.log(user);
  if (user) {
    res.json(user.income);
  } else {
    res.status(401).json({ message: "User not autorized" });
  }
});

//GET INCOME Group
app.get("/incomegroup", (req, res) => {
  const name = req.query.name;
  const password = req.query.password;
  // Now you can use the name and password for further processing
  // For example, you might want to find the user with this name and password
  findUser(name, password);

  console.log(user);
  if (user) {
    res.json(user.income.incomeGroup);
  } else {
    res.status(401).json({ message: "User not autorized" });
  }
});

// POST /createuser to register a new user
// Express route to create a new user
app.post("/createuser", (req, res) => {
  const { password, name } = req.body;

  // You would typically validate the input and then create the user
  // For example, check if the user already exists, hash the password, etc.
  const userCreationStatus = createUser(password, name);

  if (userCreationStatus.success) {
    res.status(201).json({ message: "User created successfully" });
  } else {
    res.status(400).json({ error: userCreationStatus.error });
  }
});

// Function to create a new user
function createUser(password, name) {
  const existingUser = users.find((user) => user.name === name);

  if (existingUser) {
    return {
      success: false,
      error: "User already exists. Please choose a different name.",
    };
  } else {
    const newUser = {
      id: users.length + 1,
      password: password,
      name: name,
      user: "Test Testovic",
      description: "Neki Opis 1",
      groupName: "Group1",
      expense: {
        description: "Neko vreme",
        amount: "Neka Vrednost",
        expenseGroup: "Neka Akcija",
      },
      income: {
        description: "nesto opisano",
        amount: "Neka Suma",
        incomeGroup: {
          name: ["Prvi income"],
          description: ["Test prvog income"],
        },
      },
      reminder: {
        reminderDay: "Neki dan",
        type: "tip",
        active: "Neka aktivna sta god",
      },
    };

    users.push(newUser);
    return { success: true };
  }
}

// REMOVING USERS

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);
    res.status(200).send({ message: "User removed successfully." });
  } else {
    res.status(404).send({ message: "User not found." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
