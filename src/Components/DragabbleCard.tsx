import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px 10px;
  background-color: ${(props) => (props.isDragging ? '#74b9ff' : props.theme.cardColor)};
  box-shadows: ${(props) => (props.isDragging ? '0px 2px 5px rgba(0,0,0,0.5)' : 'none')};
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DragabbleCard = ({ toDoId, toDoText, index }: IDragabbleCardProps): JSX.Element => {
  return (
    <Draggable key={toDoId} draggableId={String(toDoId)} index={index}>
      {(magic, info) => (
        <Card isDragging={info.isDragging} ref={magic.innerRef} {...magic.dragHandleProps} {...magic.draggableProps}>
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DragabbleCard);
