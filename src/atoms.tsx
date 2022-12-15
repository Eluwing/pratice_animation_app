import { atom, selector } from "recoil";

export interface ITodo{
    id: number;
    text: string;
}

interface IToDoState{
    [key: string]: ITodo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        Doing: [],
        Done: [],
    },

});

export const garbageCanState = atom<IToDoState>({
    key: "garbageCan",
    default: {
        "Garbage Can": [],
    },

});

// export const toDoSelector = selector({
//     key: "toDoSelector",
//     get: ({ get }) => {
//         const toDos = get(toDoState);
//         const category = get(categoryState);
//         return toDos.filter((toDo) => toDo.category === category)
//     }
// });
