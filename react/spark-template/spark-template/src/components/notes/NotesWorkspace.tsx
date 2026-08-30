import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import DOMPurify from "dompurify"
import {
    BookOpenText,
    Check,
    Cloud,
    Code2,
    Eye,
    FilePlus2,
    KeyRound,
    LoaderCircle,
    LockKeyhole,
    LogOut,
    Maximize2,
    Minimize2,
    PanelLeft,
    PencilLine,
    RefreshCw,
    Search,
    Settings2,
    ShieldCheck,
    Trash2,
} from "lucide-react"
import { marked } from "marked"
import { toast } from "sonner"

import { MarkdownOutline, extractHeadings, type MarkdownHeading } from "@/components/notes/MarkdownOutline"
import { MarkdownToolbar } from "@/components/notes/MarkdownToolbar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/sonner"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { vaultApi } from "@/lib/api"
import { createVaultMaterial, decryptNote, encryptNote, unlockVaultMaterial } from "@/lib/crypto"
import { indentMarkdownLines, setMarkdownHeading, toggleMarkdownTask, wrapMarkdownSelection, type MarkdownEditResult } from "@/lib/markdown-edit"
import { completeMarkdownEnter } from "@/lib/markdown-enter"
import { createMarkdownHistory, recordMarkdownHistory, redoMarkdownHistory, undoMarkdownHistory, type MarkdownHistory } from "@/lib/markdown-history"
import { highlightMarkdownCode } from "@/lib/markdown-highlight"
import { applyMarkdownLanguage, getMarkdownLanguageCompletion, type MarkdownLanguage, type MarkdownLanguageCompletion } from "@/lib/markdown-languages"
import { LEGACY_VAULT_ID_STORAGE_KEY, VAULT_REGISTRY_STORAGE_KEY, parseVaultRegistry, upsertVaultRegistry, type VaultRegistryEntry } from "@/lib/vault-registry"

const ADD_EXISTING_VAULT_VALUE = "__add_existing_vault__"
const welcomeContent = `# 你的想法，只属于你

Whisper Notes 会在浏览器中使用你的 **加密密码** 派生密钥。标题和 Markdown 正文加密后才发送到服务端。

## 为什么是端到端加密

- 云端只保存密文
- 每篇笔记使用独立随机 IV
- 加密密码不会离开这台设备

## Markdown 编辑体验

左侧写 Markdown，右侧会实时预览。拖动中间分隔线可以调整宽度，滚动位置也会自动同步。

> 请妥善保管密码：忘记后，任何人都无法恢复笔记。`

type Session = { vaultId: string; vaultName: string; key: CryptoKey; accessToken: string }
type Note = { id: string; title: string; content: string; createdAt: string; updatedAt: string }
type LanguageMenu = { completion: MarkdownLanguageCompletion; activeIndex: number; top: number; left: number }

const friendlyError = (error: unknown) => error instanceof Error ? error.message : "操作失败，请稍后重试"

