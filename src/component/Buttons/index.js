import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Styles from './button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Button({
    to,
    href,
    children,
    primary,
    outline,
    text,
    rounded,
    leftIcon,
    rightIcon,
    className,
    disable,
    onClick,
    small,
    ...passProp
}) {
    let Comp = 'button';

    const classes = cx('wrapper', {
        primary,
        outline,
        text,
        rounded,
        [className]: className,
        disable,
        small,
    });

    const props = {
        onClick,
        ...passProp,
    };

    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('tiltle')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    rounded: PropTypes.bool,
    disable: PropTypes.bool,
    small: PropTypes.bool,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default Button;
