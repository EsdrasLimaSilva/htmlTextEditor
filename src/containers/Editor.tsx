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
