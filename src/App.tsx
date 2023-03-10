import styled from 'styled-components';
import React from 'react';
import { motion } from 'framer-motion';
import Variants from './Variants';
import Drags from './Drags';
import Gestures from './Gestures';
import DragsInSquare from './DragsInSquare';
import DragsMotionValue from './DragsMotionValue';
import DragsScroll from './DragsScroll';
import SvgAnimation from './SvgAnimation';
import AnimatePresenceWindow from './AnimatePresenceWindow';
import AnimatePresenceSlider from './AnimatePresenceSlider';
import LayoutAnimation from './LayoutAnimation';
import LayoutWindowAnimation from './LayoutWindowAnimation';
import LayoutWindowAniOptimize from './LayoutWindowAniOptimize';

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: 'spring', delay: 0.5 } },
};

const App = (): JSX.Element => {
  return (
    <>
      <Wrapper>
        <Box variants={myVars} initial="start" animate="end" />
      </Wrapper>
      <Wrapper>
        <Variants />
      </Wrapper>
      <Wrapper>
        <Gestures />
      </Wrapper>
      <Wrapper>
        <Drags />
      </Wrapper>
      <Wrapper>
        <DragsInSquare />
      </Wrapper>
      <Wrapper>
        <DragsMotionValue />
      </Wrapper>
      <Wrapper>
        <DragsScroll />
      </Wrapper>
      <Wrapper>
        <SvgAnimation />
      </Wrapper>
      <Wrapper>
        <AnimatePresenceWindow />
      </Wrapper>
      <Wrapper>
        <AnimatePresenceSlider />
      </Wrapper>
      <Wrapper>
        <LayoutAnimation />
      </Wrapper>
      <Wrapper>
        <LayoutWindowAnimation />
      </Wrapper>
      <Wrapper>
        <LayoutWindowAniOptimize />
      </Wrapper>
    </>
  );
};

export default App;
