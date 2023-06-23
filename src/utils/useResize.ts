import { useState, useEffect, useCallback } from "react";

export const useResize = () => {
  const [positionX, setPositionX] = useState<number>(35);
  const [positionY, setPositionY] = useState<number>(95);
  const [draggingX, setDraggingX] = useState<boolean>(false);
  const [draggingY, setDraggingY] = useState<boolean>(false);

  const handleMouseDownX = () => {
    setDraggingX(true);
  };

  const handleMouseDownY = () => {
    setDraggingY(true);
  };

  const handleMouseUp = useCallback(() => {
    setDraggingX(false);
    setDraggingY(false);
  }, []);

  const handleMouseMoveX = useCallback(
    (event: MouseEvent) => {
      if (draggingX) {
        let percentageOfScreen = (event.clientX / window.innerWidth) * 100;

        if (percentageOfScreen < 3) {
          percentageOfScreen = 0;
        } else {
          percentageOfScreen = Math.max(20, Math.min(percentageOfScreen, 65));
        }

        setPositionX(percentageOfScreen);
      }
    },
    [draggingX]
  );

  const handleMouseMoveY = useCallback(
    (event: MouseEvent) => {
      if (draggingY) {
        let percentageOfScreen = (event.clientY / window.innerHeight) * 100;
  
        // We want percentageOfScreen to be between 70 and 95
        percentageOfScreen = Math.max(70, Math.min(percentageOfScreen, 95));
  
        setPositionY(percentageOfScreen);
      }
    },
    [draggingY]
  );
  

  useEffect(() => {
    if (draggingX) {
      window.addEventListener("mousemove", handleMouseMoveX);
      window.addEventListener("mouseup", handleMouseUp);
    }

    if (draggingY) {
      window.addEventListener("mousemove", handleMouseMoveY);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (draggingX) {
        window.removeEventListener("mousemove", handleMouseMoveX);
        window.removeEventListener("mouseup", handleMouseUp);
      }

      if (draggingY) {
        window.removeEventListener("mousemove", handleMouseMoveY);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [draggingX, draggingY, handleMouseMoveX, handleMouseMoveY, handleMouseUp]);

  return {
    positionX,
    positionY,
    handleMouseDownX,
    handleMouseDownY,
  };
};
