import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ImageItem } from './imageItem';

export function SortableItem({ id, url, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 100 : 1, // Keep it on top while dragging
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ImageItem 
        url={url} 
        onDelete={onDelete} 
        dragListeners={listeners} 
      />
    </div>
  );
}