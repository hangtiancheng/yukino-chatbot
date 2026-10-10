import type { Message } from "@/types";
import { Sparkles, User } from "lucide-react";
import { memo, type RefObject } from "react";
import { useTranslation } from "react-i18next";

import Markdown from "@/components/markdown";
import { cn } from "@/lib/utils";
import StreamingMarkdown from "../streaming-markdown";

interface Props {
  message: Message;
  streamRef: RefObject<string>;
}

const MessageItem = memo(function MessageItem({ message, streamRef }: Props) {
  const { t } = useTranslation();
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-4", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary" : "bg-primary/10",
        )}
      >
        {isUser ? (
          <User className="text-primary-foreground size-5" />
        ) : (
          <Sparkles className="text-primary size-5" />
        )}
      </div>

      <div className={cn("flex-1", isUser && "text-right")}>
        <div className="mb-1 flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium",
              isUser ? "text-primary ml-auto" : "text-foreground",
            )}
          >
            {isUser ? t("chat.you") : t("chat.ai")}
          </span>

          {message.status === "thinking" && (
            <span className="text-primary text-xs">{t("chat.thinking")}</span>
          )}
        </div>
        <div
          className={cn(
            "inline-block max-w-full rounded-2xl px-4 py-3 wrap-break-word",
            isUser
              ? "bg-primary text-primary-foreground text-left"
              : "bg-muted text-foreground",
          )}
        >
          {message.status === "thinking" ? (
            <div className="flex items-center gap-1.5 py-1">
              <span className="bg-muted-foreground/40 size-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
              <span className="bg-muted-foreground/40 size-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
              <span className="bg-muted-foreground/20 size-2 animate-bounce rounded-full" />
            </div>
          ) : message.status === "streaming" ? (
            <StreamingMarkdown sourceRef={streamRef} />
          ) : (
            <Markdown>{message.content}</Markdown>
          )}
        </div>
      </div>
    </div>
  );
});

export default MessageItem;
