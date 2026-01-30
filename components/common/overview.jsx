'use client';

import React, { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { 
  editTitle, editPrice, editLocation, editSuburb, 
  editCategory, editListingType, addFeature, 
  removeFeature, editDescription 
} from '@lib/slices/propertySlice';
import LoadingSpinner from "@icons/spinner.svg"
import Skeleton from 'react-loading-skeleton';

const DEFAULT_OPTIONS = [
  { value: 'gym', label: 'Fitness Center' },
  { value: 'pool', label: 'Swimming Pool' },
  { value: 'parking', label: 'Secure Parking' },
  { value: 'wifi', label: 'Fiber Internet' },
  { value: 'pet_friendly', label: 'Pet Friendly' },
];

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

const listingTypeOptions = [
  { label: 'For-sale', value: 'for-sale'},
  { label: 'For-rent', value: 'for-rent'}
] 

export default function Overview({isLoading, isSuccess, handleSave, isUpdating, handlePublish, isPublishing, isPublished, toggleDelete, toggleManageAgents}) {

  const dispatch = useDispatch();

  const property = useSelector((state) => state?.property?.preview);

  const selectedFeatures = property?.features || [];

  // Logic to filter options that aren't already selected
  const filteredOptions = DEFAULT_OPTIONS.filter(
      (option) => !selectedFeatures?.some((feature) => feature._id === option.value)
  );

  // 1. FIND THE CURRENT SELECTED OBJECTS
  // This is the key to making the default values show up correctly on mount
  const currentListingType = useMemo(() => 
    listingTypeOptions.find(opt => opt.value === property?.listingType) || null
  , [property?.listingType]);

  const currentCategory = useMemo(() => 
    categoryOptions.find(opt => opt.value === property?.category) || null
  , [property?.category]);

  const handleSelect = (selectedOption) => {
    if (selectedOption) {
      const newFeature = {
        _id: selectedOption.value,
        title: selectedOption.label
      };
      dispatch(addFeature(newFeature));
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: '8px',
      borderColor: state.isFocused ? '#5021ff' : '#e5e7eb',
      boxShadow: 'none',
      '&:hover': { borderColor: '#5021ff' }
    }),
    valueContainer: (base) => ({
      ...base,
      padding: '2px 12px',
    })
  };

    return (
        <>
          <div className="overview wrapper">
              <div className="card details">
                <div className="header">
                  <h3 className='title'>Property Details</h3>          
                </div>
                <div className="content">
                  <div className="inputGroup">
                    <label htmlFor="title">Title:</label>
                    <input className='grow' type="text" name="title" id="title" defaultValue={property?.title} onChange={(e) => dispatch(editTitle(e.target.value))}/>
                  </div> 
                  <div className="inputGroup">
                    <label htmlFor="location">Location:</label>
                    <input type="text" name="location" id="location" defaultValue={property?.location} onChange={(e) => dispatch(editLocation(e.target.value))} />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="suburb">Suburb:</label>
                    <input type="text" name="suburb" id="suburb" defaultValue={property?.suburb} onChange={(e) => dispatch(editSuburb(e.target.value))} />
                  </div>
                  
                  {/* Category Select */}
                  <div className="inputGroup">
                    <label htmlFor="category">Category:</label>
                    {isLoading ? <Skeleton width={150} height={40}/> : (
                      <Select 
                        instanceId="category-select"
                        value={currentCategory}
                        onChange={(opt) => dispatch(editCategory(opt.value))}
                        options={categoryOptions}
                        styles={customStyles}
                        isSearchable={false}
                      />
                    )}
                  </div>

                  <div className="inputGroup">
                    <label htmlFor="price">Price:</label>
                    <input type="text" name="price" value={property?.price ? property.price.toLocaleString() : ''} onChange={(e) => { const val = e.target.value.replace(/[^0-9.]/g, ''); const num = parseFloat(val); dispatch(editPrice(isNaN(num) ? 0 : num)); }} />
                  </div>

                  {/* Listing Type Select */}
                  <div className="inputGroup">
                    <label htmlFor="listingType">Listing Type:</label>
                    {isLoading && <Skeleton width={150} height={40}/>}
                    {isSuccess && (
                      <Select 
                        className='capitalize grow' 
                        instanceId="listingType" 
                        isSearchable={false} 
                        value={currentListingType} // Use value, not defaultValue
                        onChange={(selectedOption) => { dispatch(editListingType(selectedOption.value)); }} 
                        options={listingTypeOptions} 
                        styles={customStyles}
                      />
                    )}
                  </div>
                </div>
              </div> 
            
            <div className="card features">
              <div className="header">
                <h3 className='title'>Features</h3>          
                <span className='count'>{selectedFeatures?.length || 0}</span>      
              </div>
              <div className="content">
                <div className="input wrapper">
                  <CreatableSelect
                    isMulti={false} 
                    instanceId="property-features-input"
                    options={filteredOptions}
                    value={null} 
                    onChange={handleSelect}
                    placeholder="Type a feature and press Enter..."
                    components={{ IndicatorSeparator: null, DropdownIndicator: null }}
                    styles={customStyles}
                  />
                </div>
                <div className="featuresList">
                  {selectedFeatures && selectedFeatures.length > 0 ? (
                    selectedFeatures.map((feature) => (
                      <div key={feature._id} className="feature">
                        <div className="bullet" />
                        <span className="font-medium text-gray-700">{feature.title}</span>                        
                      <button
                          onClick={() => dispatch(removeFeature(feature._id))}
                          aria-label="Remove feature"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No features added.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="description">
            <div className="card">
              <div className="header">
                <h3 className='title'>Description</h3>          
              </div>
              <div className="content">
                <textarea className='textArea'
                  name="description"
                  id="description"
                  rows="6"
                  defaultValue={property?.description || ''}
                  placeholder="Enter the property description here..." 
                  onChange={(e) => dispatch(editDescription(e.target.value))}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="agents">
            <div className="card">
              <div className="header">
                <h3 className='title'>Agents</h3>          
              </div>
              <div className="content">
                  <ul className="agentsList">
                    {property?.agents?.map((agent, index) => (
                        <li key={index} className="agent dFlex mb2">
                          <div className="wrapper">
                            <div className="avatar mr2">
                                <i className='icon avatar'>
                                    <span>{agent?.fullName ? agent.fullName[0] : '?'}</span>
                                </i>
                            </div>
                            <div className="info">
                                <h4 className="name mb05">{agent?.fullName}</h4>
                            </div>                            
                          </div>
                        </li>
                    ))}
                    <li>
                      <button className='btn addAgent' type="button" onClick={() => toggleManageAgents(true)}>+</button>                      
                    </li>
                </ul>
              </div>
            </div>
          </div>

        <div className='footer actions'>
          <button className='btn delete' onClick={()=> toggleDelete(true)}>Delete</button>
          <button className={`btn ${property?.ad?.website ? 'published primary' : 'publish'}`} onClick={handlePublish} disabled={property?.ad?.website}>
            <span>{property?.ad?.website ? 'Published' : 'Publish'}</span>
            {isPublishing && <LoadingSpinner stroke="#fff" width={16} height={16} />}
          </button>
          <button className="btn save" onClick={handleSave}>
            <span>Save</span>
            {isUpdating && <LoadingSpinner stroke="#fff" width={16} height={16} />}
          </button>
        </div>
      </>
    )
}