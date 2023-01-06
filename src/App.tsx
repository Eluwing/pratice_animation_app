import styled, { createGlobalStyle } from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { garbageCanState, IToDoState, toDoState } from './atoms';
import Board from './Components/Board';
import GarbageBoard from './Components/GarbageBoard';
import BoardController from './Components/BoardController';
import React from 'react';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:black;
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const GarbageWrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const GarbageBoards = styled.div`
  display: flex;
  width: 100%;
  min-width: 200px;
`;

const BoardControllerWrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

const BoardControllerForm = styled.div`
  display: block;
`;

function App(): JSX.Element {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [garbageCan, setGarbageCan] = useRecoilState(garbageCanState);
  const onDragEnd = (info: DropResult): void => {
    const { destination, source } = info;

    if (destination == null) return;

    // same board
    if (destination?.droppableId === source?.droppableId) {
      setToDos((allOldBoards: IToDoState) => {
        const boardCopy = [...allOldBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // 1) delete item on source.index
        boardCopy.splice(source?.index, 1);
        // 2) put back the item on the destination.index
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allOldBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId === 'Garbage Can' && destination?.droppableId !== source?.droppableId) {
      const toDoBoard = [...toDos[source?.droppableId]];
      // Add target item in Todo List
      setGarbageCan((allOldGarbageBoards) => {
        const garbageBoard = [...allOldGarbageBoards[destination?.droppableId]];
        const toDoTaskObj = toDoBoard[source.index];
        garbageBoard.splice(destination.index, 0, toDoTaskObj);
        return {
          ...allOldGarbageBoards,
          [destination.droppableId]: garbageBoard,
        };
      });
      // Delete target item in Todo List
      setToDos((allOldToDoBoards) => {
        toDoBoard.splice(source.index, 1);
        return {
          ...allOldToDoBoards,
          [source.droppableId]: toDoBoard,
        };
      });
    } else {
      setToDos((allOldBoards) => {
        const sourceBoard = [...allOldBoards[source?.droppableId]];
        const destinationBoard = [...allOldBoards[destination?.droppableId]];
        const taskObj = sourceBoard[source.index];
        sourceBoard.splice(source?.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allOldBoards,
          [source.droppableId]: sourceBoard,
          [destination?.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <>
      <GlobalStyle />
      <BoardControllerWrapper>
        <BoardControllerForm>
          <BoardController />
        </BoardControllerForm>
      </BoardControllerWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
        <GarbageWrapper>
          <GarbageBoards>
            {Object.keys(garbageCan).map((boardId) => (
              <GarbageBoard boardId={boardId} key={boardId} gabageCan={garbageCan[boardId]} />
            ))}
          </GarbageBoards>
        </GarbageWrapper>
      </DragDropContext>
    </>
  );
}

export default App;
