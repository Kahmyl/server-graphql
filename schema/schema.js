import graphql from 'graphql'
import _ from 'lodash'

const { GraphQLObjectType , GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql

var books = [
    {name: 'Name of the Wind', genre: 'fantasy', id: '1', authorId: '1'},
    {name: 'The Final Empire', genre: 'fantasy', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
];

var authors = [
    {name: 'Patrick Rothfuss', age: '44', id: '1'},
    {name: 'Brandon Sanderson', age: '42', id: '2'},
    {name: 'Terry Prachett', age: '66', id: '3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AutherType,
            resolve()
        }
    })
});

const AutherType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args:{id: { type: GraphQLID}},
            resolve(parent, args){
               return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AutherType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors,{id: args.id})
            }
        }
    }
});

 const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema



