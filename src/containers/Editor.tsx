import EditorElement from "../components/EditorElement";
import EditorImageElement from "../components/EditorImageElement";
import Toolbar from "../components/Toolbar";
import { EditorDataType, EditorUtilsType } from "../hooks/useEditor";

interface Props {
   editorState: EditorDataType;
   editorUtils: EditorUtilsType;
}

const Editor = ({ editorState, editorUtils }: Props) => {
   return (
      <div
         id="editor"
         className="w-[300px] h-screen border-2 border-slate-800 shadow-md bg-gray-50 p-2 flex flex-col gap-2 overflow-x-hidden overflow-y-auto fixed top-0 left-0"
         onKeyDown={(e) => {
            if (e.key == "Enter") {
               e.preventDefault();
               editorUtils.pushElement("p");
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
      </div>
   );
};

export default Editor;
