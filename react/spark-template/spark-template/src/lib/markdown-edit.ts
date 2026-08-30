export type MarkdownEditResult = {
    value: string
    selectionStart: number
    selectionEnd: number
}

export function wrapMarkdownSelection(value: string, selectionStart: number, selectionEnd: number, before: string, after: string, placeholder: string): MarkdownEditResult {
    const selected = value.slice(selectionStart, selectionEnd) || placeholder
    const replacement = `${before}${selected}${after}`
    return {
        value: value.slice(0, selectionStart) + replacement + value.slice(selectionEnd),
        selectionStart: selectionStart + before.length,
        selectionEnd: selectionStart + before.length + selected.length,
    }
}

export function setMarkdownHeading(value: string, selectionStart: number, selectionEnd: number, level: 1 | 2 | 3): MarkdownEditResult {
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1
    const nextBreak = value.indexOf("\n", selectionEnd)
    const lineEnd = nextBreak === -1 ? value.length : nextBreak
    const marker = `${"#".repeat(level)} `
    const replacement = value.slice(lineStart, lineEnd)
        .split("\n")
        .map((line) => marker + line.replace(/^#{1,6}\s+/, ""))
        .join("\n")
    return {
        value: value.slice(0, lineStart) + replacement + value.slice(lineEnd),
        selectionStart: lineStart,
        selectionEnd: lineStart + replacement.length,
    }
}

export function indentMarkdownLines(value: string, selectionStart: number, selectionEnd: number, outdent = false): MarkdownEditResult {
    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1
    const nextBreak = value.indexOf("\n", selectionEnd)
    const lineEnd = nextBreak === -1 ? value.length : nextBreak
    const lines = value.slice(lineStart, lineEnd).split("\n")

    if (!outdent) {
        const replacement = lines.map((line) => `  ${line}`).join("\n")
        return {
            value: value.slice(0, lineStart) + replacement + value.slice(lineEnd),
            selectionStart: selectionStart + 2,
            selectionEnd: selectionEnd + lines.length * 2,
        }
    }

    const removed = lines.map((line) => line.startsWith("\t") ? 1 : Math.min(2, line.match(/^ */)?.[0].length ?? 0))
    const replacement = lines.map((line, index) => line.slice(removed[index])).join("\n")
    const removedBeforeStart = removed[0]
    const removedBeforeEnd = removed.reduce((total, count) => total + count, 0)
    return {
        value: value.slice(0, lineStart) + replacement + value.slice(lineEnd),
        selectionStart: Math.max(lineStart, selectionStart - removedBeforeStart),
        selectionEnd: Math.max(lineStart, selectionEnd - removedBeforeEnd),
    }
}

export function toggleMarkdownTask(value: string, taskIndex: number, checked: boolean) {
    let currentTask = 0
    let inFence = false
    return value.split("\n").map((line) => {
        if (/^\s*(?:```|~~~)/.test(line)) {
            inFence = !inFence
            return line
        }
        if (inFence) return line

        const task = /^(\s*[-+*]\s+\[)([ xX])(\]\s+)/.exec(line)
        if (!task) return line
        if (currentTask++ !== taskIndex) return line
        return line.slice(0, task.index) + task[1] + (checked ? "x" : " ") + task[3] + line.slice(task[0].length)
    }).join("\n")
}
