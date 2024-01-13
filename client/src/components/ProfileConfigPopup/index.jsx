import 'css/ProfileConfigPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CurrentSlice } from 'slices/CurrentSlice'; 

const data = {
	display_name: 'Lê Minh',
	avatar:
		'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/263498346_3200541133554779_8238027386307341084_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ZFcGu80o_f8AX_ETxwl&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfDhnHpxX1_C_RWndx0XLCgUTt6rQON1uOKk0SXeojNRiw&oe=64328F25',
	avatar_change: null,
	phone: '08888888',
	password: '123456789',
};

function ProfileConfigPopup(props) {
	const dispatch = useDispatch();
	const [user, setUser] = useState(data);

	const setTab = (tab) => {
		dispatch(CurrentSlice.actions.setTab(tab));
	}

	const close = (e) => {
		if (e.target.id === 'profile-container')
			setTab(0);
	};

	const onImageChange = (e) => {
		if (e.target.files.length !== 0) {
			setUser({ ...user, avatar_change: e.target.files[0] });
		}
	};

	return (
		<div
			className='popup-container'
			id='profile-container'
			onClick={(e) => close(e)}>
			<div className='profileconfig-form'>
				<div>
					<div></div>
					<h3>Chỉnh sửa</h3>
					<FontAwesomeIcon
						onClick={() => setTab(0)}
						icon={faXmark}
					/>
				</div>
				<div>
					<h4>Tài khoản</h4>
					<div>
						<div>
							<label htmlFor='profileconfig-fileinput'>
								{user.avatar_change ? (
									<img
										src={URL.createObjectURL(user.avatar_change)}
										alt=''
									/>
								) : (
									<img
										src={user.avatar}
										alt=''
									/>
								)}
							</label>
							<input
								id='profileconfig-fileinput'
								type='file'
								accept='image/*'
								onChange={(e) => onImageChange(e)}
							/>
						</div>
						<input
							type='text'
							value={user.display_name}
						/>
					</div>
				</div>
				<div>
					<div>
						<h4>Số điện thoại: </h4>
						<input
							type='text'
							value={user.phone}
						/>
					</div>
					<div>
						<h4>Mật khẩu: </h4>
						<input
							type='password'
							value={user.password}
						/>
					</div>
					<div>
						<h4>Nhập lại mật khẩu: </h4>
						<input
							type='password'
							value={user.password}
						/>
					</div>
				</div>
				<div>
					<button onClick={() => setTab(0)}>
						Hủy
					</button>
					<button>Xác nhận</button>
				</div>
			</div>
		</div>
	);
}

export default ProfileConfigPopup;
