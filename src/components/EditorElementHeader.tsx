import { EditorUtilsType } from "../hooks/useEditor";

interface Props {
   elementTag: string;
   elementKey: string;
   utils: EditorUtilsType;
}

const EditorElementHeader = ({ elementTag, utils, elementKey }: Props) => {
   return (
      <div className="editor-element-header">
         <select
            defaultValue={elementTag}
            className="bg-inherit border-none outline-none text-gray-50"
            onChange={(e) => utils.changeElement(elementKey, e.target.value)}
         >
            <option value="p">p</option>
            <option value="h1">h1</option>
            <option value="h2">h2</option>
            <option value="h3">h3</option>
         </select>

         <button
            type="button"
            className="text-gray-50"
            onClick={() => utils.removeElement(elementKey)}
         >
            remove
         </button>
      </div>
   );
};

export default EditorElementHeader;
