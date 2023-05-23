import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  __typename?: "Client";
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addClient?: Maybe<Client>;
  addProject?: Maybe<Project>;
  deleteClient?: Maybe<Client>;
  deleteProject?: Maybe<Project>;
  updateClient?: Maybe<Client>;
  updateProject?: Maybe<Project>;
};

export type MutationAddClientArgs = {
  email: Scalars["String"];
  name: Scalars["String"];
  phone: Scalars["String"];
};

export type MutationAddProjectArgs = {
  clientId: Scalars["ID"];
  description: Scalars["String"];
  name: Scalars["String"];
  status?: InputMaybe<ProjectStatus>;
};

export type MutationDeleteClientArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteProjectArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateClientArgs = {
  email?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateProjectArgs = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<ProjectStatusUpdate>;
};

export type Project = {
  __typename?: "Project";
  client?: Maybe<Client>;
  clientId?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
};

export enum ProjectStatus {
  Completed = "completed",
  New = "new",
  Progress = "progress",
}

export enum ProjectStatusUpdate {
  Completed = "completed",
  New = "new",
  Progress = "progress",
}

export type RootQueryType = {
  __typename?: "RootQueryType";
  client?: Maybe<Client>;
  clients?: Maybe<Array<Maybe<Client>>>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
};

export type RootQueryTypeClientArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type RootQueryTypeProjectArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type GetClientsQueryVariables = Exact<{ [key: string]: never }>;

export type GetClientsQuery = {
  __typename?: "RootQueryType";
  clients?: Array<{
    __typename?: "Client";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null> | null;
};

export type GetClientIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type GetClientIdQuery = {
  __typename?: "RootQueryType";
  client?: {
    __typename?: "Client";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null;
};

export type AddClientMutationVariables = Exact<{
  name: Scalars["String"];
  email: Scalars["String"];
  phone: Scalars["String"];
}>;

export type AddClientMutation = {
  __typename?: "Mutation";
  addClient?: {
    __typename?: "Client";
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null;
};

export type UpdateClientMutationVariables = Exact<{
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateClientMutation = {
  __typename?: "Mutation";
  updateClient?: {
    __typename?: "Client";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null;
};

export type DeleteClientMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteClientMutation = {
  __typename?: "Mutation";
  deleteClient?: {
    __typename?: "Client";
    id?: string | null;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null;
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProjectsQuery = {
  __typename?: "RootQueryType";
  projects?: Array<{
    __typename?: "Project";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    status?: string | null;
  } | null> | null;
};

export type GetProjectIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars["ID"]>;
}>;

export type GetProjectIdQuery = {
  __typename?: "RootQueryType";
  project?: {
    __typename?: "Project";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    status?: string | null;
    clientId?: string | null;
  } | null;
};

export type AddProjectMutationVariables = Exact<{
  clientId: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  status?: InputMaybe<ProjectStatus>;
}>;

export type AddProjectMutation = {
  __typename?: "Mutation";
  addProject?: {
    __typename?: "Project";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    status?: string | null;
  } | null;
};

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteProjectMutation = {
  __typename?: "Mutation";
  deleteProject?: {
    __typename?: "Project";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    status?: string | null;
    client?: { __typename?: "Client"; id?: string | null } | null;
  } | null;
};

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<ProjectStatusUpdate>;
}>;

export type UpdateProjectMutation = {
  __typename?: "Mutation";
  updateProject?: {
    __typename?: "Project";
    id?: string | null;
    name?: string | null;
    description?: string | null;
    status?: string | null;
  } | null;
};

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
export function useGetClientsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetClientsQuery,
    GetClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetClientsQuery, GetClientsQueryVariables>(
    GetClientsDocument,
    options
  );
}
export function useGetClientsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetClientsQuery,
    GetClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetClientsQuery, GetClientsQueryVariables>(
    GetClientsDocument,
    options
  );
}
export type GetClientsQueryHookResult = ReturnType<typeof useGetClientsQuery>;
export type GetClientsLazyQueryHookResult = ReturnType<
  typeof useGetClientsLazyQuery
>;
export type GetClientsQueryResult = Apollo.QueryResult<
  GetClientsQuery,
  GetClientsQueryVariables
>;
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
export function useGetClientIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetClientIdQuery,
    GetClientIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetClientIdQuery, GetClientIdQueryVariables>(
    GetClientIdDocument,
    options
  );
}
export function useGetClientIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetClientIdQuery,
    GetClientIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetClientIdQuery, GetClientIdQueryVariables>(
    GetClientIdDocument,
    options
  );
}
export type GetClientIdQueryHookResult = ReturnType<typeof useGetClientIdQuery>;
export type GetClientIdLazyQueryHookResult = ReturnType<
  typeof useGetClientIdLazyQuery
>;
export type GetClientIdQueryResult = Apollo.QueryResult<
  GetClientIdQuery,
  GetClientIdQueryVariables
>;
export const AddClientDocument = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      name
      email
      phone
    }
  }
