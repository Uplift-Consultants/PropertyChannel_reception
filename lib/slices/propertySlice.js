import { createSlice } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';

const initialState = {
  preview: null,
};

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    resetPropertyState: (state) => {
      return initialState; 
    },
    setPropertyDetails: (state, action) => {
      state.preview = action.payload 
    },
    addFeature: (state, action) => {
      const exists = state.preview.features.find(item => item._id === action.payload._id);
      if (!exists) {
        state.preview.features.push(action.payload);
      }
    },
    removeFeature: (state, action) => {
      state.preview.features = state.preview.features.filter(item => item._id !== action.payload);
    },
    reorderImages: (state, action) => {
      const { oldIndex, newIndex } = action.payload;

      // 1. Check if property and images actually exist to avoid "undefined" errors
      if (state.preview && state.preview.images) {
        
        state.preview.images = arrayMove(
          state.preview.images, 
          oldIndex, 
          newIndex
        );
      }
    },
    deleteImage: (state, action) => {
      const idToDelete = action.payload;
      state.preview.images = state.preview.images.filter(
        (img) => img._id !== idToDelete
      );
    },
    updateImages: (state, action) => {
      state.preview.images = action.payload;
    },
    selectedPropertyType: (state, action) => {
      state.newListing = action.payload;
    },    
    newProperty: (state, action) => {
      state.preview = action.payload;
    },
    editTitle: (state, action) => {
      state.preview.title = action.payload
    },
    fetchedProperties: (state, action) => {
      state.preview = action.payload.properties
      state.total = action.payload.total
      state.page = action.payload.page
      state.pages = action.payload.pages
    },
    editPrice: (state, action) => {
      state.preview.price = action.payload
    },
    editLocation: (state, action) => {
      state.preview.location = action.payload
    },
    editSuburb: (state, action) => {
      state.preview.suburb = action.payload
    },
    editListingType: (state, action) => {
      state.preview.listingType = action.payload
    },
    editCategory: (state, action) => {
      state.preview.category = action.payload
    },
    editBedrooms: (state, action) => {
      state.preview.bedrooms = action.payload
    },
    editBaths: (state, action) => {
      state.preview.bathrooms = action.payload
    },
    editGarage: (state, action) => {
      state.preview.garage = action.payload
    },
    editLot: (state, action) => {
      state.preview.lot = action.payload
    },
    editDescription: (state, action) => {
      state.preview.description = action.payload
    },
    selectAgents: (state, action) => {
      if (!Array.isArray(state.preview.agent)) {
        state.preview.agent = [];
      }
      state.preview.agent = action.payload.selectedAgents;
    },
  },
})

export const { 
  resetPropertyState,
  setPropertyDetails,
  addFeature,
  removeFeature,
  reorderImages,
  deleteImage,
  updateImages,
  selectedPropertyType,
  newProperty, 
  editTitle,
  fetchedProperties,
  editListingType,
  editCategory,
  editPrice,
  editBedrooms,
  editBaths,
  editGarage,
  editLot,
  editLocation,
  editSuburb,
  editDescription,
  selectAgents
 } = propertySlice.actions
export default propertySlice.reducer