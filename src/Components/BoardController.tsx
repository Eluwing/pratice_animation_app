import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Form = styled.form`
`;

const handleBoardDelete = () =>{
    console.log("Board Delete!");

}

const BoardController = () =>{
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm();

    const onBoardAdd = ({addBoardName}:any) =>{
        setToDos((allOldBoards)=>{
            return{
                ...allOldBoards,
                [addBoardName]:[],
            }
        })
    };

    return(
        <>
            <Form onSubmit={handleSubmit(onBoardAdd)} >
                <input {...register("addBoardName",{required: true})} type="text" placeholder="Input Add board Name"></input>
                <button type="submit">Board Add</button>
            </Form>
            <button onClick={handleBoardDelete}>Board Delete</button>
        </>
    );
};

export default BoardController;