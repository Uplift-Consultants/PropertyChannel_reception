'use client';

import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { getHtml } from '@lib/flier'; // Import your HTML generator
import { PrevButton, NextButton, usePrevNextButtons } from './templatesCarouselArrows';

const TemplateCarousel = ({ slides = [], flierData, onSelect }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = useCallback((api) => {
    const index = api.selectedScrollSnap();
    setSelectedIndex(index);
    if (slides[index]) onSelect(slides[index].id);
  }, [slides, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    handleSelect(emblaApi);
    emblaApi.on('select', handleSelect).on('reInit', handleSelect);
  }, [emblaApi, handleSelect]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
return (
  <section className="embla">
    {/* Viewport MUST have the ref */}
    <div className="embla__viewport" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((template, index) => (
          <div className="embla__slide" key={template.id}>
            <div className={`template-aspect-ratio transition-all duration-300 ${
              index === selectedIndex ? 'ring-4 ring-indigo-500' : 'opacity-40'
            }`}>
              <div className="html-preview-content">
                <div 
                  dangerouslySetInnerHTML={{ __html: getHtml(template.id, flierData) }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Buttons */}
    <div className="embla__controls">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  </section>
);
};

export default TemplateCarousel;