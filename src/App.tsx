import { useEffect, useState } from "react";
import type { InputNumberProps } from "antd";
import { Button, InputNumber, Drawer, Space } from "antd";

import useRenderCanvas from "./hooks/useRenderCanvas";
import { jsonString1 } from "./assets/data/jsonString";

function App() {
  const [error, setError] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(14);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [jsonString, setJsonString] = useState<string>(jsonString1);
  const { canvas, canvasRef, canvasContainerRef } = useRenderCanvas();

  useEffect(() => {
    if (!canvas) return;
    canvas.loadFromJSON(jsonString, () => {
      canvas.renderAll();
    });
  }, [canvas]);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLoad = () => {
    if (!canvas) return;
    if (!jsonString) {
      setError(true);
      setErrorMessage("JSON string is empty!");

      setTimeout(() => setError(false), 2000);
      return;
    }
    try {
      JSON.parse(jsonString);
      setError(false);
      setErrorMessage("");
      canvas.loadFromJSON(jsonString, () => {
        canvas.renderAll();
      });
    } catch (error) {
      setError(true);
      setErrorMessage(String(error));
      return;
    }
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
        border: "none",
      }}>
      <div
        ref={canvasContainerRef}
        style={{
          height: "100%",
          position: "relative",
          flex: 1,
          flexShrink: 0,
          backgroundColor: bgColor,
          border: "none",
        }}>
        <Button
          type="primary"
          size="large"
          onClick={handleOpenDrawer}
          style={{
            zIndex: 1,
            top: 16,
            right: 16,
            fontSize: 14,
            position: "fixed",
          }}>
          JSON 입력하기
        </Button>
        <canvas
          ref={canvasRef}
          style={{
            top: 0,
            left: 0,
            position: "fixed",
            border: "none",
          }}
        />
      </div>

      <Drawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        size="large"
        style={{ background: "#f9f9f9" }}
        extra={
          <Space>
            <Button onClick={handleCloseDrawer}>Close</Button>
          </Space>
        }>
        <div
          style={{
            width: "100%",
            gap: "12px",
            height: "100%",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
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
                background: "#1f77ff",
              }}
              onClick={handleLoad}>
              {"Load from JSON"}
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

            <span style={{ fontSize: 14, marginLeft: 10 }}>
              Canvas BgColor:{" "}
            </span>
            <input
              type="color"
              style={{ width: 50 }}
              value={bgColor}
              onChange={handleChangeBgColor}
            />
          </div>

          <div
            style={{
              width: "100%",
              height: "60px",
              maxHeight: "60px",
              color: error ? "#f44336" : "#1f77ff",
              fontSize: 13,
              fontWeight: "bold",
              padding: 14,
              marginTop: 10,
              borderRadius: 4,
              overflow: "auto",
              backgroundColor: error ? "#ffebee" : "#e9e9e9",
            }}>
            {error && `[ERROR] ${errorMessage}`}
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
      </Drawer>
    </div>
  );
}

export default App;
