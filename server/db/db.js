const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/companies', { logging: false })
const faker = require('faker')

const { STRING } = Sequelize

const Company = db.define('company', {
    name: {
        type: STRING,
        allowNull: false
    }
})


const syncSeed = async() => {
    await db.sync({ force : true })
    console.log('Data based Synced!')

    for(let i = 0; i < 5; i++){
        await Company.create({name: faker.company.companyName()})
    }
}

module.exports = {
    syncSeed,
    Company,
    db
}