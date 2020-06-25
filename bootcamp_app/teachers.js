const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'vagrant'
});



// **Parametized was of the bottom code, always do it this way when accepting inputs**
const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;

const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`, limit];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(teacher => {
    console.log(`${teacher.cohort}: ${teacher.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));




//  **Not a good way to do it as it will accept malicious code**
// pool.query(`
// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort 
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name LIKE '%${process.argv[2]}%'
// ORDER BY teacher;
// `)
//   .then(res => {
//     res.rows.forEach(teacher => {
//       console.log(`${teacher.cohort}: ${teacher.teacher}`);
//     })
//   })
//   .catch(err => console.error('query error', err.stack));
