import { useContext } from "react";
import EditorElement from "../components/EditorElement";
import EditorImageElement from "../components/EditorImageElement";
import Toolbar from "../components/Toolbar";
import { EditorContextProvider } from "../contexts/editorContext";

const Editor = () => {
   const editorContext = useContext(EditorContextProvider);
   const editorUtils = editorContext!.editorUtils;
   const editorState = editorContext!.editorState;

   return (
      <div
         className="editor"
         onKeyDown={(e) => {
            if (e.key == "Enter") {
               e.preventDefault();
               const relativeIndex = editorUtils.findElementIndex(
                  (e.target as HTMLTextAreaElement).id,
               );
               editorUtils.appendParagraph(relativeIndex);
               return false;
            }
         }}
      >
         <Toolbar utils={editorUtils} />

         {editorState.map((element) => {
            if (element.tag == "img") {
               return (
                  <EditorImageElement
                     key={element.key}
                     elementkey={element.key}
                     updateImageData={editorUtils.updateImageData}
                     source={String(element.source)}
                     alt={String(element.altText)}
                     removeElement={editorUtils.removeElement}
                  />
               );
            } else {
               return (
                  <EditorElement
                     key={element.key}
                     elementKey={element.key}
                     elementTag={element.tag}
                     utils={editorUtils}
                     content={element.content || ""}
                  />
               );
            }
         })}

         <button type="button" className="save-button" onClick={() => editorUtils.save()}>
            save
         </button>
      </div>
   );
};

export default Editor;