function VaultGate({ onUnlocked }: { onUnlocked: (session: Session) => void }) {
    const initialVaults = useMemo(() => parseVaultRegistry(
        localStorage.getItem(VAULT_REGISTRY_STORAGE_KEY),
        localStorage.getItem(LEGACY_VAULT_ID_STORAGE_KEY),
    ), [])
    const [vaults, setVaults] = useState<VaultRegistryEntry[]>(initialVaults)
    const [tab, setTab] = useState("unlock")
    const [vaultName, setVaultName] = useState("")
    const [vaultId, setVaultId] = useState(initialVaults[0]?.id ?? "")
    const [addingExisting, setAddingExisting] = useState(!initialVaults.length)
    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [busy, setBusy] = useState(false)
    const [vaultsLoading, setVaultsLoading] = useState(true)
    const [error, setError] = useState("")

    const refreshVaults = useCallback(async () => {
        setVaultsLoading(true)
        setError("")
        try {
            const summaries = await vaultApi.list()
            const cachedVaults = parseVaultRegistry(
                localStorage.getItem(VAULT_REGISTRY_STORAGE_KEY),
                localStorage.getItem(LEGACY_VAULT_ID_STORAGE_KEY),
            )
            const cachedNames = new Map(cachedVaults.map((vault) => [vault.id, vault.name]))
            const next = summaries.map((vault) => ({ id: vault.id, name: cachedNames.get(vault.id) ?? "加密保险库" }))
            setVaults(next)
            if (next.length) {
                setVaultId((current) => next.some((vault) => vault.id === current) ? current : next[0].id)
                setAddingExisting(false)
                setTab("unlock")
            } else {
                setVaultId("")
                setAddingExisting(true)
                setTab("create")
            }
        } catch (caught) {
            setError(`无法从数据库获取保险库列表：${friendlyError(caught)}`)
        } finally {
            setVaultsLoading(false)
        }
    }, [])

    useEffect(() => {
        void refreshVaults()
    }, [refreshVaults])

    const rememberVault = (entry: VaultRegistryEntry) => {
        const persistedVaults = parseVaultRegistry(
            localStorage.getItem(VAULT_REGISTRY_STORAGE_KEY),
            localStorage.getItem(LEGACY_VAULT_ID_STORAGE_KEY),
        )
        const next = upsertVaultRegistry(persistedVaults, entry)
        localStorage.setItem(VAULT_REGISTRY_STORAGE_KEY, JSON.stringify(next))
        localStorage.setItem(LEGACY_VAULT_ID_STORAGE_KEY, entry.id)
        setVaults((current) => upsertVaultRegistry(current, entry))
        setVaultId(entry.id)
        setAddingExisting(false)
    }

    const createVault = async () => {
        const normalizedName = vaultName.trim()
        if (!normalizedName) return setError("请输入保险库名称")
        if (normalizedName.length > 80) return setError("保险库名称不能超过 80 个字符")
        if (password.length < 12) return setError("加密密码至少需要 12 个字符")
        if (password !== confirmation) return setError("两次输入的密码不一致")
        setBusy(true)
        setError("")
        try {
            const material = await createVaultMaterial(password, normalizedName)
            await vaultApi.create(material)
            rememberVault({ id: material.id, name: normalizedName })
            onUnlocked({ vaultId: material.id, vaultName: normalizedName, key: material.key, accessToken: material.accessToken })
        } catch (caught) {
            setError(friendlyError(caught))
        } finally {
            setBusy(false)
        }
    }

    const unlockVault = async () => {
        if (!vaultId || !password) return setError("请输入保险库 ID 和加密密码")
        setBusy(true)
        setError("")
        try {
            const bootstrap = await vaultApi.bootstrap(vaultId.trim())
            const unlocked = await unlockVaultMaterial(password, bootstrap)
            rememberVault({ id: bootstrap.id, name: unlocked.name })
            onUnlocked({ vaultId: bootstrap.id, vaultName: unlocked.name, key: unlocked.key, accessToken: unlocked.accessToken })
        } catch (caught) {
            const message = friendlyError(caught)
            setError(message.includes("decrypt") || message.includes("operation-specific") ? "加密密码不正确" : message)
        } finally {
            setBusy(false)
        }
    }

    return (
        <div className="relative grid min-h-screen place-items-center overflow-hidden bg-[#eeebe4] px-4 py-10">
            <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_20%_20%,rgba(51,92,75,.18),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(167,122,70,.16),transparent_30%)]" />
            <Card className="relative w-full max-w-md border-black/10 bg-[#fffefa]/95 shadow-2xl shadow-black/10">
                <CardHeader className="space-y-4 text-center">
                    <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#335c4b] text-white shadow-lg shadow-emerald-950/20"><BookOpenText className="size-6" /></div>
                    <div><CardTitle className="text-2xl">Whisper Notes</CardTitle><CardDescription className="mt-2">你的端到端加密 Markdown 笔记库</CardDescription></div>
                </CardHeader>
                <CardContent>
                    <Tabs value={tab} onValueChange={(value) => { setTab(value); setError("") }}>
                        <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="create">创建保险库</TabsTrigger><TabsTrigger value="unlock">解锁保险库</TabsTrigger></TabsList>
                        <TabsContent value="create" className="mt-5 space-y-4">
                            <div className="space-y-2"><Label htmlFor="vault-name">保险库名称</Label><Input id="vault-name" value={vaultName} maxLength={80} onChange={(event) => setVaultName(event.target.value)} placeholder="例如：工作笔记、个人知识库" autoFocus /></div>
                            <div className="space-y-2"><Label htmlFor="create-password">设置加密密码</Label><Input id="create-password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="至少 12 个字符" /></div>
                            <div className="space-y-2"><Label htmlFor="confirmation">再次输入</Label><Input id="confirmation" type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} onKeyDown={(event) => event.key === "Enter" && createVault()} /></div>
                            <p className="flex gap-2 text-xs leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-700" />密码只在浏览器内用于派生 AES-256-GCM 密钥，服务端无法读取。忘记密码将无法恢复数据。</p>
                            <Button className="w-full bg-[#335c4b] hover:bg-[#28493c]" disabled={busy} onClick={createVault}>{busy ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : <KeyRound className="mr-2 size-4" />}创建并解锁</Button>
                        </TabsContent>
                        <TabsContent value="unlock" className="mt-5 space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-3"><Label htmlFor="vault-select">选择保险库</Label><Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-[11px] text-muted-foreground" disabled={vaultsLoading} onClick={() => void refreshVaults()}><RefreshCw className={`mr-1 size-3 ${vaultsLoading ? "animate-spin" : ""}`} />刷新数据库列表</Button></div>
                                <Select value={addingExisting ? ADD_EXISTING_VAULT_VALUE : vaultId || ADD_EXISTING_VAULT_VALUE} onValueChange={(value) => {
                                    setError("")
                                    setPassword("")
                                    if (value === ADD_EXISTING_VAULT_VALUE) {
                                        setVaultId("")
                                        setAddingExisting(true)
                                    } else {
                                        setVaultId(value)
                                        setAddingExisting(false)
                                    }
                                }}>
                                    <SelectTrigger id="vault-select" className="h-auto min-h-11 w-full bg-white/70"><SelectValue placeholder="选择一个保险库" /></SelectTrigger>
                                    <SelectContent>
                                        {vaults.length ? <SelectGroup>
                                            <SelectLabel>数据库保险库</SelectLabel>
                                            {vaults.map((vault) => <SelectItem key={vault.id} value={vault.id}><span className="flex min-w-0 flex-1 items-center justify-between gap-3"><span className="truncate font-medium">{vault.name}</span><span className="shrink-0 font-mono text-[10px] text-muted-foreground">{vault.id.slice(0, 8)}</span></span></SelectItem>)}
                                        </SelectGroup> : null}
                                        {vaults.length ? <SelectSeparator /> : null}
                                        <SelectItem value={ADD_EXISTING_VAULT_VALUE}>＋ 添加已有保险库</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {addingExisting ? <div className="space-y-2"><Label htmlFor="vault-id">保险库 ID</Label><Input id="vault-id" value={vaultId} onChange={(event) => setVaultId(event.target.value)} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" /></div> : null}
                            <div className="space-y-2"><Label htmlFor="unlock-password">加密密码</Label><Input id="unlock-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} onKeyDown={(event) => event.key === "Enter" && unlockVault()} /></div>
                            <Button className="w-full bg-[#335c4b] hover:bg-[#28493c]" disabled={busy} onClick={unlockVault}>{busy ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : <LockKeyhole className="mr-2 size-4" />}解锁笔记</Button>
                        </TabsContent>
                    </Tabs>
                    {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
                </CardContent>
            </Card>
        </div>
    )
}

