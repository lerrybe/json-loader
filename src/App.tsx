import { useEffect, useState } from "react";
import { Button, InputNumber } from "antd";
import type { InputNumberProps } from "antd";

import useRenderCanvas from "./hooks/useRenderCanvas";
import { jsonString1 } from "./assets/data/jsonString";

function App() {
  const [error, setError] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(14);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [jsonString, setJsonString] = useState<string>(jsonString1);
  const { canvas, canvasRef, canvasContainerRef } = useRenderCanvas();

  useEffect(() => {
    if (!canvas) return;
    canvas?.loadFromJSON(jsonString, function () {
      canvas?.renderAll();
    });
  }, [canvas]);

  const handleLoad = () => {
    if (!canvas) return;
    if (!jsonString) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    try {
      JSON.parse(jsonString);
    } catch (error) {
      alert(error);
      return;
    }
    canvas?.loadFromJSON(jsonString, function () {
      canvas?.renderAll();
    });
  };

  const handleChangeFontSize: InputNumberProps["onChange"] = (value) => {
    if (typeof value !== "number") return;
    setFontSize(value);
  };

  const handleChangeBgColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBgColor(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        minWidth: "1440px",
      }}>
      <div
        ref={canvasContainerRef}
        style={{
          height: "100%",
          position: "relative",
          flex: 1,
          flexShrink: 0,
        }}>
        <canvas
          ref={canvasRef}
          style={{
            top: 0,
            left: 0,
            position: "fixed",
            backgroundColor: bgColor,
          }}
        />
      </div>
      <div
        style={{
          width: 460,
          padding: 10,
          gap: "12px",
          height: "100%",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f9f9f9",
          border: "0.5px solid #e9e9e9",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        }}>
        <div style={{ fontSize: 12 }}>
          <a href="https://codebeautify.org/jsonviewer" target="_blank">
            <span>JSON 문법 검사하러가기 </span>
            <span style={{ textDecoration: "underline" }}>
              {" "}
              {"🔗 https://codebeautify.org/jsonviewer"}
            </span>
          </a>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            gap: "8px",
          }}>
          <Button
            type="primary"
            style={{ background: "#9e9e9e", fontSize: 14 }}
            size="large"
            onClick={() => canvas?.clear()}>
            Clear CANVAS
          </Button>
          <Button
            type="primary"
            style={{ background: "#9e9e9e", fontSize: 14 }}
            size="large"
            onClick={() => setJsonString("")}>
            Clear JSON
          </Button>
          <Button
            type="primary"
            size="large"
            style={{
              flex: 1,
              fontSize: 16,
              background: error ? "#f44336" : "#1f77ff",
            }}
            onClick={handleLoad}>
            {error ? "Wrong JSON!" : "Load from JSON"}
          </Button>
        </div>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <span style={{ fontSize: 14 }}>Font Size: </span>
          <InputNumber
            min={6}
            max={30}
            defaultValue={fontSize ?? 14}
            onChange={handleChangeFontSize}
          />
          <span style={{ fontSize: 14, marginRight: 10 }}>px</span>

          <hr />

          <span style={{ fontSize: 14, marginLeft: 10 }}>Canvas BgColor: </span>
          <input
            type="color"
            style={{ width: 50 }}
            value={bgColor}
            onChange={handleChangeBgColor}
          />
        </div>

        <textarea
          value={jsonString}
          placeholder="Paste JSON string here......"
          onChange={(e) => setJsonString(e.target.value)}
          style={{
            flex: 1,
            padding: 10,
            width: "100%",
            borderRadius: 4,
            fontSize: fontSize ?? 16,
            resize: "none",
            overflow: "auto",
            border: "1px solid #e9e9e9",
          }}
        />
      </div>
    </div>
  );
}

export default App;
