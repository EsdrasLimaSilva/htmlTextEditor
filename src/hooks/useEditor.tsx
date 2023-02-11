import { useState } from "react";
import { v4 as uuid } from "uuid";

export interface EditorUtilsType {
   findElementIndex(elementKey: string): number;
   pushElement(elementTag: string): void;
   pushImage(): void;
   updateContent(elementId: string, newContent: string): void;
   updateImageData(source: string, altText: string, imageId: string): void;
   changeElement(key: string, newTag: string): void;
   removeElement(key: string): void;
}

export type EditorDataType = {
   tag: string;
   key: string;
   content?: string;
   source?: string;
   altText?: string;
}[];

export default function useEditor(editorData?: EditorDataType) {
   const [editorState, setEditorState] = useState(editorData ? editorData : []);
   const [focusedElement, setFocusedElement] = useState("");

   const editorUtils = {
      findElementIndex(elementKey: string) {
         const index = editorState.findIndex((el) => el.key == elementKey);
         return index;
      },

      pushElement(elementTag: string) {
         const elementId = uuid();
         setFocusedElement(elementId);
         setEditorState((prev) => [...prev, { tag: elementTag, content: "", key: elementId }]);
      },

      pushImage() {
         const imageId = uuid();
         setFocusedElement(imageId);
         setEditorState((prev) => [...prev, { tag: "img", key: imageId, source: "", altText: "" }]);
      },

      updateContent(elementId: string, newContent: string) {
         const index = editorState.findIndex((el) => el.key == elementId);
         const newState = [...editorState];
         newState[index].content = newContent;

         setEditorState(newState);
      },

      updateImageData(source: string, altText: string, imageId: string) {
         const index = editorUtils.findElementIndex(imageId);
         const newState = [...editorState];
         newState[index].source = source;
         newState[index].altText = altText;

         setEditorState(newState);
      },

      changeElement(key: string, newTag: string) {
         const index = editorUtils.findElementIndex(key);
         const newState = [...editorState];
         newState[index].tag = newTag;

         setEditorState(newState);
      },

      removeElement(key: string) {
         const newState = editorState.filter((el) => el.key != key);
         setEditorState(newState);
      },
   };

   return { editorState, editorUtils, focusedElement };
}
