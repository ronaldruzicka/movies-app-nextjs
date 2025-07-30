import { type CreateClientConfig } from './generated/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});
