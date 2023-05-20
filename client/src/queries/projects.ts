import {gql} from "@apollo/client";

const projects = () =>{
    const GET_PROJECTS = gql`
        query getProjects{
            projects{
                id
                name
                description
                status
            }
        }
    `;

    const GET_PROJECTID = gql`
        query getProjectID($id: ID){
            project(id: $id){
                id
                name
                description
                status
            }
        }
    `;

    const ADD_PROJECT = gql`
        mutation addProject($clientId: ID!, $name: String!, $description: String!, $status: ProjectStatus){
            addProject(clientId: $clientId, name: $name, description: $description, status: $status){
                id
                name
                description
                status
            }
        }
    `;

    const DELETE_PROJECT = gql`
        mutation deleteProject($id: ID!){
            deleteProject(id: $id){
                id
                name
                description
                status
                client {
                  id
                }
            }
        }
    `;

    return {
        GET_PROJECTS,
        GET_PROJECTID,
        ADD_PROJECT,
        DELETE_PROJECT
    }
}