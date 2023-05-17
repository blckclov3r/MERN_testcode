import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Client = {
  __typename?: 'Client';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addClient?: Maybe<Client>;
  addProject?: Maybe<Project>;
  deleteClient?: Maybe<Client>;
  deleteProject?: Maybe<Project>;
  updateClient?: Maybe<Client>;
  updateProject?: Maybe<Project>;
};


export type MutationAddClientArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationAddProjectArgs = {
  clientId: Scalars['ID'];
  description: Scalars['String'];
  name: Scalars['String'];
  status?: InputMaybe<ProjectStatus>;
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateClientArgs = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateProjectArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ProjectStatusUpdate>;
};

export type Project = {
  __typename?: 'Project';
  client?: Maybe<Client>;
  clientId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export enum ProjectStatus {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export enum ProjectStatusUpdate {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export type RootQueryType = {
  __typename?: 'RootQueryType';
  client?: Maybe<Client>;
  clients?: Maybe<Array<Maybe<Client>>>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
};


export type RootQueryTypeClientArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProjectArgs = {
  id?: InputMaybe<Scalars['ID']>;
};

export type GetClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientsQuery = { __typename?: 'RootQueryType', clients?: Array<{ __typename?: 'Client', id?: string | null, name?: string | null, email?: string | null, phone?: string | null } | null> | null };

export type GetClientIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
}>;


export type GetClientIdQuery = { __typename?: 'RootQueryType', client?: { __typename?: 'Client', id?: string | null, name?: string | null, email?: string | null, phone?: string | null } | null };

export type AddClientMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
}>;


export type AddClientMutation = { __typename?: 'Mutation', addClient?: { __typename?: 'Client', name?: string | null, email?: string | null, phone?: string | null } | null };

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient?: { __typename?: 'Client', id?: string | null, name?: string | null, email?: string | null, phone?: string | null } | null };


export const GetClientsDocument = gql`
    query getClients {
  clients {
    id
    name
    email
    phone
  }
}
    `;

/**
 * __useGetClientsQuery__
 *
 * To run a query within a React component, call `useGetClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClientsQuery(baseOptions?: Apollo.QueryHookOptions<GetClientsQuery, GetClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, options);
      }
export function useGetClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientsQuery, GetClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, options);
        }
export type GetClientsQueryHookResult = ReturnType<typeof useGetClientsQuery>;
export type GetClientsLazyQueryHookResult = ReturnType<typeof useGetClientsLazyQuery>;
export type GetClientsQueryResult = Apollo.QueryResult<GetClientsQuery, GetClientsQueryVariables>;
export const GetClientIdDocument = gql`
    query getClientID($id: ID) {
  client(id: $id) {
    id
    name
    email
    phone
  }
}
    `;

/**
 * __useGetClientIdQuery__
 *
 * To run a query within a React component, call `useGetClientIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClientIdQuery(baseOptions?: Apollo.QueryHookOptions<GetClientIdQuery, GetClientIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientIdQuery, GetClientIdQueryVariables>(GetClientIdDocument, options);
      }
export function useGetClientIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientIdQuery, GetClientIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientIdQuery, GetClientIdQueryVariables>(GetClientIdDocument, options);
        }
export type GetClientIdQueryHookResult = ReturnType<typeof useGetClientIdQuery>;
export type GetClientIdLazyQueryHookResult = ReturnType<typeof useGetClientIdLazyQuery>;
export type GetClientIdQueryResult = Apollo.QueryResult<GetClientIdQuery, GetClientIdQueryVariables>;
export const AddClientDocument = gql`
    mutation addClient($name: String!, $email: String!, $phone: String!) {
  addClient(name: $name, email: $email, phone: $phone) {
    name
    email
    phone
  }
}
    `;
export type AddClientMutationFn = Apollo.MutationFunction<AddClientMutation, AddClientMutationVariables>;

/**
 * __useAddClientMutation__
 *
 * To run a mutation, you first call `useAddClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addClientMutation, { data, loading, error }] = useAddClientMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useAddClientMutation(baseOptions?: Apollo.MutationHookOptions<AddClientMutation, AddClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddClientMutation, AddClientMutationVariables>(AddClientDocument, options);
      }
export type AddClientMutationHookResult = ReturnType<typeof useAddClientMutation>;
export type AddClientMutationResult = Apollo.MutationResult<AddClientMutation>;
export type AddClientMutationOptions = Apollo.BaseMutationOptions<AddClientMutation, AddClientMutationVariables>;
export const DeleteClientDocument = gql`
    mutation deleteClient($id: ID!) {
  deleteClient(id: $id) {
    id
    name
    email
    phone
  }
}
    `;
export type DeleteClientMutationFn = Apollo.MutationFunction<DeleteClientMutation, DeleteClientMutationVariables>;

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClientMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClientMutation, DeleteClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClientMutation, DeleteClientMutationVariables>(DeleteClientDocument, options);
      }
export type DeleteClientMutationHookResult = ReturnType<typeof useDeleteClientMutation>;
export type DeleteClientMutationResult = Apollo.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<DeleteClientMutation, DeleteClientMutationVariables>;