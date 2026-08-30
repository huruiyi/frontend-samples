import { ListTree } from "lucide-react"

export type MarkdownHeading = { id: string; level: number; text: string; line: number }

export const extractHeadings = (content: string): MarkdownHeading[] => content
    .split("\n")
    .map((line, index) => {
        const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line)
        return match ? { id: `heading-${index}`, level: match[1].length, text: match[2].replace(/[*_`]/g, ""), line: index } : null
    })
    .filter((heading): heading is MarkdownHeading => heading !== null)

export function MarkdownOutline({ headings, onSelect }: { headings: MarkdownHeading[]; onSelect: (heading: MarkdownHeading) => void }) {
    return (
        <aside className="hidden h-full w-48 shrink-0 border-l border-black/8 bg-[#fbfaf6] xl:flex xl:flex-col">
            <div className="flex h-11 items-center gap-2 border-b border-black/8 px-4 text-xs font-semibold text-muted-foreground">
                <ListTree className="size-3.5" />文档大纲
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3" aria-label="Markdown 标题大纲">
                {headings.length ? headings.map((heading) => (
                    <button
                        key={heading.id}
                        type="button"
                        className="block w-full truncate rounded-md py-1.5 pr-2 text-left text-xs text-muted-foreground transition hover:bg-black/5 hover:text-foreground"
                        style={{ paddingLeft: `${8 + Math.min(heading.level - 1, 3) * 12}px` }}
                        title={heading.text}
                        onClick={() => onSelect(heading)}
                    >
                        {heading.text}
                    </button>
                )) : <p className="px-2 py-3 text-xs leading-5 text-muted-foreground">使用 # 标题后，大纲会自动生成。</p>}
            </nav>
        </aside>
    )
}
