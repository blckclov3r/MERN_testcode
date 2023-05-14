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
    }
}

export default clients