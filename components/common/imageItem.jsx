export function ImageItem({ url, onDelete, isOverlay, dragListeners }) {
  const style = {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
    boxShadow: isOverlay ? '0 10px 15px rgba(0,0,0,0.3)' : 'none',
    opacity: isOverlay ? 0.8 : 1,
    cursor: isOverlay ? 'grabbing' : 'grab',
  };

  return (
    <div className={`image-item ${isOverlay ? 'grabbing' : ''}`} {...dragListeners}>
      <img src={url} style={style} alt="Property" draggable={false} />
      {!isOverlay && (
        <button 
          type="button"
          className="delete-btn"
          draggable={false}
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // Stop dnd-kit from seeing this click
            onDelete();
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
}