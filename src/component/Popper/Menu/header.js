import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './menu.module.scss';
import classNames from 'classnames/bind';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Header({ tiltle, onback }) {
    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onback}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h3 className={cx('header-tiltle')}>{tiltle}</h3>
        </header>
    );
}

Header.propTypes = {
    tiltle: PropTypes.string,
    onback: PropTypes.func,
};

export default Header;
