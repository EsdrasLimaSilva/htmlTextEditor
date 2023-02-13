import { useContext, useEffect } from "react";
import Editor from "./containers/Editor";
import Preview from "./containers/Preview";
import { EditorContextProvider } from "./contexts/editorContext";

function App() {
   const { editorUtils, focusedElement } = useContext(EditorContextProvider)!;

   useEffect(() => {
      if (typeof window != undefined && localStorage.getItem("localData")) {
         editorUtils.setState(JSON.parse(localStorage.getItem("localData")!));
      }
   }, []);

   useEffect(() => {
      document.getElementById(focusedElement)?.focus();
   }, [focusedElement]);

   return (
      <main>
         <Editor />
         <Preview />
      </main>
   );
}

export default App;
