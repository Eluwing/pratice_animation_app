import styled from 'styled-components';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position: absolute;
  top: 50px;
`;

const box = {
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 1,
    },
  },
};

// A child component of a parent with a default variants parameter follows the parent's attributes.
const AnimatePresenceSlider = (): JSX.Element => {
  const [visible, setVisible] = useState(1);
  const nextPlease = (): void => setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  return (
    <Wrapper>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
          i === visible ? (
            <Box variants={box} initial="invisible" animate="visible" exit="exit" key={i}>
              {i}
            </Box>
          ) : null,
        )}
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
    </Wrapper>
  );
};

export default AnimatePresenceSlider;