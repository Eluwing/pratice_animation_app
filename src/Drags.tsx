import styled from 'styled-components';
import React from 'react';
import { motion } from 'framer-motion';

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover: {
    scale: 1.5,
    rotateZ: 90,
  },
  click: {
    scale: 1,
    borderRadius: '100px',
  },
  drag: {
    backgroundColor: 'rgb(46,204,113)',
    transition: { duration: 10 },
  },
};

// A child component of a parent with a default variants parameter follows the parent's attributes.
const DragsInSquare = (): JSX.Element => {
  return (
    <Wrapper>
      <Box drag variants={boxVariants} whileHover="hover" whileDrag="drag" whileTap="click" />
    </Wrapper>
  );
};

export default DragsInSquare;
