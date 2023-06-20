import { ReactNode, useEffect, useState } from 'react';
import { NAVBAR_HEIGHT } from '~/constants/styles';

type BackgroundProps = {
    children: ReactNode;
  };

const Background: React.FC<BackgroundProps> = ({ children }) => {
  const [bgDegree, setBgDegree] = useState(90);

  function easeInOutQuad(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  useEffect(() => {
    const duration = 1250; // Duration in ms
    const start = Date.now();

    const animation = setInterval(() => {
      const now = Date.now();
      const elapsed = now - start;

      if (elapsed >= duration) {
        clearInterval(animation);
        setBgDegree(90); // Explicitly set to 450 degrees when animation ends
      } else {
        const degreeChange = easeInOutQuad(elapsed, 0, 360, duration);
        setBgDegree(90 + degreeChange);
      }
    }, 5); // Update every 20ms for smoother animation

    return () => clearInterval(animation);
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center"
      style={{
        background: `conic-gradient(from ${bgDegree}deg at 7.5% ${NAVBAR_HEIGHT}, #ffb56b, #f3915e, #d5424b, #ae2474, #7a0f86, #350368, #262626)`,
      }}
    >
      {children}
    </main>
  );
};

export default Background;
