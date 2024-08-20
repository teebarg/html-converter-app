import React, { useState } from "react";
import "./App.css";
// import Editor, { Monaco } from "@monaco-editor/react";
// import type { editor } from "monaco-editor";
import { CodeBlock } from "./components/CodeBlock";

function App() {
    const [code, setCode] = useState<string>(`<p class="bg-red-500">Test Html from Dynamic</p>`);
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // const handleEditorDidMount = useCallback((_: editor.IStandaloneCodeEditor, monaco: Monaco): void => {
    //     monaco.editor.defineTheme("my-theme", {
    //         base: "vs-dark",
    //         inherit: true,
    //         rules: [],
    //         colors: {
    //             "editor.background": "#171717",
    //         },
    //     });

    //     monaco.editor.setTheme("my-theme");
    // }, []);

    const handleConvert = async () => {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API}/api`, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain",
            },
            body: code,
        });
        const data = await response.text();
        setResult(data);
        setLoading(false);
    };

    return (
        <React.Fragment>
            <div style={{ padding: "0 16px" }}>
                <h4 style={{ fontSize: "24px", fontWeight: "bold", padding: 0, margin: 0 }}>HtmlConverter</h4>
            </div>
            <div className="container">
                <div style={{ width: "50%" }}>
                    <CodeBlock
                        code={code}
                        editable={!loading}
                        onChange={(value) => {
                            setCode(value);
                        }}
                    />
                    {/* <Editor
                        height="80vh"
                        value={code}
                        onMount={handleEditorDidMount}
                        onChange={(value) => setCode(value)}
                        options={{ readOnly: false }}
                    /> */}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <button onClick={handleConvert}>Convert</button>
                </div>
                <div style={{ width: "50%" }}>
                    {/* <Editor height="80vh" value={result} onMount={handleEditorDidMount} options={{ readOnly: false }} /> */}
                    <CodeBlock code={result} editable={!loading} />
                </div>
            </div>
        </React.Fragment>
    );
}

export default App;
