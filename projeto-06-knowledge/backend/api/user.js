const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        if (req.params.id) user.id = req.params.id
        
        if (!req.originalUrl.startsWith('/users')) user.admin = false
        if (!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, 'Nome nao informado')
            existsOrError(user.email, 'E-mail nao informado')
            existsOrError(user.password, 'Senha nao informada')
            existsOrError(user.confirmPassword, 'Confirmacao de senha invalida.')
            equalsOrError(user.password, user.confirmPassword, 'Senhas nao confere')

            const userFromDb = await app.db('users')
                .where({ email: user.email}).first()
            
            if (!user.id) {
                notExistsOrError(userFromDb, 'Usuario ja cadastrado')
            }

        } catch(msg) {
            console.log(msg)
            return res.status(400).send(msg)
        }
        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            app.db('users').update(user).where({ id: user.id })
                .whereNull('deletedAt')
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users').insert(user)
                .then(() => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        const query = app.db('users')
            .select('id', 'name', 'email', 'admin')
            

        if (req.params.id) {
            query.where({ id: req.params.id}).first()
        } else {
            query.whereNull('deletedAt')
        }
        query.then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const id = req.params.id
        try {
            const articles = await app.db('articles')
                .where({ userId: id })
            notExistsOrError(articles, 'Usuario possui artigos')

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({id: id})
            existsOrError(rowsUpdated, 'Usuario nao foi encontrado')
            res.status(204).send()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    return {save, get, remove}
}