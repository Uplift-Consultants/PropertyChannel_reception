'use client';

import { useState } from 'react';

// Added templateId to props so the generator knows WHICH design to snap
export default function FlierGenerator({ flierData, templateId = 'default' }) {
  const [loading, setLoading] = useState(false);
  
  const handleGenerate = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // We now send both the property data AND the chosen template ID
        body: JSON.stringify({ 
          ...flierData, 
          templateId 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate image');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${flierData.title?.replace(/\s+/g, '-').toLowerCase() || 'flier'}-${templateId}.png`;
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error("Generation Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className={`btn primary download transition-all duration-200 ${
        loading 
          ? 'opacity-70 cursor-wait' 
          : 'hover:shadow-xl active:scale-95'
      }`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Processing...
        </div>
      ) : (
        'Download Flier'
      )}
    </button>
  );
}