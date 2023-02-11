import { EditorUtilsType } from "../hooks/useEditor";
import ToolButton from "./ToolButton";

interface Props {
   utils: EditorUtilsType;
}

const Toolbar = ({ utils }: Props) => {
   return (
      <div id="toolbar" className="fixed top-0 left-[300px] p-4  flex flex-col gap-4 select-none">
         <ToolButton element="p" pushElement={utils.pushElement}>
            p
         </ToolButton>

         <ToolButton element="h1" pushElement={utils.pushElement}>
            h1
         </ToolButton>

         <ToolButton element="h2" pushElement={utils.pushElement}>
            h2
         </ToolButton>

         <ToolButton element="h3" pushElement={utils.pushElement}>
            h3
         </ToolButton>

         <button
            type="button"
            onClick={() => utils.pushImage()}
            className="w-8 h-8 flex justify-center items-center bg-orange-500 text-gray-50 rounded-full"
         >
            img
         </button>
      </div>
   );
};

export default Toolbar;
