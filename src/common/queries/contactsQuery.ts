import { QueriesOptions, UseQueryOptions } from '@tanstack/react-query';
import {agent} from '../../../APIClient.tsx';

export const contactsQuery = {
  queryKey: ['contactsQuery'],
  queryFn: async () => {
    const res = await agent.getContacts();
    return res.data;
  },
};
