import { createConnection, ConnectionOptions } from 'mysql2';

const getConnection = async (options: ConnectionOptions) => await createConnection(options).promise();

export default getConnection;
