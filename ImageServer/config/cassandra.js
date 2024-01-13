const cassandra = require('cassandra-driver');

const ip_1 = process.env.SERVER_1_IP;
const ip_2 = process.env.SERVER_2_IP;
const ip_3 = process.env.CASSANDRA_HOST;

const client = new cassandra.Client({
	contactPoints: [ip_1],
	localDataCenter: 'dc1',
	keyspace: 'system',
	authProvider: new cassandra.auth.PlainTextAuthProvider(
		process.env.CASSANDRA_USERNAME,
		process.env.CASSANDRA_PASSWORD
	),
});

module.exports = client;
