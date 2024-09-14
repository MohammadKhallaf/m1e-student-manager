const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Student <- Model

const dataFilePath = path.join(__dirname, "students.json");

class StudentManager {
  constructor() {
    this.students = []; // JS Model container
  }

  //  --------------- file system access
  async saveStudents() {
    try {
      // save from app to file
      const studentsJSON = JSON.stringify(this.students);
      await fs.writeFile(dataFilePath, studentsJSON);
    } catch (error) {
      console.warn(error);
    }
  }

  // read
  async loadStudents() {
    // from file --> to app
    try {
      const list = await fs.readFile(dataFilePath, "utf-8");
      this.students = JSON.parse(list);
    } catch (error) {
      this.students = [];
    } finally {
      console.log("The operation is done!");
    }
  }

  //  --------------- interaction with app ----------

  // create
  async createStudent(student) {
    // check if id is already exist

    // from app to app
    this.students.push({
      ...student,
      id: uuidv4(),
    });

    await this.saveStudents();
  }

  async getAllStudents() {
    await this.loadStudents();
    return this.students;
  }

  async getStudentById(id) {
    await this.loadStudents();
    const studentObj = this.students.find(
      (student) => student.id.toString() === id.toString()
    );
    return studentObj;
    // throw new Error("There is no item with this id");
  }

  // - add age to the student object
  //  add filter method to get students within range

  async getStudentByAgeFilter(startAge, endAge) {
    // numbers
    // withing allowed range
    // 60
    // 12
    await this.loadStudents();
    const filteredStudents = this.students.filter((item) => {
      return item.age >= startAge && item.age <= endAge;
    });

    return filteredStudents;
  }

  // delete one student
  async deleteOneStudent(id) {
    await this.loadStudents();
    const idx = this.students.findIndex((item) => {
      return item.id.toString() === id.toString();
    });

    if (idx > -1) {
      // add check
      this.students.splice(idx, 1);
      await this.saveStudents();
    }
  }
  // delete all students -> don't use it in real world

  async deleteAllStudents() {
    await this.loadStudents();
    this.students = [];
    await this.saveStudents();
  }

  // update student

  async updateStudent(id, updatedObj) {
    // scalable
    // two approaches -> partial update / full replace
    // search -> student @ DB
    // get the previous data -> update -> save
    // 1. Load
    await this.loadStudents();

    const idx = this.students.findIndex((item) => {
      return item.id.toString() === id.toString();
    });
    const oldData = this.students[idx];

    const updatedStudent = {
      ...oldData, // SPREAD
      ...updatedObj, // spread
    };
    this.students[idx] = updatedStudent;
    // schema ->> shape خريطة
    // . Save
    await this.saveStudents();
    // []
    // {errorMessage:}
    return this.students[idx];
  }

  // update student with totaly new data
  async updateStudentNewData(id, updatedObj) {
    // two approaches -> partial update / full replace
    // search -> student @ DB
    // get the previous data -> update -> save
    // 1. Load
    await this.loadStudents();

    const idx = this.students.findIndex((item) => {
      return item.id === id;
    });

    this.students[idx] = { ...updatedObj, id };
    // . Save
    await this.saveStudents();
    return this.students[idx];
  }

  // ----------- //
}

module.exports = StudentManager;
