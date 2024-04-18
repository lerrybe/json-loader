import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

export default function useRenderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (!canvasContainerRef?.current || !canvasRef?.current) return;

    const canvasContainer = canvasContainerRef.current;

    /** @description 캔버스 생성 */
    const initialCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasContainer.offsetWidth,
      height: canvasContainer.offsetHeight,
    });
    setCanvas(initialCanvas);

    /** @description 화면 크기에 따라 리사이즈 */
    const handleResize = () => {
      initialCanvas.setDimensions({
        width: canvasContainer.offsetWidth,
        height: canvasContainer.offsetHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    /** @description 캔버스 정리 및 이벤트 제거 */
    return () => {
      initialCanvas.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [setCanvas]);

  return { canvas, canvasRef, canvasContainerRef };
}
