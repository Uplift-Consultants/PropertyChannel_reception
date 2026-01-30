"use client"

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion"
import Modal from "./modal";
import BellIcon from "@icons/bell.svg";
import AppsIcon from "@icons/apps.svg"
import SettingsIcon from "@icons/settings.svg";
import AdminIcon from "@icons/admin.svg";
import SalesIcon from "@icons/agent.svg";
import RentalsIcon from "@icons/rentals.svg";
import SignoutIcon from "@icons/signout.svg";
import { useState } from "react";
import { signOut } from "@lib/actions";

export default function Header() {

    const [apps, toggleApps] = useState(false);
    const [userInfo, toggleUserInfo] = useState(false);

    return (
        <header className="header">
            <ul className="btnList">
                <li className="listItem">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="btn notifications">
                                <i className="icon">
                                    <BellIcon height="30px" width="30px"/>
                                </i>
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal className="DropdownMenu">
                        <DropdownMenu.Content className="DropdownMenuContent">
                            <div>
                                0 Notifications
                            </div>
                            <DropdownMenu.Arrow className="DropdownMenuArrow" />
                        </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </li>
                <li className="listItem md-hidden" onClick={() => toggleApps(true)}>
                    <button className="btn apps">
                        <i className="icon">
                            <AppsIcon height="24px" width="24px"/>
                        </i>
                    </button>
                </li>
                <li className="listItem md-hidden">
                    <button className="btn avatar" onClick={() => toggleUserInfo(true)}>
                        <span>U</span>
                    </button>
                </li>
                <li className="listItem sm-hidden">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="btn apps">
                                <i className="icon">
                                    <AppsIcon height="24px" width="24px"/>
                                </i>
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal className="DropdownMenu">
                        <DropdownMenu.Content className="DropdownMenuContent" align="end">
                            <span className="title">Departments</span>
                            <ul className="appsList">
                                <li className="listItem">
                                    <Link className="app" href="https://admin.propertychannel.africa">
                                        <i className="icon">
                                            <AdminIcon height="24px" width="24px"/>
                                        </i>
                                        <span className="title">Admin</span>
                                    </Link>
                                </li>
                               <li className="listItem">
                                    <Link className="app" href="https://reception.propertychannel.africa">
                                        <i className="icon">
                                            <AdminIcon height="24px" width="24px" />
                                        </i>
                                        <span className="title">Reception</span>
                                    </Link>
                                </li>
                                <li className="listItem">
                                    <Link className="app" href="https://rentals.propertychannel.africa">
                                        <i className="icon">
                                            <RentalsIcon height="24px" width="24px"/>
                                        </i>
                                        <span className="title">Rentals</span>
                                    </Link>
                                </li>
                                <li className="listItem">
                                    <Link className="app" href="https://sales.propertychannel.africa">
                                        <i className="icon">
                                            <SalesIcon height="24px" width="24px"/>
                                        </i>
                                        <span className="title">Sales</span>
                                    </Link>
                                </li>
                            </ul>
                            <DropdownMenu.Arrow className="DropdownMenuArrow" />
                        </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </li>
               <li className="listItem sm-hidden">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                        <button className='btn avatar' type="button">
                            <span>U</span>
                        </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal className="DropdownMenu">
                        <DropdownMenu.Content className="DropdownMenuContent" align="end">
                            <div className="userInfo">
                                <div className="avatar">
                                    <span>T</span>
                                </div>
                                <span className="greeting">Hi, Username</span>
                            </div>
                            <Link href="/account-settings" className="btn alt">
                                <i className="icon"><SettingsIcon fill="#444" height="24px" width="24px"/></i>
                                <span>Account Settings</span>
                            </Link>
                            <ul className="options">
                                <li className="listItem">
                                    <button className="btn logout" onClick={signOut}>
                                    <i className="icon"><SignoutIcon fill="#fff" height="24px" width="24px"/></i>
                                    <span>Sign out</span>
                                    </button>
                                </li>
                            </ul>
                            <DropdownMenu.Arrow className="DropdownMenuArrow" />
                        </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                </li>
            </ul>
            <Modal isOpen={apps} onClose={() => toggleApps(false)}>
                <motion.div className="wrapper apps" initial={{ scale: 0.9 }} animate={{ scale: 1}} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <span className="title">Departments</span>
                    <ul className="appsList">
                        <li className="listItem">
                            <Link className="app" href="https://admin.propertychannel.africa">
                                <i className="icon">
                                    <AdminIcon height="24px" width="24px"/>
                                </i>
                                <span className="title">Admin</span>
                            </Link>
                        </li>
                        <li className="listItem">
                            <Link className="app" href="https://reception.propertychannel.africa">
                                <i className="icon">
                                    <AdminIcon height="24px" width="24px" />
                                </i>
                                <span className="title">Reception</span>
                            </Link>
                        </li>
                        <li className="listItem">
                            <Link className="app" href="https://rentals.propertychannel.africa">
                                <i className="icon">
                                    <RentalsIcon height="24px" width="24px"/>
                                </i>
                                <span className="title">Rentals</span>
                            </Link>
                        </li>
                        <li className="listItem">
                            <Link className="app" href="https://sales.propertychannel.africa">
                                <i className="icon">
                                    <SalesIcon height="24px" width="24px"/>
                                </i>
                                <span className="title">Sales</span>
                            </Link>
                        </li>
                    </ul>
                </motion.div>   
            </Modal>
            <Modal isOpen={userInfo} onClose={() => toggleUserInfo(false)}>
                <div className="wrapper user" initial={{ scale: 0.9 }} animate={{ scale: 1}} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <div className="userInfo">
                        <div className="avatar">
                            <span>T</span>
                        </div>
                        <span className="greeting">Hi, Username</span>
                    </div>
                    <Link href="/account-settings" className="btn alt">
                        <i className="icon"><SettingsIcon fill="#444" height="24px" width="24px"/></i>
                        <span>Account Settings</span>
                    </Link>
                    <ul className="options">
                        <li className="listItem">
                            <button className="btn logout" onClick={signOut}>
                            <i className="icon"><SignoutIcon fill="#fff" height="24px" width="24px"/></i>
                            <span>Sign out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </Modal>
        </header>
    )
}