const FactoryDao = require("../DAOS/FactoryDao")

class apiUsers {

    constructor() {
        this.dao = FactoryDao.getDao()
    }

    getUser = async ({email}) => {
        console.log(email)
        const user = await this.dao.getUser(email)
        return user
    }

    createUser = async ({data}) => {
        console.log(data)
        const newUser = await this.dao.newUser(data.email, data.password)
        return newUser
    }

}

module.exports = apiUsers