import express from 'express';
const app = express();
app.use(express.json());
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
//GET:fetch all users data
app.get('/users', (req, res) => {
    res.json(users);
});
//POST: create a new user
app.post('/users', (req, res) => {
    let newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.json
    res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
    let user = users.find(u => u.id ==req.params.id);
    user.name = req.body.name;
    user.email = req.body.email;
    res.send("User Updated Successfully");
    res.json(user);
})
// DELETE - Delete a user by ID
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const userExists = users.some((user) => user.id === id);

  if (!userExists) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users = users.filter((user) => user.id !== id);

  res.json({
    message: "User deleted successfully",
  });
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
