import React, { HtmlHTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isPropertySignature } from "typescript";
import { toDoState } from "../atoms";

const ADD_FORM_NAME = "Add";
const DELETE_FORM_NAME = "Delete"

interface IBoardControllerForm {
    targetBoardName: string;
};

const Form = styled.form`
`;

const BoardController = () => {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IBoardControllerForm>();
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);
    const [formStatus, setFormStatus] = useState<string>(ADD_FORM_NAME);

    const onBoardController = ({ targetBoardName }: IBoardControllerForm) => {
        console.log({formStatus});
        if(formStatus === ADD_FORM_NAME){
            //Add taget Key in toDo Array
            setToDos((allOldBoards) => {
                return {
                    ...allOldBoards,
                    [targetBoardName]: [],
                }
            });
        }
        else if(formStatus === DELETE_FORM_NAME){
            console.log("Delete button");
            //Delete taget Key in toDo Array
            setToDos((allOldBoards) => {
                return {
                    ...allOldBoards,
                    [targetBoardName]: [],
                }
            });
        }
        return;

    };

    const onButtonChange = (event: React.MouseEvent<HTMLElement>) => {
        setIsDeleteVisible((oldDeleteVisible) => {
            return !oldDeleteVisible;
        })
        setFormStatus((event.target as HTMLInputElement).name);
    };

    const DeleteForm = () => {
        return (
            <>
                <button onClick={onButtonChange} type="button" name={DELETE_FORM_NAME}>Change Add Form</button>
                <div>
                    <button type="submit">Board Delete</button>
                </div>
            </>
        );
    };

    const AddForm = () => {
        return (
            <>
                <button onClick={onButtonChange} type="button" name={ADD_FORM_NAME}>Change Delete Form</button>
                <div>
                    <button type="submit">Board Add</button>
                </div>
            </>
        );
    };

    console.log({formStatus});
    return (
        <>
            <Form onSubmit={handleSubmit(onBoardController)}>
                <input {...register("targetBoardName", { required: true })} type="text" placeholder="Input Add board Name"></input>
                {isDeleteVisible ? <DeleteForm />: <AddForm />}
            </Form>
        </>
    );
};

export default BoardController;