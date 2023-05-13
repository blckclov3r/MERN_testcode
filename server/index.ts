import express from "express"
import dotenv from 'dotenv'
import {graphqlHTTP} from "express-graphql";
import schema from "./schema/schema";
import {connectDB} from './config/db'

dotenv.config()

const PORT = process.env.PORT || 8000

connectDB()


const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
}))

app.listen(PORT, () => {
    console.log('@@Server running on port ' + PORT)
})


