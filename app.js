const express = require("express");
const StudentManager = require("./studentsManager");

const app = express();
const manager = new StudentManager();

app.use(express.json()); // json parser

app.get("/", (req, res) => {
  res.send("Hello,world");
});

// get all
app.get("/students", async (req, res) => {
  const studentList = await manager.getAllStudents();
  res.json(studentList);
});

// get one
app.get("/students/:id", async (req, res) => {
  const student = await manager.getStudentById(req.params.id);
  console.log(student);
  res.json(student);
});

// update
app.patch("/students/:id", async (req, res) => {
  const { id } = req.params;
  await manager.updateStudent(id, req.body);
  res.json("Success");
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  await manager.deleteOneStudent(id);
  res.json("Success");
});

// get filtered
app.get("/students/", async (req, res) => {
  const query = req.query;
  // casting => + | Number()
  const from = +query.from;
  const to = +query.to;

  const studentList = await manager.getStudentByAgeFilter(from, to);

  res.json(studentList);
});

// create
app.post("/students", async (request, res) => {
  const data = request.body;
  await manager.createStudent(data);
  res.status(200).json("Success");
});

// run server
app.listen(3000, () => {
  console.log("Server is running @ port", 3000);
});
