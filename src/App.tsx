import { useEffect, useRef } from "react";
import Editor from "./containers/Editor";
import useEditor from "./hooks/useEditor";

function App() {
   const { editorState, editorUtils, focusedElement } = useEditor();

   const previewRef = useRef(null);

   useEffect(() => {
      if (typeof window != undefined && localStorage.getItem("localData")) {
         editorUtils.setState(JSON.parse(localStorage.getItem("localData")!));
      }
   }, []);

   useEffect(() => {
      const previewElement = previewRef.current ? (previewRef.current as HTMLDivElement) : null;
      previewElement!.innerHTML = "";

      for (const element of editorState) {
         if (element.tag == "img") {
            previewElement!.innerHTML += `<img src="${element.source}" alt="${element.altText}" draggable="false" />`;
         } else {
            previewElement!.innerHTML += `<${element.tag}>${element.content}</${element.tag}>`;
         }
      }
   });

   useEffect(() => {
      document.getElementById(focusedElement)?.focus();
   }, [focusedElement]);

   return (
      <main>
         <Editor editorState={editorState} editorUtils={editorUtils} />

         <div ref={previewRef} id="preview"></div>
      </main>
   );
}

export default App;
