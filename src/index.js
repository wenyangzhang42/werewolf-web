import React from "react";
import { render } from 'react-dom';
import { ChakraProvider } from "@chakra-ui/react";

import Header from "./components/Header";
import GamePage from "./components/GamePage";
import TestPage from "./components/TestPage";

function App() {
  return (
    <ChakraProvider>
      <TestPage/>
      <Header />
      <GamePage />
    </ChakraProvider>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)