import { code } from "@streamdown/code";
import { Streamdown } from "streamdown";

interface Props {
  children: string;
  mode?: "static" | "streaming";
  isAnimating?: boolean;
}

function Markdown({ children, mode = "static", isAnimating }: Props) {
  return (
    <Streamdown
      mode={mode}
      isAnimating={isAnimating}
      plugins={{ code }}
      shikiTheme={["github-light", "github-dark"]}
      className="max-w-none text-sm leading-relaxed wrap-break-word"
    >
      {children}
    </Streamdown>
  );
}

export default Markdown;
