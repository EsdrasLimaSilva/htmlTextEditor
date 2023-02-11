import { ReactNode } from "react";

interface Props {
   pushElement: Function;
   element: string;
   children: string;
}

const ToolButton = ({ pushElement, element, children }: Props) => {
   return (
      <button
         type="button"
         onClick={() => pushElement(element)}
         className="w-8 h-8 flex justify-center items-center bg-orange-500 text-gray-50 rounded-full"
      >
         {children}
      </button>
   );
};

export default ToolButton;
