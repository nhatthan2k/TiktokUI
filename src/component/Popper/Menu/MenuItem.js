import Button from '~/component/Buttons';
import Styles from './menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

function MenuItem({ data, onClick }) {
    const classes = cx('menu-item', {
        separate: data.separate,
    });

    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.tiltle}
        </Button>
    );
}

export default MenuItem;
