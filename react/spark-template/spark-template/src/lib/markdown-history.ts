export type MarkdownHistory = {
    past: string[]
    future: string[]
    lastMode: "typing" | "command" | null
    lastChangeAt: number
}

export type MarkdownHistoryStep = {
    history: MarkdownHistory
    content: string
}

const MAX_HISTORY_ENTRIES = 100
const TYPING_GROUP_DELAY = 700

export const createMarkdownHistory = (): MarkdownHistory => ({
    past: [],
    future: [],
    lastMode: null,
    lastChangeAt: 0,
})

export function recordMarkdownHistory(history: MarkdownHistory, currentContent: string, mode: "typing" | "command", now = Date.now()): MarkdownHistory {
    const mergeTyping = mode === "typing" && history.lastMode === "typing" && now - history.lastChangeAt <= TYPING_GROUP_DELAY
    const past = mergeTyping ? history.past : [...history.past, currentContent].slice(-MAX_HISTORY_ENTRIES)
    return { past, future: [], lastMode: mode, lastChangeAt: now }
}

export function undoMarkdownHistory(history: MarkdownHistory, currentContent: string): MarkdownHistoryStep | null {
    if (!history.past.length) return null
    const past = [...history.past]
    const content = past.pop() as string
    return {
        content,
        history: { past, future: [...history.future, currentContent], lastMode: null, lastChangeAt: 0 },
    }
}

export function redoMarkdownHistory(history: MarkdownHistory, currentContent: string): MarkdownHistoryStep | null {
    if (!history.future.length) return null
    const future = [...history.future]
    const content = future.pop() as string
    return {
        content,
        history: { past: [...history.past, currentContent].slice(-MAX_HISTORY_ENTRIES), future, lastMode: null, lastChangeAt: 0 },
    }
}
