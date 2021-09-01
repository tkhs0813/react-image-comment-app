import { useMemo, useState } from "react";
import styled from "styled-components";
import { Pixi } from "./components/Pixi";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  min-width: 760px;
`;

type Chat = {
  messages: {
    id: string;
    author: string;
    createdAt: string;
    message: string;
  }[];
  inputValue: string;
  pin: { xRatio: number; yRatio: number }; // 0 ~ 1
};

const App = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [activeChatIndex, setActiveChatIndex] = useState(0);

  const createNewChat = (position: { xRatio: number; yRatio: number }) => {
    console.log(position);
    const filteredState = chatList.filter((c) => c.messages.length > 0);
    setChatList([
      ...filteredState,
      {
        messages: [],
        inputValue: "",
        pin: position,
      },
    ]);
    setActiveChatIndex(filteredState.length);
  };

  // const updateMessageHandler = (value: string, index: number) => {};

  // const submitMessageHandler = (index: number) => {};

  const pinList = useMemo(() => {
    return chatList.map((c) => c.pin);
  }, [chatList]);
  // const clickPinHandler = (index: number) => {};
  return (
    <Wrapper>
      <Pixi
        pins={pinList}
        addPin={createNewChat}
        // clickPinHandler={clickPinHandler}
      />
    </Wrapper>
  );
};

export default App;
