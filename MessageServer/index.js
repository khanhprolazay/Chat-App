require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const cassandraClient = require('./config/cassandra');
const queries = require('./queries');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const MessageRouter = require('./routes/message.routes.js');
app.use('/message', MessageRouter);

const server = http.createServer(app);

cassandraClient
	.connect()
	.then(async () => {
		await Promise.all(queries.createKeyspaces.map(query => cassandraClient.execute(query)));
		await Promise.all(queries.createChatTables.map(query => cassandraClient.execute(query)));
		await Promise.all(queries.createChatTableIndexes.map(query => cassandraClient.execute(query)));
	})
	.then(() => {
			server.listen(5002, () => {
				console.log('Message server is running on port 5002');
			});
	})
	.catch((err) => console.log(err));
