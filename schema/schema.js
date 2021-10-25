import graphql from 'graphql'
import _ from 'lodash'

const { GraphQLObjectType , GraphQLString, GraphQLSchema} = graphql

var books = [
    {name: 'Name of the Wind', genre: 'fantasy', id: '1'},
    {name: 'The Final Empire', genre: 'fantasy', id: '2'},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3'},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args:{id: { type: GraphQLString}},
            resolve(parent, args){
               return _.find(books, {id: args.id});
            }
        }
    }
});

 const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema



