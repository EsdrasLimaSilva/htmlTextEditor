import { ChangeEvent, ChangeEventHandler } from "react";
import EditorElementHeader from "./EditorElementHeader";

interface Props {
   elementKey: string;
   updateContent: Function;
   elementTag: string;
   changeElement: Function;
   content: string;
}

const EditorElement = ({
   elementTag,
   elementKey,
   updateContent,
   changeElement,
   content,
}: Props) => {
   function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
      const textArea = e.target as HTMLTextAreaElement;
      textArea.style.height = `0`;
      textArea.style.height = `${textArea.scrollHeight + 10}px`;
      updateContent(elementKey, String(textArea.value));
   }

   return (
      <div>
         <EditorElementHeader
            elementTag={elementTag}
            elementKey={elementKey}
            changeElement={changeElement}
         />

         <textarea
            id={elementKey}
            className="border-2 border-gray-800 p-2 focus:border-blue-600 outline-none"
            onChange={handleChange}
            value={content}
         ></textarea>
      </div>
   );
};

export default EditorElement;
