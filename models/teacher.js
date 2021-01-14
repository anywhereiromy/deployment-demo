module.exports = (connection, DataTypes) => {
    const schema = {
        name: DataTypes.STRING,
        age: DataTypes.INTEGER,
    };

    const TeacherModel = connection.define('Teacher', schema);
    return TeacherModel;
};
