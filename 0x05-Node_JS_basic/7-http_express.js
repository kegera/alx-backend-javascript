const express = require('express');
const fs = require('fs');
<<<<<<< HEAD

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Bezaleel Olakunori <https://github.com/B3zaleel>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reportParts = [];
        const fileLines = data.toString('utf-8').trim().split('\n');
        const studentGroups = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames.slice(
          0,
          dbFieldNames.length - 1,
        );

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord.slice(
            0,
            studentRecord.length - 1,
          );
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
          }
          const studentEntries = studentPropNames.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(studentGroups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportParts.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(studentGroups)) {
          reportParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const responseParts = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    })
    .catch((err) => {
      responseParts.push(err instanceof Error ? err.message : err.toString());
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
=======
const csv = require('csv-parser');

const app = express();
const port = 1245;

// Define the route for the root path '/'
app.get('/', (req, res) => {
    res.send('Hello Holberton School!');
});

// Define the route for '/students'
app.get('/students', (req, res) => {
    let studentsData = '';
    let studentsCount = 0;
    let csStudentsCount = 0;
    let sweStudentsCount = 0;
    let csStudents = [];
    let sweStudents = [];

    fs.createReadStream(process.argv[2])
        .pipe(csv())
        .on('data', (row) => {
            if (row.Name && row.Age && row.Field) {
                studentsCount++;
                if (row.Field === 'CS') {
                    csStudentsCount++;
                    csStudents.push(row.Name);
                } else if (row.Field === 'SWE') {
                    sweStudentsCount++;
                    sweStudents.push(row.Name);
                }
            }
        })
        .on('end', () => {
            studentsData += 'This is the list of our students
';
            studentsData += `Number of students: ${studentsCount}
`;
            studentsData += `Number of students in CS: ${csStudentsCount}. List: ${csStudents.join(', ')}
`;
            studentsData += `Number of students in SWE: ${sweStudentsCount}. List: ${sweStudents.join(', ')}
`;

            res.send(studentsData);
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
>>>>>>> d355e75653ab162ec877646a51c43d5be79c0d20
});

module.exports = app;
