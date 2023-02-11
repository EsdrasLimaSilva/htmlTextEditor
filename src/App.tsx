import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import EditorElement from "./components/EditorElement";
import EditorImageElement from "./components/EditorImageElement";
import Toolbar from "./components/Toolbar";

const initialState = [
   {
      tag: "h2",
      content: "Um dos maiores pintores de todos os tempos",
      key: "de6af6cc-c92f-4b63-afe4-7306663bbf40",
   },

   {
      tag: "img",
      key: "cfa82c33-beb9-4475-918d-48941a959213",
      source:
         "https://www.rbsdirect.com.br/filestore/4/7/4/3/2_d062940d94a21f7/23474_e76aa04ae77e2c3.jpg?w=1200&h=630&a=c&version=1575255600",
      altText: "retratos de van gogh",
   },

   {
      tag: "p",
      content:
         "Vincent van Gogh (1853-1890) foi um importante pin…e o levou ao isolamento e finalmente ao suicídio.",
      key: "08b86060-782f-4cd0-b8dd-06e88ba35b18",
   },

   {
      tag: "p",
      content:
         "Com uma trajetória difícil, cheia de problemas emo… um dos maiores legados artísticos da humanidade.",
      key: "8a8c773d-cc1f-4c42-96ab-e7df85d9fb6b",
   },

   { tag: "h3", content: "Infância e juventude", key: "4afe8aef-41b7-4448-9b6d-545d395ebbdc" },

   {
      tag: "p",
      content:
         "Vincent Willem van Gogh nasceu em Groot Zundert, u…sou a infância melancólico e inclinado à solidão.",
      key: "fcedc400-fc4c-46c9-b7cb-5eebdee2ee2f",
   },
];

function App() {
   const [editorState, setEditorState] =
      useState<{ tag: string; key: string; content?: string; source?: string; altText?: string }[]>(
         initialState,
      );

   const [focusedElement, setFocusedElement] = useState("");

   const previewRef = useRef(null);

   function findElementIndex(elementKey: string) {
      const index = editorState.findIndex((el) => el.key == elementKey);
      return index;
   }

   function pushElement(elementTag: string) {
      const elementId = uuid();
      setFocusedElement(elementId);
      setEditorState((prev) => [...prev, { tag: elementTag, content: "", key: elementId }]);
   }

   function pushImage() {
      const imageId = uuid();
      setFocusedElement(imageId);
      setEditorState((prev) => [...prev, { tag: "img", key: imageId, source: "", altText: "" }]);
   }

   function updateContent(elementId: string, newContent: string) {
      const index = editorState.findIndex((el) => el.key == elementId);
      const newState = [...editorState];
      newState[index].content = newContent;

      setEditorState(newState);
   }

   function updateImageData(source: string, altText: string, imageId: string) {
      const index = findElementIndex(imageId);
      const newState = [...editorState];
      newState[index].source = source;
      newState[index].altText = altText;

      setEditorState(newState);
   }

   function changeElement(key: string, newTag: string) {
      const index = findElementIndex(key);
      const newState = [...editorState];
      newState[index].tag = newTag;

      setEditorState(newState);
   }

   function removeElement(key: string) {
      const newState = editorState.filter((el) => el.key != key);
      setEditorState(newState);
   }

   useEffect(() => {
      const previewElement = previewRef.current ? (previewRef.current as HTMLDivElement) : null;
      previewElement!.innerHTML = "";

      for (const element of editorState) {
         if (element.tag == "img") {
            previewElement!.innerHTML += `<img src="${element.source}" alt="${element.altText}" />`;
         } else {
            previewElement!.innerHTML += `<${element.tag}>${element.content}</${element.tag}>`;
         }
      }
   });

   useEffect(() => {
      document.getElementById(focusedElement)?.focus();
   }, [focusedElement]);

   return (
      <main className="h-screen w-screen flex flex-row justify-center items-center gap-4 bg-gray-100">
         <Toolbar pushElement={pushElement} pushImage={pushImage} />

         <div
            id="editor"
            className="w-[400px] h-[500px] border-2 border-blue-800 shadow-md bg-gray-50 p-2 flex flex-col gap-2 overflow-x-hidden overflow-y-auto"
            onKeyDown={(e) => {
               if (e.key == "Enter") {
                  e.preventDefault();
                  pushElement("p");
                  return false;
               }
            }}
         >
            {editorState.map((element) => {
               if (element.tag == "img") {
                  return (
                     <EditorImageElement
                        key={element.key}
                        elementkey={element.key}
                        updateImageData={updateImageData}
                        source={String(element.source)}
                        alt={String(element.altText)}
                     />
                  );
               } else {
                  return (
                     <EditorElement
                        key={element.key}
                        elementKey={element.key}
                        elementTag={element.tag}
                        updateContent={updateContent}
                        changeElement={changeElement}
                        content={element.content || ""}
                     />
                  );
               }
            })}
         </div>

         <div
            ref={previewRef}
            id="preview"
            className="w-[400px] h-[500px] border-2 border-blue-800 shadow-md bg-gray-50 p-2"
         ></div>
      </main>
   );
}

export default App;
