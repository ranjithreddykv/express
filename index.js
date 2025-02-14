import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

//sample in-memory database(arrays of users)
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

//GET -retrieve all data
app.get("/users", (req, res) => {
  res.json(users);
});

//GET -retrieve a specific user by ID
app.get("/user/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ error: "user Not found" });
  res.json(user);
});

//POST -create a new user
app.post("/users/create-user", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(users);
});
//put-update an existing user
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;
  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = name || user.name;
  res.json(users);
});
// DELETE -remove a user
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((u) => u.id !== userId);
  res.json({ message: "User Deleted Succesfully" });
});

app.listen(port, () => {
  console.log(`server running on port number http://localhost:${port}`);
});
