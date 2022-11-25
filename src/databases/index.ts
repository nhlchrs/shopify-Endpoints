import { DB_DATABASE, DB_HOST, DB_PORT } from '@config';

export const dbConnection = {
  url: `mongodb+srv://${DB_HOST}/${DB_DATABASE}`,
  options: {

  },
};
