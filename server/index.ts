import express from "express"
import dotenv from 'dotenv'
import {graphqlHTTP} from "express-graphql";

import schema from "./schema/schema";

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
}))

app.listen(PORT, () => {
    console.log('@@Server running on port ' + PORT)
})


