const express = require("express");
const StudentManager = require("./studentsManager");
const Ajv = require("ajv");

const app = express();
const manager = new StudentManager();
const ajv = new Ajv();

const studentSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      //  30
    },
    age: {
      type: "number",
      minimum: 5,
      maximum: 60,
    },
    salary: {
      type: "number",
    },
    NID: {
      type: "string",
    },
  },
  required: ["name", "NID"],
  additionalProperties: false,
};

const validateStudent = ajv.compile(studentSchema);

app.get("/", (req, res) => {
  res.send("Hello,world");
});

// get one
app.get("/students/:id", async (req, res) => {
  const student = await manager.getStudentById(req.params.id);
  console.log(student);
  res.json(student);
});

// get filtered
app.get("/students/", async (req, res) => {
  const query = req.query;
  // casting => + | Number()
  const from = +query.from;
  const to = +query.to;

  if (from && to) {
    console.log(from, to);
    const studentList = await manager.getStudentByAgeFilter(from, to);

    res.json(studentList);
  } else {
    const studentList = await manager.getAllStudents();
    res.json(studentList);
  }
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

// create
app.post("/students", async (request, res) => {
  const data = request.body;
  const valid = validateStudent(data);
  if (valid) {
    await manager.createStudent(data);
    res.status(200).json("Success");
  } else {
    res.status(400).json("Not Valid!");
  }
});
