export type MarkdownLanguage = {
    id: string
    label: string
    aliases: string[]
}

export type MarkdownLanguageCompletion = {
    query: string
    start: number
    end: number
    suggestions: MarkdownLanguage[]
}

export const markdownLanguages: MarkdownLanguage[] = [
    { id: "java", label: "Java", aliases: [] },
    { id: "javascript", label: "JavaScript", aliases: ["js"] },
    { id: "json", label: "JSON", aliases: [] },
    { id: "jsx", label: "JSX", aliases: [] },
    { id: "julia", label: "Julia", aliases: ["jl"] },
    { id: "typescript", label: "TypeScript", aliases: ["ts"] },
    { id: "tsx", label: "TSX", aliases: [] },
    { id: "python", label: "Python", aliases: ["py"] },
    { id: "html", label: "HTML", aliases: ["xml"] },
    { id: "css", label: "CSS", aliases: [] },
    { id: "sql", label: "SQL", aliases: [] },
    { id: "bash", label: "Bash", aliases: ["shell", "sh"] },
    { id: "c", label: "C", aliases: [] },
    { id: "cpp", label: "C++", aliases: ["c++"] },
    { id: "csharp", label: "C#", aliases: ["cs", "c#"] },
    { id: "go", label: "Go", aliases: ["golang"] },
    { id: "rust", label: "Rust", aliases: ["rs"] },
    { id: "kotlin", label: "Kotlin", aliases: ["kt"] },
    { id: "yaml", label: "YAML", aliases: ["yml"] },
    { id: "markdown", label: "Markdown", aliases: ["md"] },
    { id: "plaintext", label: "纯文本", aliases: ["text", "txt"] },
]

const matchesQuery = (language: MarkdownLanguage, query: string) => {
    const fields = [language.id, language.label, ...language.aliases].map((value) => value.toLowerCase())
    return fields.some((value) => value.startsWith(query))
}

export function getMarkdownLanguageCompletion(value: string, selectionStart: number, selectionEnd: number): MarkdownLanguageCompletion | null {
    if (selectionStart !== selectionEnd) return null

    const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1
    const beforeCursor = value.slice(lineStart, selectionStart)
    const match = /^(\s*)```([\w+#.-]+)$/.exec(beforeCursor)
    if (!match) return null

    const query = match[2].toLowerCase()
    const suggestions = markdownLanguages.filter((language) => matchesQuery(language, query)).slice(0, 7)
    if (!suggestions.length) return null

    return {
        query,
        start: selectionStart - match[2].length,
        end: selectionStart,
        suggestions,
    }
}

export function applyMarkdownLanguage(value: string, completion: MarkdownLanguageCompletion, language: MarkdownLanguage) {
    return {
        value: value.slice(0, completion.start) + language.id + value.slice(completion.end),
        caret: completion.start + language.id.length,
    }
}
