const Sequelize = require('sequelize');
const StudentModel = require('./student');
const TeacherModel = require('./teacher');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
    const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'mysql',
        logging: false,
    });

    const Student = StudentModel(connection, Sequelize);
    const Teacher = TeacherModel(connection, Sequelize);

    Student.belongsTo(Teacher, { as: 'teacher'});

    connection.sync({ alter: true });

    return {
        Student,
        Teacher
    }

};

module.exports = setupDatabase();