`;
export type AddClientMutationFn = Apollo.MutationFunction<
  AddClientMutation,
  AddClientMutationVariables
>;

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
export function useAddClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddClientMutation,
    AddClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddClientMutation, AddClientMutationVariables>(
    AddClientDocument,
    options
  );
}
export type AddClientMutationHookResult = ReturnType<
  typeof useAddClientMutation
>;
export type AddClientMutationResult = Apollo.MutationResult<AddClientMutation>;
export type AddClientMutationOptions = Apollo.BaseMutationOptions<
  AddClientMutation,
  AddClientMutationVariables
>;
export const UpdateClientDocument = gql`
  mutation updateClient(
    $id: ID!
    $name: String
    $email: String
    $phone: String
  ) {
    updateClient(id: $id, name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;
export type UpdateClientMutationFn = Apollo.MutationFunction<
  UpdateClientMutation,
  UpdateClientMutationVariables
>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClientMutation,
    UpdateClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateClientMutation,
    UpdateClientMutationVariables
  >(UpdateClientDocument, options);
}
export type UpdateClientMutationHookResult = ReturnType<
  typeof useUpdateClientMutation
>;
export type UpdateClientMutationResult =
  Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<
  UpdateClientMutation,
  UpdateClientMutationVariables
>;
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
export type DeleteClientMutationFn = Apollo.MutationFunction<
  DeleteClientMutation,
  DeleteClientMutationVariables
>;

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
export function useDeleteClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteClientMutation,
    DeleteClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteClientMutation,
    DeleteClientMutationVariables
  >(DeleteClientDocument, options);
}
export type DeleteClientMutationHookResult = ReturnType<
  typeof useDeleteClientMutation
>;
export type DeleteClientMutationResult =
  Apollo.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<
  DeleteClientMutation,
  DeleteClientMutationVariables
>;
export const GetProjectsDocument = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
    }
  }
`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(
    GetProjectsDocument,
    options
  );
}
export function useGetProjectsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProjectsQuery,
    GetProjectsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(
    GetProjectsDocument,
    options
  );
}
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<
  typeof useGetProjectsLazyQuery
>;
export type GetProjectsQueryResult = Apollo.QueryResult<
  GetProjectsQuery,
  GetProjectsQueryVariables
>;
export const GetProjectIdDocument = gql`
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

/**
 * __useGetProjectIdQuery__
 *
 * To run a query within a React component, call `useGetProjectIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetProjectIdQuery,
    GetProjectIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProjectIdQuery, GetProjectIdQueryVariables>(
    GetProjectIdDocument,
    options
  );
}
export function useGetProjectIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProjectIdQuery,
    GetProjectIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProjectIdQuery, GetProjectIdQueryVariables>(
    GetProjectIdDocument,
    options
  );
}
export type GetProjectIdQueryHookResult = ReturnType<
  typeof useGetProjectIdQuery
>;
export type GetProjectIdLazyQueryHookResult = ReturnType<
  typeof useGetProjectIdLazyQuery
>;
export type GetProjectIdQueryResult = Apollo.QueryResult<
  GetProjectIdQuery,
  GetProjectIdQueryVariables
>;
export const AddProjectDocument = gql`
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
export type AddProjectMutationFn = Apollo.MutationFunction<
  AddProjectMutation,
  AddProjectMutationVariables
>;

/**
 * __useAddProjectMutation__
 *
 * To run a mutation, you first call `useAddProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectMutation, { data, loading, error }] = useAddProjectMutation({
 *   variables: {
 *      clientId: // value for 'clientId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useAddProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddProjectMutation,
    AddProjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddProjectMutation, AddProjectMutationVariables>(
    AddProjectDocument,
    options
  );
}
export type AddProjectMutationHookResult = ReturnType<
  typeof useAddProjectMutation
>;
export type AddProjectMutationResult =
  Apollo.MutationResult<AddProjectMutation>;
export type AddProjectMutationOptions = Apollo.BaseMutationOptions<
  AddProjectMutation,
  AddProjectMutationVariables
>;
export const DeleteProjectDocument = gql`
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
export type DeleteProjectMutationFn = Apollo.MutationFunction<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProjectMutation,
    DeleteProjectMutationVariables
  >(DeleteProjectDocument, options);
}
export type DeleteProjectMutationHookResult = ReturnType<
  typeof useDeleteProjectMutation
>;
export type DeleteProjectMutationResult =
  Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
>;
export const UpdateProjectDocument = gql`
  mutation updateProject(
    $id: ID!
    $name: String
    $description: String
    $status: ProjectStatusUpdate
  ) {
    updateProject(
      id: $id
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
export type UpdateProjectMutationFn = Apollo.MutationFunction<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateProjectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UpdateProjectDocument, options);
}
export type UpdateProjectMutationHookResult = ReturnType<
  typeof useUpdateProjectMutation
>;
export type UpdateProjectMutationResult =
  Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>;
