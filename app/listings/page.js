"use client"

import { useGetPropertiesQuery } from "@lib/slices/propertyApiSlice";
import Modal from "@components/dashboard/modal";
import { useState } from "react";
import NewListing from "@components/common/newListing";
import AddIcon from "@icons/add.svg"
import Propertylist from "@lib/hooks/propertylist";


export default function Listings() {
  
  const { data, error, isLoading, isSuccess } = useGetPropertiesQuery();

  const [newListing, toggleListing] = useState(false);

  return (
    <>
      <div className="actions">
        <button className="btn primary mlAuto" onClick={() => toggleListing(true)}>
          <i className="icon">
            <AddIcon height="12" width="12"/>
          </i>
          <span>Add New</span>
        </button>
      </div>
      <div className="wrapper">
        <Propertylist data={data} isLoading={isLoading} isSuccess={isSuccess}/>
      </div>
      <Modal isOpen={newListing} onClose={() => toggleListing(false)}>
        <NewListing onClose={() => toggleListing(false)}/>
      </Modal>
    </>
  );
}
