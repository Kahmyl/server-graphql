import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema.js'

const app = express()
const port = 3001

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true 
}));

app.listen(port, () => console.log(` app listening on port ${port}!`))