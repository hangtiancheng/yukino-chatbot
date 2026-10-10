import type { Message, Session, ModelType } from "@/types";
import { atom } from "jotai";

export const sessionsAtom = atom<{
  [sessionId: string]: Session;
}>({});

export const currentSessionIdAtom = atom<string | null>(null);

export const tempSessionAtom = atom<boolean>(false);

export const currentMessagesAtom = atom<Message[]>([]);

export const selectedModelAtom = atom<ModelType>("openai");

export const isStreamingAtom = atom<boolean>(false);

export const loadingAtom = atom<boolean>(false);
