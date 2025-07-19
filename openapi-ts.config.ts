import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: {
    path: 'src/lib/api-client/schema.json',
  },
  output: {
    format: 'prettier',
    lint: 'oxlint',
    path: 'src/lib/api-client/generated',
  },
  parser: {
    transforms: {
      enums: 'root',
    },
  },
  plugins: [
    {
      name: '@hey-api/client-next',
      runtimeConfigPath: './src/lib/api-client/custom-client.ts',
    },
    {
      enums: 'javascript',
      case: 'PascalCase',
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      validator: 'valibot',
      client: '@hey-api/client-next',
    },
    'valibot',
  ],
});
