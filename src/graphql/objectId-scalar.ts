import { GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  serialize(value) {
    if (value instanceof ObjectId) {
      return value.toString()
    }
    throw new Error('ObjectId Scalar serializer expected an `ObjectId` object')
  },
  parseValue(value) {
    if (typeof value === 'string') {
      return new ObjectId(value)
    }
    throw new Error('ObjectId Scalar parser expected a `string`')
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value)
    }
    return null
  },
})
