const StudentManager = require("./studentsManager");

const manager = new StudentManager();

// manager -> CRUD

async function getList() {
  // done
  const studentList = await manager.getAllStudents();
  console.log(studentList);
}

async function addNew(student) {
  //
  await manager.createStudent(student);
  getList();
}

async function readOne(id) {
  const student = await manager.getStudentById(id);
  console.log(student);
}
// readOne(1724102443870);

// update age -> ali

async function updateOne(id, newData) {
  // PATCH
  const newStudentData = await manager.updateStudent(id, newData);
  console.log(newStudentData);
}

async function updateAndReplaceOne(id, newData) {
  // PUT
  const newStudentData = await manager.updateStudentNewData(id, newData);
  console.log(newStudentData);
}

async function deleteOne(id) {
  await manager.deleteOneStudent(id);
  console.log("Student delete complete!");
}

async function deleteAll() {
  await manager.deleteAllStudents();
  console.log("Students delete complete!");
}

async function getByAge(from, to) {
  const arr = await manager.getStudentByAgeFilter(from, to);
  console.log(arr);
}
