import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import EditorContext from "./contexts/editorContext";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
   <EditorContext>
      <App />
   </EditorContext>,
);
