"use client"

import React from "react";
import { useRouter } from 'next/navigation';
import { useAddPropertyMutation } from "@lib/slices/propertyApiSlice";
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@icons/close.svg';
import LoadingSpinner from "@icons/spinner.svg";
import { useEffect, useState } from 'react';



export default function NewListing({ onClose }) {

    const router = useRouter();

    const [addProperty , { isLoading, isSuccess, error }] = useAddPropertyMutation();

    const categoryOptions = [
        { label: 'House', value: 'House'},
        { label: 'Residential Stand', value: 'Residential Stand'},
        { label: 'Flats & Apartments', value: 'Flats & Apartments'},
        { label: 'Cluster', value: 'Cluster'},
        { label: 'Cottages', value: 'Cottages'},
        { label: 'Farms & Plots', value: 'Farms & Plots'},
        { label: 'Offices', value: 'Offices'},
        { label: 'Shops & Retail', value: 'Shops & Retail'},
        { label: 'Commercial Stand', value: 'Commercial Stand'},
        { label: 'Industrial Stand', value: 'Industrial Stand'},
        { label: 'Accomodation', value: 'Accomodation'},
        { label: 'Hotels & Lodges', value: 'Hotels & Lodges'}
    ];

    const [category, setCategory] = useState('');

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    const drawerVariants = {
        hidden: {
        // If mobile, hide below screen; if desktop, hide to the right
        y: isMobile ? '100%' : 0,
        x: isMobile ? 0 : '100%',
        },
        visible: {
        y: 0,
        x: 0,
        transition: { type: 'spring', damping: 25, stiffness: 200 }
        },
        exit: {
        y: isMobile ? '100%' : 0,
        x: isMobile ? 0 : '100%',
        transition: { ease: 'easeInOut', duration: 0.3 }
        }
    };

const handelNewListing = async (e) => {
    e.preventDefault();

    try {
        const res = await addProperty({ category }).unwrap();

        onClose();
        router.push(`/listings/${res._id}`);
        
    } catch (err) {
        console.error("Failed to create:", err);
    }
};


    return (
        <div className="wrapper addnew" initial={{ scale: 0.9 }} animate={{ scale: 1}} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <span className="handle"></span>
                           <div className="header dFlex">
                    <h3 className="title">Choose a category</h3>
                </div>
            <div className="content">
   
                <div className="pill-group">    
                    {categoryOptions.map((option) => (
                        <React.Fragment key={option.value}>
                            <input type="radio" id={`option${option.value}`} name="selection" value={option.value} onChange={(e) => setCategory(e.target.value)} />
                            <label htmlFor={`option${option.value}`}>{option.label}</label>
                        </React.Fragment>
                    ))}
                </div> 
    
                <div className="footer">
                    <button className="btn primary" onClick={handelNewListing} disabled={isLoading || !category}>
                        {isLoading ? <LoadingSpinner stroke="#fff"/> : "Add Listing"}
                    </button>                        
                </div>     
            </div>

        </div>
    );
}