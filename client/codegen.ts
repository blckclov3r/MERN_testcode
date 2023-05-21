import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: [
        {
            'http://localhost:8000/graphql': {
                headers: {
                    'x-hasura-admin-secret': '',
                },
            },
        },
    ],
    overwrite: true,
    ignoreNoDocuments: true,
    generates: {
        './src/generated/graphql.ts': {
            documents: [
                'src/**/*.tsx',
                './src/queries/*.ts',
            ],
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
}

export default config