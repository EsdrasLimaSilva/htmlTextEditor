import { ChangeEvent, ChangeEventHandler } from "react";
import { EditorUtilsType } from "../hooks/useEditor";
import EditorElementHeader from "./EditorElementHeader";

interface Props {
   elementKey: string;
   elementTag: string;
   content: string;
   utils: EditorUtilsType;
}

const EditorElement = ({ elementTag, elementKey, content, utils }: Props) => {
   function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
      const textArea = e.target as HTMLTextAreaElement;
      textArea.style.height = `0`;
      textArea.style.height = `${textArea.scrollHeight + 10}px`;
      utils.updateContent(elementKey, String(textArea.value));
   }

   return (
      <div className="editor-element">
         <EditorElementHeader
            elementTag={elementTag}
            elementKey={elementKey}
            changeElement={utils.changeElement}
         />

         <textarea id={elementKey} onChange={handleChange} value={content}></textarea>
      </div>
   );
};

export default EditorElement;
