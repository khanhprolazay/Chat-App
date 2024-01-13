const UserController = require('./controllers/UserController');
const MappingController = require('./controllers/MappingController');
const MessageController = require('./controllers/MessageController');
const InvitationController = require('./controllers/InvitationController');
const ConversationController = require('./controllers/ConversationController');

const socketEvents = async (io) => {
	// Whenever client connect or reconnect to socket io server
	// It's will store uid, socket_id in mapping table


	io.on('connection', async (socket) => {
		const uid = socket.handshake.query.uid;
		await MappingController.createAndSave(uid, socket.id);

		// the following 2 events is made for deleting mapping
		// Whenever user disconnect to the io server
		socket.on('disconnect', async () => {
			await MappingController.remove(uid);
		});
		socket.on('client_disconnect', async () => {
			await MappingController.remove(uid);
		});

		// Make an event for user to send invitation
		// If the receiver is online, send it
		socket.on('send_invitation', async (receiver_id) => {
			try {
				if (!receiver_id) return;
				const sender_id = uid;
				const receiver_mapping = await MappingController.findOne(receiver_id);

				// Create new invitation
				const invitation = await InvitationController.createAndSave(
					sender_id,
					receiver_id
				);

				// If the invitation is created successfully and the receiver is online
				// Send the invitation to receiver
				if (receiver_mapping && invitation) {
					io.to(receiver_mapping.socket_id).emit('receive_invitation', {
						invitation: invitation,
					});
				}
			} catch (err) {
				console.log(err);
			}
		});

		// This event is triggered when user accept invitation.
		// It will create new conversation and send it to both of them if they are online
		socket.on('accept_invitation', async ({ sender_id, receiver_id }) => {
			try {
				if (!sender_id || !receiver_id) return;

				const sender_mapping = await MappingController.findOne(sender_id);
				const conversation = await ConversationController.createAndSave({
					title: '',
					type: 'personal',
					creator_id: sender_id,
					participants: [receiver_id],
				});
				if (!conversation) return;

				// Conversation created successfully

				const sender = await UserController.getInformationById(sender_id);
				const receiver = await UserController.getInformationById(receiver_id);
				sender.is_checked = false;
				receiver.is_checked = false;
				sender.cid = conversation.cid;
				receiver.cid = conversation.cid;

				io.to(socket.id).emit('receive_conversation', {
					conversation: conversation,
					friend: sender,
				});
				if (sender_mapping) {
					io.to(sender_mapping.socket_id).emit('receive_conversation', {
						conversation: conversation,
						friend: receiver,
					});
				}
			} catch (err) {
				console.log(err);
			}
		});

		// This event will receive the new message, save it to database and send it to receiver
		// If all of action is completed, the new message will be sent to the receiver if they online
		// If message is created usucessfully, it will send the MESSAGE ERROR SIGNAL to sender
		socket.on('send_message', async (new_message) => {
			try {
				// If createing a new message failed, dont do anything
				const message = await MessageController.createAndSave(new_message);
				if (!message) return io.to(socket.id).emit('create_message_error');

				// Create successfully, update conversation lasted message
				// Send message to the receiver
				// 
				await Promise.all([
					ConversationController.updateLatestMessage(message).catch((err) =>
						console.log(err)
					),
					ConversationController.checkConversation(
						new_message.receiver_id,
						uid,
						false
					).catch((err) => console.log(err)),
				]);

				const mapping = await MappingController.findOne(
					new_message.receiver_id
				);
				if (mapping) {
					io.to(mapping.socket_id).emit('receive_message_box', message);
					io.to(mapping.socket_id).emit('receive_message_recent', message);
				}
			} catch (err) {
				console.log(err);
			}
		});

		socket.on('check_conversation', async (participant_id) => {
			await ConversationController.checkConversation(uid, participant_id, true);
		});
	});
};

module.exports = socketEvents;
