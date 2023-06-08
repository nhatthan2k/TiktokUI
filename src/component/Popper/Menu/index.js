import Styles from './menu.module.scss';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { wrapper as PopperWrapper } from '~/component/Popper';
import MenuItem from './MenuItem';
import Header from './header';
import { useState } from 'react';

const cx = classNames.bind(Styles);

const defaultFn = () => {};

function Menu({ children, Items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: Items }]);
    const current = history[history.length - 1];

    const RenderItems = () => {
        return current.data.map((item, index) => {
            const isparent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isparent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            interactive
            hideOnClick={false}
            delay={[0, 700]}
            offset={[12, 8]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                tiltle="Language"
                                onback={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1));
                                }}
                            />
                        )}
                        <div className={cx('menu-body')}>{RenderItems()}</div>
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
