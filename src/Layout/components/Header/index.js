import classNames from 'classnames/bind';
import Styles from './Header.module.scss';
import image from '~/assets';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faKeyboard, faMoon } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowRightFromBracket,
    faEllipsisVertical,
    faGear,
    faLanguage,
    faMessage,
    faPaperPlane,
    faPlus,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import routesConfig from '~/config/routes';
import { Link } from 'react-router-dom';
import Button from '~/component/Buttons';
import Menu from '~/component/Popper/Menu';
import Image from '~/component/Image';
import Search from '../Search';

const cx = classNames.bind(Styles);

const MENU_ITEM = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        tiltle: 'English',
        children: {
            tiltle: 'language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    tiltle: 'English',
                },
                {
                    type: 'language',
                    code: 'vn',
                    tiltle: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        tiltle: 'Feedback and held',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        tiltle: 'Keyboard shortcuts',
    },
    {
        icon: <FontAwesomeIcon icon={faMoon} />,
        tiltle: 'Dark mode',
    },
];

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        tiltle: 'View Profile',
        to: '/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faTiktok} />,
        tiltle: 'Get Coins ',
        to: '/getcoins',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        tiltle: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEM,
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        tiltle: 'Log out',
        separate: true,
        to: '/logout',
    },
];

const handleMenuChange = (menuItem) => {
    console.log(menuItem);
};

function Header() {
    const currentUser = true;

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routesConfig.home} className={cx('logo')}>
                    <img src={image.logo} alt="Tiktok"></img>
                </Link>

                <Search />

                <div className={cx('action')}>
                    <Button text className={cx('action-btn')} leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Upload
                    </Button>
                    {currentUser ? (
                        <>
                            <Tippy content="Messages" placement="bottom">
                                <button>
                                    <FontAwesomeIcon className={cx('user-icon')} icon={faPaperPlane} />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom">
                                <button>
                                    <FontAwesomeIcon className={cx('user-icon')} icon={faMessage} />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <Button primary>Log in</Button>
                        </>
                    )}

                    <Menu Items={currentUser ? userMenu : MENU_ITEM} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1683450000&x-signature=zPD%2B%2FB2VKcGTg2mgN7ECxwrZmNU%3D"
                                className={cx('user-avata')}
                                alt="Thân Lê Quang Nhật"
                                // errorImage="https://th.bing.com/th/id/OIP.bpJTixcJ9eRwEFjKsApJ8QHaEo?pid=ImgDet&rs=1"
                            />
                        ) : (
                            <span>
                                <FontAwesomeIcon className={cx('menu-icon')} icon={faEllipsisVertical} />
                            </span>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
