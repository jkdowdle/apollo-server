// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Query {
    getUsers(payed: Boolean): [User]
    getTodos: [Todo]
  }

  type User {
    _id: ID!
    todos: [Todo]
    name: String
    address: String
    payed: Boolean
  }

  type Todo {
    _id: ID!
    item: String
    completed: Boolean
    user: User
  }

`

const todos = [
  { _id: 'abee', item: 'Go to store', completed: false, userId: 'abc' },
  { _id: 'dddf', item: 'Go to store', completed: false, userId: 'abc' },
  { _id: 'fffe', item: 'Go to store', completed: false, userId: 'xyz' },
  { _id: 'abed', item: 'Go to store', completed: false, userId: 'xyz' },
]

const users = [
  { _id: 'abc', name: 'Josh', address: 'here', payed: false },
  { _id: 'xyz', name: 'Mark', address: 'There', payed: true }
]

const resolvers = {
  Query: {
    getUsers: function(_, args, context) {

      if (args.payed) {
        return users.filter((user) => user.payed === args.payed)
      }

      users.map((user) => {
        user.todos = todos.filter((todo) => user._id === todo.userId)
        return user
      })

      return users;
    },
    getTodos: function() {
      return todos.map((todo) => {
        todo.user = users.find((user) => user._id === todo.userId)
      })
      // return todos;
    } 
  }
}

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})