import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider
import theme from "./theme"; // Import your custom theme
import App from "./App"; // Your main App component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ChakraProvider theme={theme}> {/* Apply your custom theme */}
        <App />
    </ChakraProvider>
);
