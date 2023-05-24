import {
    GraphQLEnumType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql/type';

import Project from '../models/Project';
import Client from '../models/Client';
import client from '../models/Client';

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        clientId: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            },
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            },
        },
    },
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                return client.save();
            },
        },
        updateClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Client.findByIdAndUpdate(
                    args.id,
                    {
                        name: args.name,
                        email: args.email,
                        phone: args.phone,
                        updatedAt: new Date(),
                    },
                    { new: true }, // Return the updated client
                );
            },
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return client.findByIdAndDelete(args.id);
            },
        },
        //add project
        addProject: {
            type: ProjectType,
            args: {
                clientId: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                return project.save();
            },
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Project.findByIdAndDelete(args.id);
            },
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                clientId: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                        clientId: args.clientId,
                        updatedAt: new Date(),
                    },
                    { new: true },
                );
            },
        },
    },
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation,
});

export default schema;
