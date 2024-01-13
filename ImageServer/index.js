require('dotenv').config();
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');
const express = require('express');
const queries = require('./queries');
const cassandraClient = require('./config/cassandra');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

const ImageRouter = require('./routes/image.routes.js');
app.use('/image', ImageRouter);

// const server = http.createServer(app);

cassandraClient
	.connect()
	.then(async () => {
		await Promise.all(queries.createKeyspaces.map(query => cassandraClient.execute(query)));
		await Promise.all(queries.createChatTables.map(query => cassandraClient.execute(query)));
		await Promise.all(queries.createChatTableIndexes.map(query => cassandraClient.execute(query)));
	})
	.then(() => {
			app.listen(5003, () => {
				console.log('Image server is running on port 5003');
			});
	})
	.catch((err) => console.log(err));
