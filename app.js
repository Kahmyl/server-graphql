import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema.js'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()
const port = 3001

app.use(cors())

mongoose.connect('mongodb+srv://kamil:habib@kamil.x0n2s.mongodb.net/graphqldb?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true 
}));

app.listen(port, () => console.log(` app listening on port ${port}!`))