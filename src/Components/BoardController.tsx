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

const BoardControllerArea = styled.div`
  display: flex;
  padding: 20px 20px;
  border-radius: 5px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.boardColor};
`;

const FormButtonItems = styled.div`
  margin: 5px 0;
`;

const ResetButtonArea = styled.span`
  margin: 0 5px;
`;

const ChangeFormButton = styled.span`
  margin: 5px 5px;
`;

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
          Reset
        </button>
      </>
    );
  };

  const DeleteForm = (): JSX.Element => {
    return (
      <>
        <ChangeFormButton>
          <button onClick={onButtonChange} type="button" name={ADD_FORM}>
            Change Form
          </button>
        </ChangeFormButton>
        <FormButtonItems>
          <button type="submit">Delete</button>
          <ResetButtonArea>
            <ResetButton />
          </ResetButtonArea>
        </FormButtonItems>
      </>
    );
  };

  const AddForm = (): JSX.Element => {
    return (
      <>
        <ChangeFormButton>
          <button onClick={onButtonChange} type="button" name={DELETE_FORM}>
            Change Form
          </button>
        </ChangeFormButton>
        <FormButtonItems>
          <button type="submit">Add</button>
          <ResetButtonArea>
            <ResetButton />
          </ResetButtonArea>
        </FormButtonItems>
      </>
    );
  };
  return (
    <>
      <BoardControllerArea>
        <Form onSubmit={handleSubmit(onBoardController)}>
          <input
            {...register('targetBoardName', { required: true })}
            type="text"
            placeholder="Input Add board Name"
          ></input>
          {isDeleteVisible ? <DeleteForm /> : <AddForm />}
        </Form>
      </BoardControllerArea>
    </>
  );
};

export default BoardController;
