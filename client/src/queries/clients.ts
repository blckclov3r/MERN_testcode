import {gql} from "@apollo/client";

const clients = () => {
    const GET_CLIENTS = gql`
        query getClients{
          clients{
            id
            name
            email
            phone
          }
        }
    `;

    const GET_CLIENTID = gql`
        query getClientID($id: ID){
            client(id: $id){
                id
                name
                email
                phone
          }
        }
    `;

    const ADD_CLIENT = gql`
        mutation addClient($name: String!, $email: String!, $phone: String!){
          addClient(name: $name, email: $email, phone: $phone){
            name
            email
            phone
          }
        }
    `;

    const DELETE_CLIENT = gql`
        mutation deleteClient($id: ID!){
            deleteClient(id: $id){
                id
                name
                email
                phone
            }
        }
    `;


    return {
        GET_CLIENTS,
        DELETE_CLIENT,
        ADD_CLIENT,
        GET_CLIENTID
    }
}

export default clients