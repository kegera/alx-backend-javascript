const express = require('express');
const fs = require('fs');
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
});

module.exports = app;
