import classNames from "classnames/bind";
import styles from './AccountItem.module.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);


function AccountItem() {
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/15c8639380cc677ebef870ef9f7e1f3f~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=cff96203&x-expires=1750932000&x-signature=AI4wlZkeAc9kBHaFc8Ii3uleS30%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my" alt="Hoa" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvanabc</span>
            </div>
        </div>
    );
}

export default AccountItem;