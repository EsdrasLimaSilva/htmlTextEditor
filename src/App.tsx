import { useEffect, useRef } from "react";
import Toolbar from "./components/Toolbar";
import Editor from "./containers/Editor";
import useEditor from "./hooks/useEditor";

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
         "Vincent van Gogh (1853-1890) foi um importante pintor holandês, um dos maiores representantes do pós-impressionismo. Van Gogh morreu praticamente no anonimato, depois de uma vida atormentada que o levou ao isolamento e finalmente ao suicídio.",
      key: "08b86060-782f-4cd0-b8dd-06e88ba35b18",
   },

   {
      tag: "p",
      content:
         "Com uma trajetória difícil, cheia de problemas emocionais, Van Gogh deixou uma obra comovente e vigorosa, que se constitui em um dos maiores legados artísticos da humanidade.",
      key: "8a8c773d-cc1f-4c42-96ab-e7df85d9fb6b",
   },

   { tag: "h3", content: "Infância e juventude", key: "4afe8aef-41b7-4448-9b6d-545d395ebbdc" },

   {
      tag: "p",
      content:
         "Vincent Willem van Gogh nasceu em Groot Zundert, uma pequena aldeia holandesa, no dia 30 de março de 1853. Filho de um pastor calvinista, era o primogênito de seis filhos. Passou a infância melancólico e inclinado à solidão.",
      key: "fcedc400-fc4c-46c9-b7cb-5eebdee2ee2f",
   },

   {
      tag: "p",
      content:
         "Gostava muito de ler, sobretudo histórias sobre os oprimidos, o que posteriormente justifica seu interesse pelo sofrimento e injustiças sociais. Em 1865 ingressou em um internato provinciano.",
      key: "lkldc400-fc4c-4671-b7cb-5jdbdee2ee2f",
   },
];

function App() {
   const { editorState, editorUtils, focusedElement } = useEditor(initialState);

   const previewRef = useRef(null);

   useEffect(() => {
      const previewElement = previewRef.current ? (previewRef.current as HTMLDivElement) : null;
      previewElement!.innerHTML = "";

      for (const element of editorState) {
         if (element.tag == "img") {
            previewElement!.innerHTML += `<img src="${element.source}" alt="${element.altText}" draggable="false" />`;
         } else {
            previewElement!.innerHTML += `<${element.tag}>${element.content}</${element.tag}>`;
         }
      }
   });

   useEffect(() => {
      document.getElementById(focusedElement)?.focus();
   }, [focusedElement]);

   return (
      <main className="h-screen w-screen flex flex-row justify-end items-start gap-4 bg-gray-100 overflow-x-hidden p-8">
         <Editor editorState={editorState} editorUtils={editorUtils} />

         <div
            ref={previewRef}
            id="preview"
            className="w-screen max-w-[700px] border-2  shadow-md  p-2 ml-[400px] mr-auto bg-white"
         ></div>
      </main>
   );
}

export default App;
