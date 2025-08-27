import type { CreateClientConfig } from './generated/client.gen';

export const createClientConfig: CreateClientConfig = (config) => {
  return {
    ...config,
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    },
  };
};
