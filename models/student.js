module.exports = (connection, DataTypes) => {
    const schema = {
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
    };

    const StudentModel = connection.define('Student', schema);
    return StudentModel;
};
