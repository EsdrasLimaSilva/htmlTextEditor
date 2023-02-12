import { createContext, ReactNode, useState } from "react";
import useEditor from "../hooks/useEditor";
import { EditorDataType, EditorUtilsType } from "../hooks/useEditor";

interface Props {
   children: ReactNode;
}

export const EditorContextProvider = createContext<null | {
   editorState: EditorDataType;
   editorUtils: EditorUtilsType;
   focusedElement: string;
}>(null);

const EditorContext = ({ children }: Props) => {
   const { editorState, editorUtils, focusedElement } = useEditor();

   const value = { editorState, editorUtils, focusedElement };

   return <EditorContextProvider.Provider value={value}>{children}</EditorContextProvider.Provider>;
};

export default EditorContext;
