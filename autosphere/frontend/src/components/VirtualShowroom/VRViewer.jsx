import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Fullscreen, X } from 'lucide-react';

const VRViewer = ({ images, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.01;
    setZoom(prev => Math.min(Math.max(0.5, prev + delta), 3));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swipe right - previous image
        setCurrentImageIndex(prev => 
          prev === 0 ? images.length - 1 : prev - 1
        );
      } else {
        // Swipe left - next image
        setCurrentImageIndex(prev => 
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  const enterFullscreen = () => {
    if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'ArrowLeft':
          setCurrentImageIndex(prev => 
            prev === 0 ? images.length - 1 : prev - 1
          );
          break;
        case 'ArrowRight':
          setCurrentImageIndex(prev => 
            prev === images.length - 1 ? 0 : prev + 1
          );
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [images.length, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        className="relative w-full h-full max-w-6xl max-h-[90vh] bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Main Image */}
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex].url}
          alt={images[currentImageIndex].alt}
          className="w-full h-full object-contain cursor-grab active:cursor-grabbing"
          style={{ 
            scale: zoom,
            rotate: `${rotation}deg`
          }}
          drag={false}
        />

        {/* Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.25, 3))}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
          >
            <ZoomIn size={20} className="text-white" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.25, 0.5))}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
          >
            <ZoomOut size={20} className="text-white" />
          </button>
          <button
            onClick={() => setRotation(prev => prev + 90)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
          >
            <RotateCcw size={20} className="text-white" />
          </button>
          <button
            onClick={enterFullscreen}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
          >
            <Fullscreen size={20} className="text-white" />
          </button>
          <button
            onClick={resetView}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                index === currentImageIndex 
                  ? 'border-blue-500 scale-110' 
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
    </motion.div>
  );
};

export default VRViewer;