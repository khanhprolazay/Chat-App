import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <div>
				<h2>Recent Messages</h2>
				<FontAwesomeIcon icon={faAngleDown} />
			</div>
  )
}

export default Header;