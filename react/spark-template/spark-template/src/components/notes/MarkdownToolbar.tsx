import type { RefObject } from "react"
import {
    Bold,
    Braces,
    ChevronDown,
    Code2,
    Heading,
    Image as ImageIcon,
    Italic,
    Link,
    List,
    ListChecks,
    ListOrdered,
    Minus,
    Quote,
    Redo2,
    Strikethrough,
    Table2,
    Undo2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type ToolbarProps = {
    textareaRef: RefObject<HTMLTextAreaElement | null>
    value: string
    onChange: (value: string) => void
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}

type InlineFormat = { before: string; after: string; placeholder: string }

export function MarkdownToolbar({ textareaRef, value, onChange, canUndo, canRedo, onUndo, onRedo }: ToolbarProps) {
    const replaceSelection = (replacement: string, selectionStart: number, selectionEnd: number) => {
        const next = value.slice(0, selectionStart) + replacement + value.slice(selectionEnd)
        onChange(next)
        requestAnimationFrame(() => {
            textareaRef.current?.focus()
            textareaRef.current?.setSelectionRange(selectionStart, selectionStart + replacement.length)
        })
    }

    const inline = ({ before, after, placeholder }: InlineFormat) => {
        const textarea = textareaRef.current
        if (!textarea) return
        const { selectionStart, selectionEnd } = textarea
        const selected = value.slice(selectionStart, selectionEnd) || placeholder
        const replacement = `${before}${selected}${after}`
        replaceSelection(replacement, selectionStart, selectionEnd)
        requestAnimationFrame(() => {
            const start = selectionStart + before.length
            textareaRef.current?.setSelectionRange(start, start + selected.length)
        })
    }

    const prefixLines = (prefix: string | ((index: number) => string)) => {
        const textarea = textareaRef.current
        if (!textarea) return
        const start = value.lastIndexOf("\n", textarea.selectionStart - 1) + 1
        const nextLine = value.indexOf("\n", textarea.selectionEnd)
        const end = nextLine === -1 ? value.length : nextLine
        const replacement = value.slice(start, end)
            .split("\n")
            .map((line, index) => `${typeof prefix === "function" ? prefix(index) : prefix}${line}`)
            .join("\n")
        replaceSelection(replacement, start, end)
    }

    const setHeading = (level: 0 | 1 | 2 | 3) => {
        const textarea = textareaRef.current
        if (!textarea) return
        const start = value.lastIndexOf("\n", textarea.selectionStart - 1) + 1
        const nextLine = value.indexOf("\n", textarea.selectionEnd)
        const end = nextLine === -1 ? value.length : nextLine
        const marker = level ? `${"#".repeat(level)} ` : ""
        const replacement = value.slice(start, end)
            .split("\n")
            .map((line) => marker + line.replace(/^#{1,6}\s+/, ""))
            .join("\n")
        replaceSelection(replacement, start, end)
    }

    const block = (before: string, after: string, placeholder: string) => {
        const textarea = textareaRef.current
        if (!textarea) return
        const selected = value.slice(textarea.selectionStart, textarea.selectionEnd) || placeholder
        const leftBreak = textarea.selectionStart > 0 && value[textarea.selectionStart - 1] !== "\n" ? "\n" : ""
        const rightBreak = textarea.selectionEnd < value.length && value[textarea.selectionEnd] !== "\n" ? "\n" : ""
        replaceSelection(`${leftBreak}${before}${selected}${after}${rightBreak}`, textarea.selectionStart, textarea.selectionEnd)
    }

    const tools = [
        { label: "粗体", shortcut: "Ctrl+B", icon: Bold, action: () => inline({ before: "**", after: "**", placeholder: "粗体文字" }) },
        { label: "斜体", shortcut: "Ctrl+I", icon: Italic, action: () => inline({ before: "*", after: "*", placeholder: "斜体文字" }) },
        { label: "删除线", shortcut: "Ctrl+Shift+X", icon: Strikethrough, action: () => inline({ before: "~~", after: "~~", placeholder: "删除文字" }) },
        { label: "引用", icon: Quote, divider: true, action: () => prefixLines("> ") },
        { label: "无序列表", icon: List, action: () => prefixLines("- ") },
        { label: "有序列表", icon: ListOrdered, action: () => prefixLines((index) => `${index + 1}. `) },
        { label: "任务列表", icon: ListChecks, action: () => prefixLines("- [ ] ") },
        { label: "行内代码", icon: Code2, divider: true, action: () => inline({ before: "`", after: "`", placeholder: "code" }) },
        { label: "代码块", icon: Braces, action: () => block("```\n", "\n```", "代码") },
        { label: "链接", shortcut: "Ctrl+K", icon: Link, divider: true, action: () => inline({ before: "[", after: "](https://)", placeholder: "链接文字" }) },
        { label: "图片", icon: ImageIcon, action: () => inline({ before: "![", after: "](https://example.com/image.jpg)", placeholder: "图片说明" }) },
        { label: "表格", icon: Table2, action: () => block("", "", "| 列 1 | 列 2 | 列 3 |\n| --- | --- | --- |\n| 内容 | 内容 | 内容 |") },
        { label: "分隔线", icon: Minus, action: () => block("\n---\n", "", "") },
    ]

    return (
        <div className="flex min-h-11 items-center gap-0.5 overflow-x-auto border-y border-black/8 bg-[#faf8f3] px-3 py-1.5" aria-label="Markdown 快捷工具栏">
            <span className="mr-2 shrink-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Markdown</span>
            <Separator orientation="vertical" className="mr-1 h-5" />
            <Tooltip>
                <TooltipTrigger asChild><Button type="button" variant="ghost" size="icon" className="size-8 shrink-0 text-muted-foreground hover:bg-[#e8ece7] hover:text-[#274d3d]" aria-label="撤销" disabled={!canUndo} onClick={onUndo}><Undo2 className="size-4" /></Button></TooltipTrigger>
                <TooltipContent>撤销 · Ctrl+Z</TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild><Button type="button" variant="ghost" size="icon" className="size-8 shrink-0 text-muted-foreground hover:bg-[#e8ece7] hover:text-[#274d3d]" aria-label="重做" disabled={!canRedo} onClick={onRedo}><Redo2 className="size-4" /></Button></TooltipTrigger>
                <TooltipContent>重做 · Ctrl+Shift+Z / Ctrl+Y</TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="mx-1 h-5" />
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button type="button" variant="ghost" className="h-8 shrink-0 gap-1 px-2 text-xs text-muted-foreground hover:bg-[#e8ece7] hover:text-[#274d3d]" aria-label="标题级别">
                                <Heading className="size-4" /><ChevronDown className="size-3" />
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>标题级别</TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>段落格式</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setHeading(1)}><span className="text-base font-bold">一级标题</span><DropdownMenuShortcut>Ctrl+Alt+1</DropdownMenuShortcut></DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setHeading(2)}><span className="font-bold">二级标题</span><DropdownMenuShortcut>Ctrl+Alt+2</DropdownMenuShortcut></DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setHeading(3)}><span className="text-xs font-bold">三级标题</span><DropdownMenuShortcut>Ctrl+Alt+3</DropdownMenuShortcut></DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setHeading(0)}>正文</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {tools.map(({ label, shortcut, icon: Icon, action, divider }) => (
                <div className="contents" key={label}>
                    {divider ? <Separator orientation="vertical" className="mx-1 h-5" /> : null}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button type="button" variant="ghost" size="icon" className="size-8 shrink-0 text-muted-foreground hover:bg-[#e8ece7] hover:text-[#274d3d]" aria-label={label} onClick={action}>
                                <Icon className="size-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{label}{shortcut ? ` · ${shortcut}` : ""}</TooltipContent>
                    </Tooltip>
                </div>
            ))}
        </div>
    )
}
