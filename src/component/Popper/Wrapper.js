import Styles from './Poppper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

function wrapper({ children, className }) {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default wrapper;
