import classNames from "classnames/bind";
import styles from './Sidebar.module.scss';
import config from "~/config";
import Menu, {MenuItem} from "./Menu";
import {HomeIcon, FollowingIcon, LiveIcon} from "~/components/Icons";

const cx = classNames.bind(styles);

function Sidebar() {
    return <aside className={cx('wrapper')}>
       <Menu>
            <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} />
            <MenuItem title="Following" to={config.routes.following} icon={<FollowingIcon />} />
            <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} />
       </Menu>
    </aside>;
}

export default Sidebar;