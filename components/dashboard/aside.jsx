import MenuBarsIcon from "@icons/menubars.svg"
import NavLink from "./navLink";
import DashboardIcon from "@icons/dashboard.svg";
import ListingsIcon from "@icons/listings.svg";
import LeadsIcon from "@icons/leads.svg";
import FolderIcon from "@icons/folder.svg";
import SettingsIcon from "@icons/user-settings.svg";

export default function Aside( ) {
    return (
        <aside className="sidebar">
            <button className="btn menu">
                <i className="icon">
                    <MenuBarsIcon height="40px" width="40px"/>
                </i>
            </button>
            <nav className="navWrapper">
                <ul className="navList">
                    <li className="listItem">
                        <NavLink className="navLink" href="/">
                            <i className="icon">
                                <DashboardIcon className="default" height="24px" width="24px"/>
                            </i>
                            <span className="title">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="listItem">
                        <NavLink className="navLink" href="/listings">
                            <i className="icon">
                                <ListingsIcon className="alt" height="24px" width="24px"/>
                            </i>
                            <span className="title">Listings</span>
                        </NavLink>
                    </li>
                    <li className="listItem">
                        <NavLink className="navLink" href="/leads">
                            <i className="icon">
                                <LeadsIcon className="alt" height="24px" width="24px"/>
                            </i>
                            <span className="title">Leads</span>
                        </NavLink>
                    </li>
                    <li className="listItem">
                        <NavLink className="navLink" href="/files">
                            <i className="icon">
                                <FolderIcon className="alt" height="24px" width="24px"/>
                            </i>
                            <span className="title">My Files</span>
                        </NavLink>
                    </li>
                    <li className="listItem">
                        <NavLink className="navLink" href="/account-settings">
                            <i className="icon">
                                <SettingsIcon className="alt" height="24px" width="24px"/>
                            </i>
                            <span className="title">Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}