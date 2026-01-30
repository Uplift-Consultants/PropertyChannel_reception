'use client';

import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPropertyQuery, useUpdatePropertyMutation, usePublishListingMutation } from "@lib/slices/propertyApiSlice";
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { setPropertyDetails, resetPropertyState } from "@lib/slices/propertySlice";
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import OverviewIcon from '@icons/overview.svg'
import CameraIcon from '@icons/camera.svg'
import FlyerIcon from '@icons/flyer.svg'
import Media from '@components/common/media';
import Overview from '@components/common/overview';
import Templates from '@components/common/templates';
import Modal from '@components/dashboard/modal';
import DeleteListing from '@components/common/deleteListing';
import ManageAgents from '@components/common/manageAgents';

const TABS = [
  { id: 'overview', label: 'Overview', icon: <OverviewIcon size={18} /> },
  { id: 'media', label: 'Media', icon: <CameraIcon size={18} /> },
  { id: 'templates', label: 'Templates', icon: <FlyerIcon size={18} /> },
];

export default function EditListng() {
  const [activeTab, setActiveTab] = useState('overview');
  const [deleteListing, toggleDelete] = useState(false);
  const [manageAgents, toggleManageAgents] = useState(false);
  const prevTabRef = useRef(activeTab);

  const { id } = useParams();

  const { data, isLoading, isSuccess, error } = useGetPropertyQuery(id);

  const [updateProperty, {isLoading: isUpdating, isSuccess: isUpdateSuccess}] = useUpdatePropertyMutation();
    const [ publishListing, {isLoading: isPublishing, isSuccess: isPublised }] = usePublishListingMutation();
  

  const property = useSelector((state) => state.property.preview); 

  const dispatch = useDispatch();

  useEffect(() => {
      if (isSuccess && data) {
          dispatch(setPropertyDetails(data));
      }
    return () => {
      dispatch(resetPropertyState());
    };
  }, [isSuccess, data, dispatch]);    

// Determine if tabs should be locked
  const isInteractionDisabled = isLoading || isUpdating || !!error;
 
const handleSave = async () => {
    if (!property) return;

    // This one line replaces your entire try/catch UI logic
    toast.promise(updateProperty(property), {
      loading: 'Saving changes...',
      success: 'Listing updated successfully!',
      error: 'Could not update listing.',
    });
  };


const handlePublish = async () => {
    if (!property) return;

    // This one line replaces your entire try/catch UI logic
    toast.promise(publishListing(property._id), {
      loading: 'Publising...',
      success: 'Listing published successfully!',
      error: 'Could not publish listing.',
    });
}
useEffect(() => {
  const previousTab = prevTabRef.current;

  if (previousTab === 'overview' && activeTab !== 'overview') {
   updateProperty(property);
  console.log('autosave')
  }
 
  prevTabRef.current = activeTab;
}, [activeTab]);

useEffect(() => {
  const handleVisibilityChange = () => {
    // 1. Check if the tab is hidden
    // 2. Optional: Only save if they were currently on the 'overview' tab
    if (document.visibilityState === 'hidden') {
      
      // Use the mutation directly for a "silent" save 
      // Users usually find it jarring to see a toast notification 
      // from a tab they just left.
      if (property) {
        updateProperty(property);
      }
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [activeTab, property, updateProperty]);

  return (
    <>
    <div className="actions">
      <h2>Edit Listing</h2>
    </div> 
    <div className='listings'>
        <Tabs.Root defaultValue="overview" onValueChange={setActiveTab} className="tabs-root">
              <div className="tabs-header">
        <Tabs.List className="tabs-list">
          {TABS.map((tab) => (
            <Tabs.Trigger key={tab.id} value={tab.id} className="tabs-trigger" disabled={isInteractionDisabled}>
              {/* Flex container to align icon and label */}
              <div className={`tabs-content-wrapper ${activeTab === tab.id ? 'active' : ''}`}>
                <span className="tab-label">{tab.label}</span>
              </div>

              {/* Sliding Background */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-bg"
                  className="active-pill"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </div>

      <div className="mt-6">
        <Tabs.Content value="overview" className="outline-none focus:ring-0">
          <Overview property={data} isLoading={isLoading} isSuccess={isSuccess} handleSave={handleSave} isUpdating={isUpdating} handlePublish={handlePublish} isPublishing={isPublishing} isPublised={isPublised} toggleDelete={toggleDelete} toggleManageAgents={toggleManageAgents}/>
        </Tabs.Content>

        <Tabs.Content value="media" className="outline-none">
          <Media isLoading={isLoading} isSuccess={isSuccess}/>
        </Tabs.Content>

        <Tabs.Content value="templates" className="templates">
            <Templates/>
        </Tabs.Content>
      </div>
      </Tabs.Root>
    </div>
    <Modal isOpen={deleteListing} onClose={() => toggleDelete(false)}>
      <DeleteListing id={id} onClose={() => toggleDelete(false)} />
    </Modal>
    <Modal isOpen={manageAgents} onClose={() => toggleManageAgents(false)}>
          <ManageAgents onClose={()=> toggleManageAgents(false)}/>
    </Modal>
 
    </>
  );
}