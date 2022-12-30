import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import { ITodo } from '../atoms';
import React from 'react';

const GarbageWrapper = styled.div`
  padding: 20px 0px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  margin-bottom: 10px;

  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? '#dfe6e9' : props.isDraggingFromThis ? '#b2bec3' : 'transparent'};
  flex-grow: 1;
  transition: backgroud-color 0.3s ease-in-out;
  padding: 20px;
  min-width: 200px;
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

interface IBoardProps {
  gabageCan: ITodo[];
  boardId: string;
}

const GarbageBoard = ({ gabageCan, boardId }: IBoardProps): JSX.Element => {
  // DroppableProvided:magic, DroppableStateSnapshot:info
  return (
    <GarbageWrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {gabageCan.map((toDo, index) => (
              <DragabbleCard key={toDo.id} toDoId={toDo.id} index={index} toDoText={toDo.text} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </GarbageWrapper>
  );
};

export default GarbageBoard;
