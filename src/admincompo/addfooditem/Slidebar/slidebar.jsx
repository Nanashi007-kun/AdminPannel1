// Sidebar.js

import React, { useState } from "react";
import { motion } from "framer-motion";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [/* your links array */];

    return (
        <>
            <div className="sidebar-btn" onClick={() => setIsOpen(!isOpen)}>
                <span className="material-symbols-outlined icon">menu</span>
            </div>

            <motion.aside
                className="sidebar"
                initial={{ clipPath: "circle(0% at 00)" }}
                animate={isOpen ? { clipPath: "circle(200% at 00)" } : { clipPath: "circle(0% at 00)" }}
                transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
            >
                <div className="sidebar-wrapper">
                    <nav className="sidebar-menu">
                        <ul>
                            {links.map((item) => (
                                <li key={item.name}>
                                    <a href={item.path} className="menu-link">
                                        <span className="text">{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </motion.aside>
        </>
    );
}

export default Sidebar;
