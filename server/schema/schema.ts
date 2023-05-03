import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql/type";
import {clients, projects} from "../sampleData";

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
})

const ProjectType = new GraphQLObjectType(({
    name: 'Project',
    fields: () => ({
        id: {type: GraphQLID},
        clientId: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent, args){
                return clients.find(client=>client.id === parent.id)
            }
        }
    })
}))

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return projects
            }
        },
        project: {
            type: ProjectType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return projects.find(project => project.id === args.id);
            }
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return clients
            }
        },
        client: {
            type: ClientType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return clients.find(client => client.id === args.id);
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery
});

export default schema;