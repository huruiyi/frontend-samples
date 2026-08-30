import hljs from "highlight.js/lib/core"
import bash from "highlight.js/lib/languages/bash"
import c from "highlight.js/lib/languages/c"
import cpp from "highlight.js/lib/languages/cpp"
import csharp from "highlight.js/lib/languages/csharp"
import css from "highlight.js/lib/languages/css"
import go from "highlight.js/lib/languages/go"
import java from "highlight.js/lib/languages/java"
import javascript from "highlight.js/lib/languages/javascript"
import json from "highlight.js/lib/languages/json"
import kotlin from "highlight.js/lib/languages/kotlin"
import markdown from "highlight.js/lib/languages/markdown"
import python from "highlight.js/lib/languages/python"
import rust from "highlight.js/lib/languages/rust"
import sql from "highlight.js/lib/languages/sql"
import typescript from "highlight.js/lib/languages/typescript"
import xml from "highlight.js/lib/languages/xml"
import yaml from "highlight.js/lib/languages/yaml"

const languages = {
    bash,
    c,
    cpp,
    csharp,
    css,
    go,
    java,
    javascript,
    json,
    kotlin,
    markdown,
    python,
    rust,
    sql,
    typescript,
    xml,
    yaml,
}

Object.entries(languages).forEach(([name, definition]) => hljs.registerLanguage(name, definition))

const aliases: Record<string, string> = {
    c: "c",
    "c++": "cpp",
    cpp: "cpp",
    cs: "csharp",
    "c#": "csharp",
    csharp: "csharp",
    html: "xml",
    java: "java",
    javascript: "javascript",
    js: "javascript",
    json: "json",
    jsx: "javascript",
    kotlin: "kotlin",
    kt: "kotlin",
    md: "markdown",
    py: "python",
    shell: "bash",
    sh: "bash",
    ts: "typescript",
    tsx: "typescript",
    txt: "plaintext",
    text: "plaintext",
    yml: "yaml",
}

export function highlightMarkdownCode(document: Document) {
    document.querySelectorAll<HTMLElement>("pre code").forEach((element) => {
        const pre = element.parentElement
        const classLanguage = [...element.classList].find((name) => name.startsWith("language-"))?.slice(9).toLowerCase()
        const language = classLanguage ? aliases[classLanguage] ?? classLanguage : undefined
        const source = element.textContent ?? ""

        if (language === "plaintext") {
            element.classList.add("hljs")
            pre?.setAttribute("data-language", "TEXT")
        } else {
            try {
                const result = language && hljs.getLanguage(language)
                    ? hljs.highlight(source, { language, ignoreIllegals: true })
                    : hljs.highlightAuto(source)
                element.innerHTML = result.value
                element.classList.add("hljs")
                const displayLanguage = classLanguage ?? result.language
                if (displayLanguage) pre?.setAttribute("data-language", displayLanguage.toUpperCase())
            } catch {
                element.classList.add("hljs")
            }
        }

        if (pre) {
            const copyButton = document.createElement("button")
            copyButton.type = "button"
            copyButton.className = "copy-code-button"
            copyButton.setAttribute("data-copy-code", "")
            copyButton.setAttribute("aria-label", "复制代码")
            copyButton.textContent = "复制"
            pre.append(copyButton)
        }
    })
}
