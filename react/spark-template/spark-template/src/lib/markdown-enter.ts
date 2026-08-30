export type MarkdownEnterResult = { value: string; caret: number }

const fencePattern = /^\s*```/

export function completeMarkdownEnter(value: string, selectionStart: number, selectionEnd: number): MarkdownEnterResult | null {
    if (selectionStart !== selectionEnd) return null

    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1
    const nextBreak = value.indexOf("\n", selectionStart)
    const lineEnd = nextBreak === -1 ? value.length : nextBreak
    const beforeCursor = value.slice(lineStart, selectionStart)
    const currentLine = value.slice(lineStart, lineEnd)
    const linesBeforeCurrent = value.slice(0, lineStart).split("\n")
    const openFenceCount = linesBeforeCurrent.filter((line) => fencePattern.test(line)).length

    const openingFence = /^(\s*)```[\w+-]*\s*$/.exec(currentLine)
    if (openingFence && openFenceCount % 2 === 0) {
        const indent = openingFence[1]
        const insertion = `\n${indent}\n${indent}\`\`\``
        return {
            value: value.slice(0, selectionStart) + insertion + value.slice(selectionEnd),
            caret: selectionStart + indent.length + 1,
        }
    }

    // Markdown markers inside fenced code blocks are code, not list syntax.
    if (openFenceCount % 2 === 1) return null

    const task = /^(\s*)([-+*])\s+\[([ xX])\]\s*(.*)$/.exec(beforeCursor)
    const ordered = /^(\s*)(\d+)([.)])\s+(.*)$/.exec(beforeCursor)
    const unordered = /^(\s*)([-+*])\s+(.*)$/.exec(beforeCursor)
    const quote = /^(\s*(?:>\s*)+)(.*)$/.exec(beforeCursor)

    const match = task ?? ordered ?? unordered ?? quote
    if (!match) return null

    let indent = ""
    let body = ""
    let prefix = ""

    if (task) {
        indent = task[1]
        body = task[4]
        prefix = `${indent}${task[2]} [ ] `
    } else if (ordered) {
        indent = ordered[1]
        body = ordered[4]
        prefix = `${indent}${Number(ordered[2]) + 1}${ordered[3]} `
    } else if (unordered) {
        indent = unordered[1]
        body = unordered[3]
        prefix = `${indent}${unordered[2]} `
    } else if (quote) {
        indent = quote[1].match(/^\s*/)?.[0] ?? ""
        body = quote[2]
        prefix = quote[1]
    }

    if (!body.trim() && selectionStart === lineEnd) {
        const replacement = indent
        return {
            value: value.slice(0, lineStart) + replacement + value.slice(lineEnd),
            caret: lineStart + replacement.length,
        }
    }

    const insertion = `\n${prefix}`
    return {
        value: value.slice(0, selectionStart) + insertion + value.slice(selectionEnd),
        caret: selectionStart + insertion.length,
    }
}
