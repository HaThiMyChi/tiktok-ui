
import HeadlessTippy  from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import AccountItem from '~/components/AccountItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { faCircleXmark, faSpinner} from '@fortawesome/free-solid-svg-icons';
import { SearchIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/apiServices/searchServices';



const cx = classNames.bind(styles);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    // 1. ''
    // 2. 'h'
    // 3. 'ho'
    // 4. 'hoa'
    // khi mà gõ chữ "h" ở search value thì dependency của value nó thay đổi thì mới chạy vào hàm useEffect
    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);
            const result = await searchServices.search(debounced);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    }


    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                       {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input 
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos" 
                    spellCheck={false}
                    onChange={handleChange} 
                    onFocus={() => setShowResult(true)}
                />
                
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>

                        {/* Icon clear */}
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                

                {/* Loading */}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> }

                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                    {/* Icon search */}
                    {/* <FontAwesomeIcon icon={faMagnifyingGlass} /> */}
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
