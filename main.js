const { create } = require('domain');
const {Sequelize} = require('sequelize');
const {dotenv} = require('dotenv').config();





const db = new Sequelize(
    `${process.env.DB_NAME}`,
    `${process.env.DB_USER}`,
    `${process.env.DB_PASS}`,
    {
        dialect: 'postgres',
        dialectModule: require('pg'),
        host: `${process.env.DB_HOST}`,
        dialactOptions: {
            socketPath: `${process.env.DB_HOST}`
        },
        logging : false

    }
)


//create tABLE IF NOT EXISTS
const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})

//create user
const createUser = async () => {
    await db.sync();
    const user = await User.create({
        name: 'John Doe',
        email: 'hello',
        password: '123456'
    })
    console.log(user.toJSON())
}

createUser().then(() => {
    console.log('User Created')
}
).catch((err) => {
    console.log(err)
}
)





