import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { wrapper as PopperWrapper } from '~/component/Popper';
import AccountsItem from '~/component/Accounts';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(Styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }

        setLoading(true);

        axios
            // có thể sử dụng biến môi trường bằng cách sử dụng process.env.(biến môi trường ở file .env.development hoặc ở file .env.production)
            .get(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounce)}&type=less`, {
                params: {
                    q: debounce,
                    type: 'less',
                },
            })

            .then((res) => {
                setSearchResult(res.data.data);
                setLoading(false);
            })

            .catch(() => {
                setLoading(false);
            });
    }, [debounce]);

    const handleHidenResult = () => {
        setShowResult(false);
    };

    const handlechange = (e) => {
        if (!e.target.value.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h2 className={cx('search-tiltle')}>Accounts</h2>
                        {searchResult.map((result) => (
                            <AccountsItem data={result} key={result.id} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHidenResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    className={cx('input')}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={handlechange}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button
                        className={cx('close')}
                        onClick={() => {
                            setSearchValue('');
                            inputRef.current.focus();
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && (
                    <button className={cx('loading')}>
                        <FontAwesomeIcon icon={faSpinner} />
                    </button>
                )}
                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
