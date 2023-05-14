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
    `
    return {
        GET_CLIENTS
    }
}

export default clients