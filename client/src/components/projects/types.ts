export interface IProject {
    id: string;
    name?: string;
    description?: string;
    status?: string;
    clientId: string;
}

export interface IClients {
    __typename: string;
    id: string;
    name: string;
    email: string;
    phone: string;
}

export type SelectOption = {
    id: number;
    value: string;
    label: string;
};
