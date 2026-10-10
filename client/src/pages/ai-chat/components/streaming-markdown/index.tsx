import { useEffect, useRef, useState, type RefObject } from "react";

import Markdown from "@/components/markdown";

interface Props {
  sourceRef: RefObject<string>;
}

function StreamingMarkdown({ sourceRef }: Props) {
  const [text, setText] = useState("");
  const lastLengthRef = useRef(0);

  useEffect(() => {
    let rafId = 0;
    const flush = () => {
      const latest = sourceRef.current ?? "";
      if (latest.length !== lastLengthRef.current) {
        lastLengthRef.current = latest.length;
        setText(latest);
      }
      rafId = requestAnimationFrame(flush);
    };
    rafId = requestAnimationFrame(flush);
    return () => cancelAnimationFrame(rafId);
  }, [sourceRef]);

  return (
    <Markdown mode="streaming" isAnimating>
      {text}
    </Markdown>
  );
}

export default StreamingMarkdown;
