import {gql} from "@apollo/client";

const projects = () => {
    const GET_PROJECTS = gql`
    query getProjects {
      projects {
        id
        name
        description
        status
      }
    }
  `;

    const GET_PROJECTID = gql`
    query getProjectID($id: ID) {
      project(id: $id) {
        id
        name
        description
        status
        clientId
      }
    }
  `;

    const ADD_PROJECT = gql`
    mutation addProject(
      $clientId: ID!
      $name: String!
      $description: String!
      $status: ProjectStatus
    ) {
      addProject(
        clientId: $clientId
        name: $name
        description: $description
        status: $status
      ) {
        id
        name
        description
        status
      }
    }
  `;

    const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
      deleteProject(id: $id) {
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

    const UPDATE_PROJECT = gql`
    mutation updateProject(
      $id: ID!
      $name: String
      $description: String
      $status: ProjectStatusUpdate
      $clientId: String
    ) {
      updateProject(
        id: $id
        name: $name
        description: $description
        status: $status
        clientId: $clientId
      ) {
        id
        name
        description
        status
        clientId
      }
    }
  `;

    return {
        GET_PROJECTS,
        GET_PROJECTID,
        ADD_PROJECT,
        DELETE_PROJECT,
        UPDATE_PROJECT,
    };
};
export default projects;
