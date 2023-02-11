import ToolButton from "./ToolButton";

interface Props {
   pushElement: Function;
   pushImage: Function;
}

const Toolbar = ({ pushElement, pushImage }: Props) => {
   return (
      <div id="toolbar" className="absolute top-10 flex flex-row gap-4">
         <ToolButton element="p" pushElement={pushElement}>
            p
         </ToolButton>

         <ToolButton element="h1" pushElement={pushElement}>
            h1
         </ToolButton>

         <ToolButton element="h2" pushElement={pushElement}>
            h2
         </ToolButton>

         <ToolButton element="h3" pushElement={pushElement}>
            h3
         </ToolButton>

         <button
            type="button"
            onClick={() => pushImage()}
            className="w-8 h-8 flex justify-center items-center bg-orange-500 text-gray-50 rounded-full"
         >
            img
         </button>
      </div>
   );
};

export default Toolbar;
