import * as dotenv from 'dotenv'
dotenv.config()

import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://root:example@localhost:27017')

let connection = await client.connect()

export let db = connection.db('test')
