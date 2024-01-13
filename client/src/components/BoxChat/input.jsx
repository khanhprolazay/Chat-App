import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFaceSmile,
	faMicrophone,
	faPaperclip,
	faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import { v1 as uuidv1 } from 'uuid';
import { useState } from 'react';

// function readImageAsBuffer(file) {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.onloadend = () => {
// 			const buffer = Buffer.from(reader.result);
// 			resolve(buffer);
// 		};
// 		reader.onerror = reject;
// 		reader.readAsArrayBuffer(file);
// 	});
// }

function Input({
	socket,
	uid,
	friend_id,
	conversation_id,
	messages,
	setMessages,
}) {
	const [images, setImages] = useState(null);
	const [message, setMessage] = useState('');

	const logImage = (e) => {
		if (e.target.files.length !== 0) {
			setImages(e.target.files[0]);
		}
	};

	const onMessageChange = (e) => {
		e.preventDefault();
		setMessage(e.target.value);
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		if (message === '') return;

		const date = new Date(Date.now());
		const string_date = date.toISOString();
		const new_message = {
			mid: uuidv1(),
			sender_id: uid,
			content: message,
			receiver_id: friend_id,
			created_at: string_date,
			conversation_id: conversation_id,
			image: !images ? null : {
				iid: uuidv1(),
				link: '',
				data: images,
			},
		};
		socket.emit('send_message', new_message);
		delete new_message.receiver_id;
		setMessages([...messages, new_message]);
		setMessage('');
		setImages(null);
	};

	const onKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) sendMessage(e);
	};

	return (
		<div className='mainpage-boxchat-input'>
			<div>
				<TextareaAutosize
					placeholder='Type something...'
					value={message}
					onChange={(e) => onMessageChange(e)}
					onKeyDown={(e) => onKeyDown(e)}
				/>
				{function () {
					if (images)
						return (
							<div>
								<div>
									<img
										src={URL.createObjectURL(images)}
										alt=''
									/>
									<div onClick={(e) => setImages(null)}>X</div>
								</div>
							</div>
						);
				}.call(this)}
			</div>
			<div>
				<div>
					<div>
						<FontAwesomeIcon icon={faFaceSmile} />
					</div>
					<div>
						<FontAwesomeIcon icon={faMicrophone} />
					</div>
					<div>
						<label htmlFor='boxchat-fileinput'>
							<FontAwesomeIcon icon={faPaperclip} />
						</label>
						<input
							id='boxchat-fileinput'
							type='file'
							name='myImage'
							accept='image/png'
							onChange={(e) => logImage(e)}
							onClick={(e) => e.target.value = null}
						/>
					</div>
				</div>
				<div>
					<div onClick={(e) => sendMessage(e)}>
						<FontAwesomeIcon icon={faPaperPlane} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Input;
