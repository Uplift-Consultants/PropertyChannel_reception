'use client';

import React from 'react';
import { getHtml } from '@lib/flier';
import FlierGenerator from '@components/flierGenerator';
import { useSelector } from 'react-redux';
import TemplateCarousel from '@components/dashboard/templatesCarousel';

const formatFlierData = (preview) => ({
  images: preview?.images?.map(img => img.url) || [],
  title: preview?.title || 'Property Title',
  price: preview?.price ? `$${preview.price.toLocaleString()}` : 'Price on Request',
  listingType: preview?.listingType || 'For Sale',
  location: preview?.location || 'Location not specified',
  description: preview?.description || '',
  features: preview?.features?.map(f => f.title) || [],
  agent: {
    name: preview?.agents?.[0]?.fullName || 'Agent Name',
    phone: preview?.agents?.[0]?.phone?.primary || 'Contact Info'
  }
}); 

// 1. Define your available templates here
const TEMPLATES = [
  { id: 'modern-grid', name: 'Modern Grid' },
  { id: 'luxury-dark', name: 'Luxury Onyx' },
];

export default function Templates() {
    const { preview } = useSelector((state) => state.property);
    const [selectedTemplate, setSelectedTemplate] = React.useState('modern-grid');

    const flierData = formatFlierData(preview);
    const htmlContent = getHtml(selectedTemplate, flierData);

    return (
      <div className="flex flex-col items-center gap-8 p-4">
        {/* 1. The Carousel now handles all the visual previewing */}
        <TemplateCarousel 
          slides={TEMPLATES} 
          flierData={flierData}
          onSelect={(id) => setSelectedTemplate(id)} 
        />
        
        {/* 2. The Generator Button stays below to download the active selection */}
        <div className="dFlex">
          <FlierGenerator flierData={flierData} templateId={selectedTemplate} />
        </div>
      </div>
    );
}