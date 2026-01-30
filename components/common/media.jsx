import { useDispatch, useSelector } from 'react-redux';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useState } from "react";
import { reorderImages, deleteImage } from "@lib/slices/propertySlice.js";
import { SortableItem } from './sortableImg.jsx';
import { ImageItem } from './imageItem';
import AddImageIcon from '@icons/addImage.svg';
import Modal from '@components/dashboard/modal.jsx';
import UploadImages from './uploadImages.jsx';


export default function Media({isLoading, isSuccess}) {
    
    const dispatch = useDispatch();

    const [activeId, setActiveId] = useState(null);
    const [uploadImage, toggleUpload] = useState(false);

    const images = useSelector((state) => state?.property?.preview?.images);

    const handleDragStart = (event) => {
        setActiveId(event.active.id); 
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
        const oldIndex = images.findIndex((img) => img._id === active.id);
        const newIndex = images.findIndex((img) => img._id === over.id);
        dispatch(reorderImages({ oldIndex, newIndex }));
        }
        setActiveId(null); // Clear active state
    };
      const handleDeleteImage = (id) => {
        dispatch(deleteImage(id));
    }

    return (
<>
{isSuccess && <DndContext 
      collisionDetection={closestCenter} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={images.map(i => i._id)} strategy={verticalListSortingStrategy}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {images.map((img) => (
            <SortableItem key={img._id} id={img._id} url={img.url} onDelete={() => handleDeleteImage(img._id)} />
          ))}
        </div>
      </SortableContext>
                  <button className='btn upload' onClick={() => toggleUpload(true)}>
                <i className="icon addImage mb2">
                    <AddImageIcon height={48} width={48} />
                </i>
                <span>Upload Picture</span>
            </button>

      {/* The Overlay: This renders outside the normal flow */}
      <DragOverlay adjustScale={true}>
        {activeId ? (
          <ImageItem 
            url={images.find(img => img._id === activeId)?.url} 
            isOverlay 
          />
        ) : null}
      </DragOverlay>
    </DndContext>}

    <Modal isOpen={uploadImage} onClose={() => toggleUpload(false)}>
        <UploadImages onClose={() => toggleUpload(false)}/>
    </Modal>
</>
    )
}