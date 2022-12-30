/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState, IToDoState } from '../atoms';

const ADD_FORM = 'add';
const DELETE_FORM = 'delete';
const BOARD_RESET_BUTTON = 'boardReset';

interface IBoardControllerForm {
  targetBoardName: string;
}

const Form = styled.form``;

const BoardController = (): JSX.Element => {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoState);
  const { register, setValue, handleSubmit } = useForm<IBoardControllerForm>();
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [formStatus, setFormStatus] = useState<string>(ADD_FORM);
  const resetBoardState = useResetRecoilState(toDoState);

  const onBoardController = ({ targetBoardName }: IBoardControllerForm): void => {
    if (formStatus === ADD_FORM) {
      // Add taget Key in toDo Array
      setToDos((allOldBoards) => {
        return {
          ...allOldBoards,
          [targetBoardName]: [],
        };
      });
    } else if (formStatus === DELETE_FORM) {
      const boardKeyList = Object.keys(toDos);
      const isExistKey = boardKeyList.includes(targetBoardName);

      if (!isExistKey) {
        throw new Error(`Not exist name '${targetBoardName}' in boards`);
      }

      // Delete taget Key in toDo Array
      setToDos((allOldBoards) => {
        const newBoardKeyList = boardKeyList.filter((value) => value !== targetBoardName);

        let newBoard: IToDoState = {};
        newBoardKeyList.map((key) => {
          newBoard = {
            ...newBoard,
            [key]: allOldBoards[key],
          };
          return newBoard;
        });
        return newBoard;
      });
    }
    setValue('targetBoardName', '');
  };

  const onButtonChange = (): void => {
    setIsDeleteVisible((oldDeleteVisible) => {
      return !oldDeleteVisible;
    });
    if (isDeleteVisible) {
      setFormStatus(ADD_FORM);
    } else if (!isDeleteVisible) {
      setFormStatus(DELETE_FORM);
    }
  };
  const onResetClick = (): void => {
    resetBoardState();
    setValue('targetBoardName', '');
  };

  const ResetButton = (): JSX.Element => {
    return (
      <>
        <button onClick={onResetClick} type="button" name={BOARD_RESET_BUTTON}>
          Board Reset
        </button>
      </>
    );
  };

  const DeleteForm = (): JSX.Element => {
    return (
      <>
        <button onClick={onButtonChange} type="button" name={ADD_FORM}>
          Change Add Form
        </button>
        <div>
          <button type="submit">Board Delete</button>
          <ResetButton />
        </div>
      </>
    );
  };

  const AddForm = (): JSX.Element => {
    return (
      <>
        <button onClick={onButtonChange} type="button" name={DELETE_FORM}>
          Change Delete Form
        </button>
        <div>
          <button type="submit">Board Add</button>
          <ResetButton />
        </div>
      </>
    );
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onBoardController)}>
        <input
          {...register('targetBoardName', { required: true })}
          type="text"
          placeholder="Input Add board Name"
        ></input>
        {isDeleteVisible ? <DeleteForm /> : <AddForm />}
      </Form>
    </>
  );
};

export default BoardController;
