const express = require('express');
const { Student, Teacher } = require('./models');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res)=> {
    res.send('Hello world');
})

app.post('/students', (req, res) => {
    Student.create(req.body).then(student => {
        if (!student) {
            res.status(400).json({ error: 'We could not create this student.'})
        }
        res.status(201).json(student);
    })
});

app.post('/teachers', (req, res) => {
    Teacher.create(req.body).then(teacher => {
        if (!teacher) {
            res.status(400).json({ error: 'We could not create this teacher.'})
        }
        res.status(201).json(teacher);
    })
});


app.get('/students', (req, res) => {
    Student.findAll({ where: req.query }).then(students => {
        res.status(200).json(students);
    })
});

app.get('/students/:id', (req, res) => {
    const { id } = req.params;
    Student.findByPk(id).then(student => {
        res.status(200).json(student);
    })
});

app.patch('/students/:id', (req, res) => {
    const { id } = req.params;
    Student.update(req.body, { where: {id: id } }).then(([rowsUpdated]) => {
        if (!rowsUpdated) {
            res.status(404).json({ error: 'The student could not be found.' });
        } else {
            res.status(200).json(rowsUpdated);
        }
    })
    .catch(e => console.log(`Update student error - ${e}`))
});

app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    Student.destroy({ where: { id } }).then(rowsDeleted => {
        if (rowsDeleted < 1) {
            res.status(404).json({ error: 'The student could not be found.' });
        } else {
            res.status(204).json({ message: 'successfully deleted'});
        }
    })
    .catch(e => console.log(`Remove student error - ${e}`));
});

app.listen(port, () => {
    console.log(`Example app is listening on port ${port}`);
});
