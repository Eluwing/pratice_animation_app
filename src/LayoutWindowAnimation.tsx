import styled from 'styled-components';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// layoutId property connects animation effect between box component and box component
const LayoutWindowAnimation = (): JSX.Element => {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = (): void => setClicked((prev) => !prev);
  return (
    <Wrapper onClick={toggleClicked}>
      <Grid>
        <Box />
        <Box />
        <Box />
        <Box />
      </Grid>
      <AnimatePresence>
        {clicked ? (
          <Overlay
            initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
            animate={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
          >
            <Box layoutId="hello" style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
};

export default LayoutWindowAnimation;