type NotesListProps = {
    loading: boolean
    notes: Note[]
    selectedId: string | null
    search: string
    vaultId: string
    vaultName: string
    onSearch: (value: string) => void
    onSelect: (id: string) => void
}

function NotesList({ loading, notes, selectedId, search, vaultId, vaultName, onSearch, onSelect }: NotesListProps) {
    return (
        <div className="flex h-full min-h-0 flex-col bg-[#f8f6f1]">
            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="border-black/10 bg-white/70 pl-9 shadow-none" value={search} onChange={(event) => onSearch(event.target.value)} placeholder="本地搜索已解密笔记…" />
                </div>
            </div>
            <ScrollArea className="min-h-0 flex-1 px-2">
                <div className="space-y-1 pb-3">
                    {loading ? <div className="flex items-center justify-center py-12 text-sm text-muted-foreground"><LoaderCircle className="mr-2 size-4 animate-spin" />解密中</div> : notes.map((note) => (
                        <button key={note.id} type="button" onClick={() => onSelect(note.id)} className={`w-full rounded-xl p-3 text-left transition ${note.id === selectedId ? "bg-[#e1e8e1] shadow-sm shadow-emerald-950/5" : "hover:bg-black/5"}`}>
                            <div className="flex items-start justify-between gap-2"><span className="truncate text-sm font-semibold">{note.title || "无标题笔记"}</span><span className="shrink-0 text-[11px] text-muted-foreground">{new Date(note.updatedAt).toLocaleDateString("zh-CN", { month: "short", day: "numeric" })}</span></div>
                            <p className="mt-1 truncate text-xs text-muted-foreground">{note.content.replace(/[#>*_`\-[\]]/g, " ")}</p>
                        </button>
                    ))}
                </div>
            </ScrollArea>
            <div className="border-t border-black/10 p-3"><p className="truncate text-xs font-semibold text-[#405b4e]">{vaultName}</p><p className="mt-1 truncate text-[11px] text-muted-foreground" title={vaultId}>{notes.length} 篇笔记 · ID {vaultId.slice(0, 8)} · 云端只保存密文</p></div>
        </div>
    )
}

function NotesApp({ session, onLock, onOpenGallery }: { session: Session; onLock: () => void; onOpenGallery: () => void }) {
    const [notes, setNotes] = useState<Note[]>([])
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [dirtyNoteId, setDirtyNoteId] = useState<string | null>(null)
    const [syncState, setSyncState] = useState<"saved" | "saving" | "error">("saved")
    const [mobileTab, setMobileTab] = useState("edit")
    const [mobileListOpen, setMobileListOpen] = useState(false)
    const [focusMode, setFocusMode] = useState(false)
    const [syncScroll, setSyncScroll] = useState(true)
    const [languageMenu, setLanguageMenu] = useState<LanguageMenu | null>(null)
    const [editingTitle, setEditingTitle] = useState(false)
    const [titleDraft, setTitleDraft] = useState("")
    const editorRef = useRef<HTMLTextAreaElement>(null)
    const titleInputRef = useRef<HTMLInputElement>(null)
    const previewRef = useRef<HTMLDivElement>(null)
    const scrollSource = useRef<"editor" | "preview" | null>(null)
    const contentHistories = useRef(new Map<string, MarkdownHistory>())
    const isMobile = useIsMobile()

    const selected = notes.find((note) => note.id === selectedId) ?? null
    const activeHistory = selectedId ? contentHistories.current.get(selectedId) : undefined
    const canUndo = Boolean(activeHistory?.past.length)
    const canRedo = Boolean(activeHistory?.future.length)
    const visibleNotes = notes.filter((note) => `${note.title}\n${note.content}`.toLowerCase().includes(search.toLowerCase()))
    const headings = useMemo(() => extractHeadings(selected?.content ?? ""), [selected?.content])
    const renderedMarkdown = useMemo(() => {
        const sanitized = DOMPurify.sanitize(marked.parse(selected?.content ?? "") as string)
        const document = new DOMParser().parseFromString(sanitized, "text/html")
        document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((element, index) => {
            const heading = headings[index]
            if (heading) element.id = heading.id
        })
        highlightMarkdownCode(document)
        document.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
            link.target = "_blank"
            link.rel = "noopener noreferrer"
        })
        document.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
            image.loading = "lazy"
            image.referrerPolicy = "no-referrer"
        })
        document.querySelectorAll<HTMLTableElement>("table").forEach((table) => {
            const wrapper = document.createElement("div")
            wrapper.className = "markdown-table-wrap"
            table.replaceWith(wrapper)
            wrapper.append(table)
        })
        document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((checkbox, index) => {
            checkbox.removeAttribute("disabled")
            checkbox.setAttribute("data-task-index", String(index))
            checkbox.setAttribute("aria-label", checkbox.checked ? "标记任务为未完成" : "标记任务为已完成")
        })
        return DOMPurify.sanitize(document.body.innerHTML, {
            ADD_ATTR: ["data-language", "data-copy-code", "data-task-index", "target", "rel", "loading", "referrerpolicy"],
        })
    }, [selected?.content, headings])

    const createNote = async (welcome = false) => {
        const id = crypto.randomUUID()
        const payload = welcome ? { title: "欢迎使用 Whisper Notes", content: welcomeContent } : { title: "无标题笔记", content: "# 无标题笔记\n\n开始记录……" }
        try {
            const encrypted = await encryptNote(session.key, session.vaultId, id, payload)
            const record = await vaultApi.createNote(session.vaultId, session.accessToken, { id, ...encrypted, encryptionVersion: 1 })
            const note = { id, ...payload, createdAt: record.createdAt, updatedAt: record.updatedAt }
            setNotes((current) => [note, ...current])
            setSelectedId(id)
            setMobileTab("edit")
        } catch (error) { toast.error(friendlyError(error)) }
    }

    useEffect(() => {
        let active = true
        const load = async () => {
            setLoading(true)
            try {
                const records = await vaultApi.listNotes(session.vaultId, session.accessToken)
                const decrypted = await Promise.all(records.map(async (record) => ({ id: record.id, ...await decryptNote(session.key, session.vaultId, record.id, record), createdAt: record.createdAt, updatedAt: record.updatedAt })))
                if (!active) return
                setNotes(decrypted)
                setSelectedId(decrypted[0]?.id ?? null)
                if (!decrypted.length) await createNote(true)
            } catch (error) { toast.error(friendlyError(error)) } finally { if (active) setLoading(false) }
        }
        void load()
        return () => { active = false }
    }, [session.vaultId])

    const persistNote = async (note: Note) => {
        setSyncState("saving")
        try {
            const encrypted = await encryptNote(session.key, session.vaultId, note.id, { title: note.title, content: note.content })
            const record = await vaultApi.updateNote(session.vaultId, session.accessToken, note.id, { ...encrypted, encryptionVersion: 1 })
            setNotes((current) => current.map((item) => item.id === note.id ? { ...item, updatedAt: record.updatedAt } : item))
            setSyncState("saved")
            setDirtyNoteId((current) => current === note.id ? null : current)
        } catch (error) { setSyncState("error"); toast.error(friendlyError(error)) }
    }

    useEffect(() => {
        if (!dirtyNoteId) return
        const note = notes.find((item) => item.id === dirtyNoteId)
        if (!note) return
        setSyncState("saving")
        const timer = window.setTimeout(() => void persistNote(note), 900)
        return () => window.clearTimeout(timer)
    }, [dirtyNoteId, selected?.title, selected?.content])

    useEffect(() => {
        if (!focusMode) return
        const exitFocus = (event: KeyboardEvent) => event.key === "Escape" && setFocusMode(false)
        window.addEventListener("keydown", exitFocus)
        return () => window.removeEventListener("keydown", exitFocus)
    }, [focusMode])

    const updateSelected = (patch: Partial<Pick<Note, "title" | "content">>) => {
        if (!selectedId) return
        setNotes((current) => current.map((note) => note.id === selectedId ? { ...note, ...patch } : note))
        setDirtyNoteId(selectedId)
    }

    useEffect(() => {
        setEditingTitle(false)
        setTitleDraft(selected?.title ?? "")
    }, [selectedId])

    useEffect(() => {
        if (!editingTitle) return
        titleInputRef.current?.focus()
        titleInputRef.current?.select()
    }, [editingTitle])

    const beginTitleEdit = () => {
        if (!selected) return
        setTitleDraft(selected.title)
        setEditingTitle(true)
    }

    const commitTitleEdit = () => {
        if (!selected) return
        const title = titleDraft.trim() || "无标题笔记"
        if (title !== selected.title) updateSelected({ title })
        setTitleDraft(title)
        setEditingTitle(false)
    }

    const cancelTitleEdit = () => {
        setTitleDraft(selected?.title ?? "")
        setEditingTitle(false)
    }

    const updateContent = (content: string, mode: "typing" | "command" = "command") => {
        if (!selectedId || !selected || content === selected.content) return
        const history = contentHistories.current.get(selectedId) ?? createMarkdownHistory()
        contentHistories.current.set(selectedId, recordMarkdownHistory(history, selected.content, mode))
        updateSelected({ content })
    }

    const restoreEditorCaret = (content: string) => {
        const caret = Math.min(editorRef.current?.selectionStart ?? content.length, content.length)
        requestAnimationFrame(() => {
            editorRef.current?.focus()
            editorRef.current?.setSelectionRange(caret, caret)
        })
    }

    const undoContent = () => {
        if (!selectedId || !selected) return
        const history = contentHistories.current.get(selectedId) ?? createMarkdownHistory()
        const step = undoMarkdownHistory(history, selected.content)
        if (!step) return
        contentHistories.current.set(selectedId, step.history)
        setLanguageMenu(null)
        updateSelected({ content: step.content })
        restoreEditorCaret(step.content)
    }

    const redoContent = () => {
        if (!selectedId || !selected) return
        const history = contentHistories.current.get(selectedId) ?? createMarkdownHistory()
        const step = redoMarkdownHistory(history, selected.content)
        if (!step) return
        contentHistories.current.set(selectedId, step.history)
        setLanguageMenu(null)
        updateSelected({ content: step.content })
        restoreEditorCaret(step.content)
    }

    const deleteSelected = async () => {
        if (!selected) return
        try {
            await vaultApi.deleteNote(session.vaultId, session.accessToken, selected.id)
            contentHistories.current.delete(selected.id)
            const remaining = notes.filter((note) => note.id !== selected.id)
            setNotes(remaining)
            setSelectedId(remaining[0]?.id ?? null)
            toast.success("笔记已删除")
        } catch (error) { toast.error(friendlyError(error)) }
    }

    const selectNote = (id: string) => {
        setSelectedId(id)
        setMobileListOpen(false)
        setLanguageMenu(null)
    }

    const syncPane = (source: "editor" | "preview") => {
        if (!syncScroll || scrollSource.current && scrollSource.current !== source) return
        const from = source === "editor" ? editorRef.current : previewRef.current
        const to = source === "editor" ? previewRef.current : editorRef.current
        if (!from || !to) return
        const available = from.scrollHeight - from.clientHeight
        const targetAvailable = to.scrollHeight - to.clientHeight
        const ratio = available > 0 ? from.scrollTop / available : 0
        scrollSource.current = source
        to.scrollTop = ratio * Math.max(targetAvailable, 0)
        requestAnimationFrame(() => { scrollSource.current = null })
    }

    const jumpToHeading = (heading: MarkdownHeading) => {
        setMobileTab("preview")
        requestAnimationFrame(() => {
            previewRef.current?.querySelector<HTMLElement>(`#${heading.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
        })
    }

    const refreshLanguageMenu = (textarea: HTMLTextAreaElement) => {
        const completion = getMarkdownLanguageCompletion(textarea.value, textarea.selectionStart, textarea.selectionEnd)
        if (!completion) return setLanguageMenu(null)

        const style = window.getComputedStyle(textarea)
        const lineHeight = Number.parseFloat(style.lineHeight) || 28
        const fontSize = Number.parseFloat(style.fontSize) || 14
        const paddingTop = Number.parseFloat(style.paddingTop) || 0
        const paddingLeft = Number.parseFloat(style.paddingLeft) || 0
        const beforeCursor = textarea.value.slice(0, textarea.selectionStart)
        const lines = beforeCursor.split("\n")
        const column = lines.at(-1)?.length ?? 0
        const desiredTop = textarea.offsetTop + paddingTop + lines.length * lineHeight - textarea.scrollTop + 4
        const maxTop = textarea.offsetTop + textarea.clientHeight - 234
        const top = Math.max(textarea.offsetTop + 8, Math.min(desiredTop, maxTop))
        const desiredLeft = textarea.offsetLeft + paddingLeft + column * fontSize * 0.61 - textarea.scrollLeft
        const left = Math.max(12, Math.min(desiredLeft, textarea.clientWidth - 252))

        setLanguageMenu({ completion, activeIndex: 0, top, left })
    }

    const chooseLanguage = (language: MarkdownLanguage) => {
        if (!languageMenu || !selected) return
        const result = applyMarkdownLanguage(selected.content, languageMenu.completion, language)
        updateContent(result.value)
        setLanguageMenu(null)
        requestAnimationFrame(() => {
            editorRef.current?.focus()
            editorRef.current?.setSelectionRange(result.caret, result.caret)
        })
    }

    const applyEditorEdit = (result: MarkdownEditResult) => {
        updateContent(result.value)
        setLanguageMenu(null)
        requestAnimationFrame(() => {
            editorRef.current?.focus()
            editorRef.current?.setSelectionRange(result.selectionStart, result.selectionEnd)
        })
    }

    const handleEditorKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (languageMenu) {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault()
                const direction = event.key === "ArrowDown" ? 1 : -1
                setLanguageMenu((current) => current ? {
                    ...current,
                    activeIndex: (current.activeIndex + direction + current.completion.suggestions.length) % current.completion.suggestions.length,
                } : null)
                return
            }
            if (event.key === "Enter" || event.key === "Tab") {
                event.preventDefault()
                chooseLanguage(languageMenu.completion.suggestions[languageMenu.activeIndex])
                return
            }
            if (event.key === "Escape") {
                event.preventDefault()
                setLanguageMenu(null)
                return
            }
        }

        if (selected && (event.ctrlKey || event.metaKey)) {
            const key = event.key.toLowerCase()
            if (key === "z" && !event.shiftKey) {
                event.preventDefault()
                undoContent()
                return
            }
            if (key === "y" || key === "z" && event.shiftKey) {
                event.preventDefault()
                redoContent()
                return
            }
            const textarea = event.currentTarget
            let result: MarkdownEditResult | null = null
            if (key === "b" && !event.shiftKey) result = wrapMarkdownSelection(textarea.value, textarea.selectionStart, textarea.selectionEnd, "**", "**", "粗体文字")
            if (key === "i" && !event.shiftKey) result = wrapMarkdownSelection(textarea.value, textarea.selectionStart, textarea.selectionEnd, "*", "*", "斜体文字")
            if (key === "k" && !event.shiftKey) result = wrapMarkdownSelection(textarea.value, textarea.selectionStart, textarea.selectionEnd, "[", "](https://)", "链接文字")
            if (key === "x" && event.shiftKey) result = wrapMarkdownSelection(textarea.value, textarea.selectionStart, textarea.selectionEnd, "~~", "~~", "删除文字")
            if (event.altKey && (key === "1" || key === "2" || key === "3")) result = setMarkdownHeading(textarea.value, textarea.selectionStart, textarea.selectionEnd, Number(key) as 1 | 2 | 3)
            if (result) {
                event.preventDefault()
                applyEditorEdit(result)
                return
            }
        }

        if (event.key === "Tab" && selected) {
            event.preventDefault()
            applyEditorEdit(indentMarkdownLines(event.currentTarget.value, event.currentTarget.selectionStart, event.currentTarget.selectionEnd, event.shiftKey))
            return
        }

        if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing || !selected) return
        const textarea = event.currentTarget
        const result = completeMarkdownEnter(selected.content, textarea.selectionStart, textarea.selectionEnd)
        if (!result) return
        event.preventDefault()
        updateContent(result.value)
        requestAnimationFrame(() => {
            editorRef.current?.focus()
            editorRef.current?.setSelectionRange(result.caret, result.caret)
        })
    }

    const handlePreviewClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLInputElement && event.target.dataset.taskIndex !== undefined && selected) {
            const taskIndex = Number(event.target.dataset.taskIndex)
            if (Number.isInteger(taskIndex)) updateContent(toggleMarkdownTask(selected.content, taskIndex, event.target.checked))
            return
        }
        if (!(event.target instanceof HTMLElement)) return
        const button = event.target.closest<HTMLButtonElement>("[data-copy-code]")
        if (!button) return
        const code = button.parentElement?.querySelector("code")?.textContent ?? ""
        try {
            await navigator.clipboard.writeText(code)
            toast.success("代码已复制")
        } catch {
            toast.error("复制失败，请手动选择代码")
        }
    }

    const editorPane = selected ? (
        <div className="relative flex h-full min-h-0 flex-col bg-[#fffefa]">
            <div className="flex h-11 shrink-0 items-center justify-between border-b border-black/8 px-4">
                <div className="flex items-center gap-2 text-xs font-semibold"><PencilLine className="size-3.5 text-[#527462]" />Markdown 源码</div>
                <span className="text-[11px] text-muted-foreground">{selected.content.length} 字符 · {selected.content.split("\n").length} 行</span>
            </div>
            <Textarea
                ref={editorRef}
                className="min-h-0 flex-1 resize-none rounded-none border-0 bg-transparent px-6 py-5 font-mono text-[14px] leading-7 shadow-none focus-visible:ring-0"
                value={selected.content}
                onChange={(event) => {
                    updateContent(event.target.value, "typing")
                    refreshLanguageMenu(event.currentTarget)
                }}
                onKeyDown={handleEditorKeyDown}
                onClick={(event) => refreshLanguageMenu(event.currentTarget)}
                onScroll={(event) => {
                    syncPane("editor")
                    if (languageMenu) refreshLanguageMenu(event.currentTarget)
                }}
                aria-label="Markdown 笔记正文"
                aria-autocomplete="list"
                aria-expanded={Boolean(languageMenu)}
                aria-controls={languageMenu ? "markdown-language-options" : undefined}
                aria-activedescendant={languageMenu ? `markdown-language-${languageMenu.activeIndex}` : undefined}
                spellCheck={false}
            />
            {languageMenu && <div
                id="markdown-language-options"
                role="listbox"
                aria-label="代码语言"
                className="absolute z-30 w-60 overflow-hidden rounded-xl border border-black/10 bg-[#fffefa]/98 p-1.5 shadow-2xl shadow-black/15 backdrop-blur"
                style={{ top: languageMenu.top, left: languageMenu.left }}
            >
                <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"><Code2 className="size-3.5" />选择代码语言</div>
                {languageMenu.completion.suggestions.map((language, index) => <button
                    id={`markdown-language-${index}`}
                    key={language.id}
                    type="button"
                    role="option"
                    aria-selected={index === languageMenu.activeIndex}
                    onMouseDown={(event) => {
                        event.preventDefault()
                        chooseLanguage(language)
                    }}
                    onMouseEnter={() => setLanguageMenu((current) => current ? { ...current, activeIndex: index } : null)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition ${index === languageMenu.activeIndex ? "bg-[#e1e8e1] text-[#28493c]" : "hover:bg-black/5"}`}
                >
                    <span className="font-medium">{language.label}</span>
                    <code className="text-[11px] text-muted-foreground">{language.id}</code>
                </button>)}
                <div className="border-t border-black/8 px-2 pt-1.5 text-[10px] text-muted-foreground">↑↓ 选择 · Enter/Tab 确认 · Esc 关闭</div>
            </div>}
        </div>
    ) : null

    const previewPane = selected ? (
        <div className="flex h-full min-h-0 bg-[#fffefa]">
            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex h-11 shrink-0 items-center justify-between border-b border-black/8 px-4">
                    <div className="flex items-center gap-2 text-xs font-semibold"><Eye className="size-3.5 text-[#527462]" />实时预览</div>
                    <div className="flex items-center gap-2"><Label htmlFor="sync-scroll" className="text-[11px] font-normal text-muted-foreground">同步滚动</Label><Switch id="sync-scroll" checked={syncScroll} onCheckedChange={setSyncScroll} className="scale-75" /></div>
                </div>
                <div ref={previewRef} onScroll={() => syncPane("preview")} onClick={handlePreviewClick} className="min-h-0 flex-1 overflow-y-auto scroll-smooth">
                    <article className="markdown-preview mx-auto max-w-3xl px-7 py-6 lg:px-10" dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
                </div>
            </div>
            <MarkdownOutline headings={headings} onSelect={jumpToHeading} />
        </div>
    ) : null

    const noteList = <NotesList loading={loading} notes={visibleNotes} selectedId={selectedId} search={search} vaultId={session.vaultId} vaultName={session.vaultName} onSearch={setSearch} onSelect={selectNote} />

    return (
        <div className={`notes-shell overflow-hidden bg-[#f4f1eb] text-[#27231f] ${focusMode ? "h-screen" : "min-h-screen"}`}>
            {!focusMode && <header className="flex h-14 items-center justify-between border-b border-black/10 bg-[#fbfaf7]/95 px-3 sm:px-4">
                <div className="flex items-center gap-2 sm:gap-3">
                    <Sheet open={mobileListOpen} onOpenChange={setMobileListOpen}>
                        <SheetTrigger asChild><Button variant="ghost" size="icon" className="md:hidden" aria-label="打开笔记列表"><PanelLeft className="size-4" /></Button></SheetTrigger>
                        <SheetContent side="left" className="w-[88vw] max-w-sm p-0"><SheetHeader className="sr-only"><SheetTitle>笔记列表</SheetTitle><SheetDescription>搜索并选择笔记</SheetDescription></SheetHeader>{noteList}</SheetContent>
                    </Sheet>
                    <div className="flex items-center gap-2 font-semibold tracking-tight"><span className="grid size-8 place-items-center rounded-xl bg-[#335c4b] text-white"><BookOpenText className="size-4" /></span><span className="hidden sm:inline">Whisper Notes</span></div>
                    <Badge variant="outline" className="hidden max-w-48 border-emerald-700/20 bg-emerald-700/5 text-emerald-800 lg:inline-flex"><LockKeyhole className="mr-1 size-3" /><span className="truncate">{session.vaultName}</span></Badge>
                </div>
                <div className="flex items-center gap-1">
                    <div className="mr-2 hidden items-center gap-1 text-xs text-muted-foreground md:flex"><Cloud className="size-3.5" />{syncState === "saving" ? <LoaderCircle className="size-3.5 animate-spin" /> : syncState === "saved" ? <Check className="size-3.5 text-emerald-700" /> : null}{syncState === "saved" ? "已加密同步" : syncState === "saving" ? "加密保存中" : "同步失败"}</div>
                    <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" aria-label="组件实验室" onClick={onOpenGallery}><Settings2 className="size-4" /></Button></TooltipTrigger><TooltipContent>组件实验室</TooltipContent></Tooltip>
                    <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" aria-label="切换保险库" onClick={onLock}><LogOut className="size-4" /></Button></TooltipTrigger><TooltipContent>锁定并切换保险库</TooltipContent></Tooltip>
                    <Button className="bg-[#335c4b] px-3 hover:bg-[#28493c]" onClick={() => createNote()}><FilePlus2 className="mr-0 size-4 sm:mr-2" /><span className="hidden sm:inline">新建笔记</span></Button>
                </div>
            </header>}

            <main className={`flex min-h-0 ${focusMode ? "h-screen" : "h-[calc(100vh-3.5rem)]"}`}>
                {!focusMode && <aside className="hidden w-[280px] shrink-0 border-r border-black/10 md:block">{noteList}</aside>}
                <section className="flex min-w-0 flex-1 flex-col bg-[#fffefa]">
                    {selected ? <>
                        <div className="flex shrink-0 items-start gap-2 px-5 py-3 lg:px-7">
                            <div className="min-w-0 flex-1">
                                {editingTitle ? <Input
                                    ref={titleInputRef}
                                    className="h-auto border-0 bg-transparent px-0 text-2xl font-semibold tracking-tight shadow-none focus-visible:ring-0"
                                    value={titleDraft}
                                    maxLength={120}
                                    onChange={(event) => setTitleDraft(event.target.value)}
                                    onBlur={commitTitleEdit}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            event.preventDefault()
                                            commitTitleEdit()
                                        } else if (event.key === "Escape") {
                                            event.preventDefault()
                                            cancelTitleEdit()
                                        }
                                    }}
                                    aria-label="编辑笔记标题"
                                /> : <button
                                    type="button"
                                    className="block max-w-full cursor-text truncate rounded-md px-1 py-0.5 text-left text-2xl font-semibold tracking-tight hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    onDoubleClick={beginTitleEdit}
                                    aria-label={`笔记标题：${selected.title || "无标题笔记"}，双击编辑`}
                                    title="双击修改笔记名称"
                                >{selected.title || "无标题笔记"}</button>}
                                <p className="mt-1 text-[11px] text-muted-foreground">最后编辑 {new Date(selected.updatedAt).toLocaleString("zh-CN")} · 标题与正文均已加密</p>
                            </div>
                            <div className="flex shrink-0 items-center gap-1">
                                <Tooltip><TooltipTrigger asChild><Button variant="ghost" size="icon" onClick={() => setFocusMode((current) => !current)} aria-label={focusMode ? "退出沉浸模式" : "进入沉浸模式"}>{focusMode ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}</Button></TooltipTrigger><TooltipContent>{focusMode ? "退出沉浸模式 (Esc)" : "沉浸模式"}</TooltipContent></Tooltip>
                                <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon" aria-label="删除笔记"><Trash2 className="size-4" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>删除这篇笔记？</AlertDialogTitle><AlertDialogDescription>删除后密文也会从云端移除，无法恢复。</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>取消</AlertDialogCancel><AlertDialogAction onClick={deleteSelected}>确认删除</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
                            </div>
                        </div>
                        <MarkdownToolbar textareaRef={editorRef} value={selected.content} onChange={(content) => updateContent(content)} canUndo={canUndo} canRedo={canRedo} onUndo={undoContent} onRedo={redoContent} />
                        <div className="min-h-0 flex-1">
                            {isMobile ? <Tabs value={mobileTab} onValueChange={setMobileTab} className="flex h-full min-h-0 flex-col"><TabsList className="mx-3 mt-2 grid w-auto grid-cols-2"><TabsTrigger value="edit"><PencilLine className="mr-1.5 size-3.5" />编辑</TabsTrigger><TabsTrigger value="preview"><Eye className="mr-1.5 size-3.5" />预览</TabsTrigger></TabsList><TabsContent value="edit" className="mt-0 min-h-0 flex-1">{editorPane}</TabsContent><TabsContent value="preview" className="mt-0 min-h-0 flex-1">{previewPane}</TabsContent></Tabs> : <ResizablePanelGroup direction="horizontal"><ResizablePanel defaultSize={50} minSize={28}>{editorPane}</ResizablePanel><ResizableHandle withHandle className="bg-black/10 hover:bg-[#6e8c7c]" /><ResizablePanel defaultSize={50} minSize={28}>{previewPane}</ResizablePanel></ResizablePanelGroup>}
                        </div>
                    </> : <div className="grid h-full place-items-center text-center"><div><BookOpenText className="mx-auto size-10 text-muted-foreground" /><h2 className="mt-4 text-lg font-semibold">还没有笔记</h2><Button className="mt-4 bg-[#335c4b]" onClick={() => createNote()}>新建第一篇笔记</Button></div></div>}
                </section>
            </main>
        </div>
    )
}

export function NotesWorkspace({ onOpenGallery }: { onOpenGallery: () => void }) {
    const [session, setSession] = useState<Session | null>(null)
    return <TooltipProvider>{session ? <NotesApp session={session} onOpenGallery={onOpenGallery} onLock={() => setSession(null)} /> : <VaultGate onUnlocked={setSession} />}<Toaster richColors /></TooltipProvider>
}
