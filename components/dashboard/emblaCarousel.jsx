import React from 'react'
import { DotButton, useDotButton } from './emblaCarouselDotBtn'
import useEmblaCarousel from 'embla-carousel-react';
import Image from "next/image";

export default function EmblaCarousel({slides}) {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((images, index) => (
            <div className="embla__slide" key={index}>
                <div className="imgCarousel">
                    <Image src={images?.url} alt='image' fill={true}/>
                </div>    
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

