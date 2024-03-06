import type { CodegenConfig } from '@graphql-codegen/cli'

const config = {
  schema: './src/graphql/schema.graphql',
  generates: {
    './src/@types/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../graphql/context#DataSourceContext',
      },
    },
  },
} satisfies CodegenConfig

export default config
