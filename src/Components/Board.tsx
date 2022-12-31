/* eslint-disable @typescript-eslint/no-misused-promises */
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import { ITodo, toDoState } from '../atoms';
import { useSetRecoilState } from 'recoil';
import React from 'react';

const Wrapper = styled.div`
  padding: 20px 0px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  margin-bottom: 10px;
  display: flex;
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
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

const Form = styled.form``;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps): JSX.Element => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm): void => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allOldBoards) => {
      return {
        ...allOldBoards,
        [boardId]: [...allOldBoards[boardId], newToDo],
      };
    });
    setValue('toDo', '');
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register('toDo', { required: true })} type="text" placeholder={`Add task on ${boardId}`}></input>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo.id} toDoId={toDo.id} index={index} toDoText={toDo.text} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
