import { useState } from "react";
import { v4 as uuid } from "uuid";

type EditorDataType = {
   tag: string;
   key: string;
   content?: string;
   source?: string;
   altText?: string;
}[];

export default function useEditor(editorData?: EditorDataType) {
   const [editorState, setEditorState] = useState(editorData ? editorData : []);

   const editorUtils = {
      findElementIndex(elementKey: string) {
         const index = editorState.findIndex((el) => el.key == elementKey);
         return index;
      },

      pushElement(elementTag: string) {
         const elementId = uuid();
         setEditorState((prev) => [...prev, { tag: elementTag, content: "", key: elementId }]);
         return elementId;
      },

      pushImage() {
         const imageId = uuid();
         setEditorState((prev) => [...prev, { tag: "img", key: imageId, source: "", altText: "" }]);
         return imageId;
      },

      updateContent(elementId: string, newContent: string) {
         const index = editorState.findIndex((el) => el.key == elementId);
         const newState = [...editorState];
         newState[index].content = newContent;

         setEditorState(newState);
      },

      updateImageData(source: string, altText: string, imageId: string) {
         const index = this.findElementIndex(imageId);
         const newState = [...editorState];
         newState[index].source = source;
         newState[index].altText = altText;

         setEditorState(newState);
      },

      changeElement(key: string, newTag: string) {
         const index = this.findElementIndex(key);
         const newState = [...editorState];
         newState[index].tag = newTag;

         setEditorState(newState);
      },

      removeElement(key: string) {
         const newState = editorState.filter((el) => el.key != key);
         setEditorState(newState);
      },
   };

   return { editorState, editorUtils };
}
