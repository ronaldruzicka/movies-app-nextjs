import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: {
    path: 'src/lib/api-client/schema.json',
  },
  output: {
    format: 'prettier',
    lint: 'eslint',
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
      // Some properties are wrongly typed in the schema
      // e.g. "backdrop_path" is an optional string, but comes also as "null"
      // validator: 'valibot',
      client: '@hey-api/client-next',
    },
    // Some properties are wrongly typed in the schema
    // e.g. "backdrop_path" is an optional string, but comes also as "null"
    // 'valibot',
  ],
});
