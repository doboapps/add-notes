'use strict'

require('dotenv').config()

const { mongoose, models: { User, Note } } = require('.')
const expect = require('expect')

const { env: { DB_URL } } = process

describe('models (notes)', () => {
    before(() => mongoose.connect(DB_URL))

    beforeEach(() => Promise.all([User.remove(), Note.deleteMany()]))

    describe('create user', () => {
        it('should succeed', () => {
            const note = new Note({ text: 'my note' })

            const user = new User({ name: 'John', surname: 'Doe', email: 'johndoe@mail.com', password: '123' })

            user.notes.push(note)

            return user.save()
                .then(user => {
                    expect(user).toBeDefined()
                    expect(user.name).toBe('John')
                    expect(user.surname).toBe('Doe')
                    expect(user.email).toBe('johndoe@mail.com')
                    expect(user.password).toBe('123')
                })
        })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})
