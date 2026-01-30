'use client'

import { useRouter } from 'next/navigation';
import { useDeletePropertyMutation } from "@lib/slices/propertyApiSlice";
import { toast } from 'sonner';
import LoadingSpinner from "@icons/spinner.svg";
import { useEffect } from "react";

export default function DeleteListing({ id, onClose }) {
    const router = useRouter();

    const [deleteProperty, { isLoading, isSuccess }] = useDeletePropertyMutation();

    const handleDelete = async () => {
        if (!id) return;

        toast.promise(deleteProperty(id), {
        loading: 'Deleting listing...',
        success: 'Listing deleted successfully!',
        error: 'Could not delete listing.',
        });

    };
    useEffect(() => {
        if (isSuccess) {
            onClose(); 

            router.push('/listings'); 
        }
    }, [isSuccess]);

    return (
        <div className="wrapper delete">
            <div className="header">
                <h3 className="title">Confirm Delete</h3>
            </div>
            <div className="content">
                <p>Are you sure you want to delete this listing? This action cannot be undone.</p>
            </div>
            <div className="footer">
                <button className="btn delete" type="button" onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <LoadingSpinner stroke="#fff" />
                            <span>Deleting...</span>
                        </>
                    ) : (
                        <span>Delete</span>
                    )}
                </button>
            </div>
        </div>
    )
}