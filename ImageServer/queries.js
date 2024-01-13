const createKeyspaces = [
	`CREATE KEYSPACE IF NOT EXISTS service_3 WITH REPLICATION = {'class': 'SimpleStrategy','replication_factor' : 2}`,
];

const createChatTables = [
	// Create message table
	`CREATE TABLE IF NOT EXISTS service_3.images (
	iid uuid,
	data blob,
	link text,
    PRIMARY KEY (iid)
  )`,

];

const createChatTableIndexes = [
];


module.exports = {
	createKeyspaces,
	createChatTables,
	createChatTableIndexes,
};
