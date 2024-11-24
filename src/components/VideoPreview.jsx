import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Handles mouse movement over the container
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect(); // Get container dimensions

    const xOffset = clientX - (rect.left + rect.width / 2); // X offset
    const yOffset = clientY - (rect.top + rect.height / 2); // Y offset

    if (isHovering) {
      // Parallax effect for the container
      gsap.to(sectionRef.current, {
        x: xOffset * 0.1,
        y: yOffset * 0.1,
        rotationY: xOffset * 0.05,
        rotationX: -yOffset * 0.05,
        transformPerspective: 800,
        ease: "power1.out",
        duration: 0.5,
      });

      // Inner content moves in the opposite direction for depth
      gsap.to(contentRef.current, {
        x: -xOffset * 0.05,
        y: -yOffset * 0.05,
        scale: 1.05,
        duration: 0.5,
        ease: "power1.out",
      });

      // Simulate a dynamic light source effect
      gsap.to(sectionRef.current, {
        boxShadow: `${-xOffset * 0.1}px ${yOffset * 0.1}px 30px rgba(0, 0, 0, 0.2)`,
        duration: 0.5,
        ease: "power1.out",
      });
    }
  };

  useEffect(() => {
    // Reset the position and style when hover ends
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        duration: 1,
        ease: "power1.out",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power1.out",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{
        perspective: "800px",
      }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
