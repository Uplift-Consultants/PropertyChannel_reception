'use client';

import { useState, useEffect, useCallback } from 'react';
import pLimit from 'p-limit';
import { useUploadImagesMutation } from '@lib/slices/propertyApiSlice';
import { updateImages } from '@lib/slices/propertySlice';
import imageCompression from 'browser-image-compression';
import { useDispatch, useSelector } from 'react-redux';

const limit = pLimit(3);

export default function UploadImages({ onClose }) {
  const [uploadImage] = useUploadImagesMutation();
  const dispatch = useDispatch();

  const [uploadStates, setUploadStates] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const propertyId = useSelector((state) => state?.property?.preview?._id);

  // 1. Auto-close modal when all uploads in the queue are finished
  useEffect(() => {
    const statesArray = Object.values(uploadStates);
    if (statesArray.length > 0) {
      const allFinished = statesArray.every(
        (s) => s.status === 'Complete' || s.status === 'Error'
      );
      
      if (allFinished) {
        const timer = setTimeout(() => {
          onClose();
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [uploadStates, onClose]);

  // Cleanup object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      Object.values(uploadStates).forEach((state) => {
        if (state.preview) URL.revokeObjectURL(state.preview);
      });
    };
  }, [uploadStates]);

  const updateFileStatus = (fileName, progress, status) => {
    setUploadStates((prev) => {
      if (!prev[fileName]) return prev;
      return {
        ...prev,
        [fileName]: { ...prev[fileName], progress, status },
      };
    });
  };

  const processFiles = async (files) => {
    if (files.length === 0) return;

    // Initialize states for the new files
    const newStates = {};
    files.forEach((file) => {
      newStates[file.name] = {
        progress: 0,
        status: 'In Queue',
        preview: URL.createObjectURL(file),
      };
    });

    setUploadStates((prev) => ({ ...prev, ...newStates }));

    const uploadTasks = files.map((file) =>
      limit(async () => {
        try {
          // Optimization Step
          const compressed = await imageCompression(file, {
            maxSizeMB: 0.25 ,
            onProgress: (p) => updateFileStatus(file.name, p, 'Optimizing'),
          });

          // Upload Step - Unwrap to get the actual data or catch error
          const updatedProperty = await uploadImage({
            propertyId,
            file: compressed,
            onProgress: (p) => updateFileStatus(file.name, p, 'Uploading'),
          }).unwrap();

          // UPDATE REDUX STATE: This ensures the background preview updates immediately
          if (updatedProperty) {
            dispatch(updateImages(updatedProperty));
          }

          updateFileStatus(file.name, 100, 'Complete');
        } catch (err) {
          console.error(`Failed to upload ${file.name}:`, err);
          updateFileStatus(file.name, 0, 'Error');
        }
      })
    );

    await Promise.all(uploadTasks);
  };

  // Handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const removeFile = useCallback((fileName) => {
    setUploadStates((prev) => {
      const newState = { ...prev };
      if (newState[fileName]?.preview) {
        URL.revokeObjectURL(newState[fileName].preview);
      }
      delete newState[fileName];
      return newState;
    });
  }, []);

  return (
    <div className="wrapper uploadImages">
      <div className="header">
        <h2>Upload Images</h2>
        <button className='btn primary done' onClick={onClose}>Done</button>
      </div>
      <div className="content">
        <div 
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            multiple 
            onChange={handleFileChange} 
            id="multi-upload" 
            hidden 
            accept="image/*" 
          />
          <label htmlFor="multi-upload" className="drop-zone-label">
            <div className="icon">📸</div>
            <p>Drag and drop photos here or <span className='btn browse'>Browse</span></p>
          </label>
        </div>

        <div className="preview-grid">
          {Object.entries(uploadStates).map(([name, state]) => (
            <div key={name} className="preview-card">
              <div className="thumbnail-wrapper">
                <img src={state.preview} alt="preview" className="thumbnail" />
                <button className="remove-btn" onClick={() => removeFile(name)}>&times;</button>

                {state.status !== 'Complete' && state.status !== 'Error' && (
                  <div className="progress-overlay">
                    <div className="overlay-content">
                      <span className="percentage">{state.progress}%</span>
                      <small>{state.status}</small>
                    </div>
                  </div>
                )}
                
                {state.status === 'Complete' && <div className="success-badge">✓</div>}
                {state.status === 'Error' && <div className="error-badge">!</div>}
              </div>
            </div>
          ))}
        </div>        
      </div>
    </div>
  );
}