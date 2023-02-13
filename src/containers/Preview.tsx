import { createElement, useContext, useEffect } from "react";
import PreviewElement from "../components/PreviewElement";
import { EditorContextProvider } from "../contexts/editorContext";

const Preview = () => {
   const editorContext = useContext(EditorContextProvider);
   const { editorState } = editorContext!;

   console.log(editorState);

   return (
      <div className="preview">
         {editorState.map((element) => {
            return (
               <PreviewElement
                  tag={element.tag}
                  content={element.content}
                  imageAltText={element.altText}
                  imageSource={element.source}
               />
            );
         })}
      </div>
   );
};

export default Preview;
