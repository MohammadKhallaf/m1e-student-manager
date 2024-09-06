const express = require("express");
const StudentManager = require("./studentsManager");

const app = express();
const manager = new StudentManager();

app.use(express.json()); // json parser

// routes
app.get("/", (req, res) => {
  res.send("Hello,world");
});

app.get("/students", async (req, res) => {
  const studentList = await manager.getAllStudents();
  res.json(studentList);
});

app.get("/students/:id", async (req, res) => {
  const student = await manager.getStudentById(req.params.id);
  console.log(student);
  res.json(student);
});

app.post("/students", async (request, res) => {
  const data = request.body;
  await manager.createStudent(data);
  res.status(200).json("Success");
});

// run server
app.listen(3000, () => {
  console.log("Server is running @ port", 3000);
});
