"use client"

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion} from 'framer-motion';

export default function Modal({isOpen, onClose, children}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="modal" onClick={onClose}>
            <motion.label className="overlay" htmlFor="card" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}/>
            <motion.div className="card" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9 }} animate={{ scale: 1}} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                {children}
            </motion.div>
        </div>,
        document.getElementById('portal')
    )
}