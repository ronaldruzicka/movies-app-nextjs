import type { CreateClientConfig } from './generated/client.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
  pathParams: {
    account_object_id:
      typeof window === 'undefined'
        ? process.env.ACCOUNT_OBJECT_ID
        : process.env.NEXT_PUBLIC_ACCOUNT_OBJECT_ID,
  },
});
