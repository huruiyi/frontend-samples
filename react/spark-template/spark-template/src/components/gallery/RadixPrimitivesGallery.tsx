import { useEffect, useState, type ReactNode } from "react"
import {
    Accordion,
    AlertDialog,
    AspectRatio,
    Avatar,
    Checkbox,
    Collapsible,
    ContextMenu,
    Dialog,
    DropdownMenu,
    Form,
    HoverCard,
    Label,
    Menubar,
    NavigationMenu,
    Popover,
    Progress,
    RadioGroup,
    ScrollArea,
    Select,
    Separator,
    Slider,
    Switch,
    Tabs,
    Toast,
    Toggle,
    ToggleGroup,
    Toolbar,
    Tooltip,
    unstable_OneTimePasswordField as OneTimePasswordField,
    unstable_PasswordToggleField as PasswordToggleField,
} from "radix-ui"
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    ArrowLeft,
    Bold,
    Check,
    ChevronDown,
    ChevronRight,
    Circle,
    ExternalLink,
    Eye,
    EyeOff,
    Italic,
    MoreHorizontal,
    Plus,
    Strikethrough,
    X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import "./radix-official.css"

type DemoDefinition = { id: string; name: string }
type DemoGroup = { label: string; items: DemoDefinition[] }

const groups: DemoGroup[] = [
    { label: "展开与分区", items: [
        { id: "accordion", name: "Accordion" },
        { id: "collapsible", name: "Collapsible" },
        { id: "tabs", name: "Tabs" },
    ] },
    { label: "弹层与提示", items: [
        { id: "alert-dialog", name: "Alert Dialog" },
        { id: "dialog", name: "Dialog" },
        { id: "hover-card", name: "Hover Card" },
        { id: "popover", name: "Popover" },
        { id: "tooltip", name: "Tooltip" },
    ] },
    { label: "菜单与导航", items: [
        { id: "context-menu", name: "Context Menu" },
        { id: "dropdown-menu", name: "Dropdown Menu" },
        { id: "menubar", name: "Menubar" },
        { id: "navigation-menu", name: "Navigation Menu" },
    ] },
    { label: "表单与选择", items: [
        { id: "form", name: "Form" },
        { id: "label", name: "Label" },
        { id: "checkbox", name: "Checkbox" },
        { id: "radio-group", name: "Radio Group" },
        { id: "select", name: "Select" },
        { id: "slider", name: "Slider" },
        { id: "switch", name: "Switch" },
        { id: "one-time-password-field", name: "One-Time Password" },
        { id: "password-toggle-field", name: "Password Toggle" },
    ] },
    { label: "展示与布局", items: [
        { id: "aspect-ratio", name: "Aspect Ratio" },
        { id: "avatar", name: "Avatar" },
        { id: "progress", name: "Progress" },
        { id: "scroll-area", name: "Scroll Area" },
        { id: "separator", name: "Separator" },
    ] },
    { label: "操作与反馈", items: [
        { id: "toast", name: "Toast" },
        { id: "toggle", name: "Toggle" },
        { id: "toggle-group", name: "Toggle Group" },
        { id: "toolbar", name: "Toolbar" },
    ] },
]

function DemoSection({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
    return <section id={id} data-demo-section className="scroll-mt-24 overflow-visible rounded-2xl border border-black/8 bg-[#fffefa] shadow-sm shadow-black/5">
        <div className="flex flex-col gap-3 border-b border-black/8 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-7">
            <div>
                <div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-semibold tracking-tight">{title}</h2><Badge variant="outline" className="border-[#335c4b]/20 bg-[#335c4b]/5 text-[#335c4b]">Radix Primitive</Badge></div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
            <a className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[#335c4b] hover:underline" href={`https://www.radix-ui.com/primitives/docs/components/${id}`} target="_blank" rel="noreferrer">官方文档<ExternalLink className="size-3" /></a>
        </div>
        <div className="p-5 sm:p-7"><div className="radix-demo-stage">{children}</div></div>
    </section>
}

function IndicatorDot() {
    return <Circle className="size-2.5 fill-current" />
}

export function RadixPrimitivesGallery({ onBack }: { onBack: () => void }) {
    const [activeId, setActiveId] = useState("accordion")
    const [toastOpen, setToastOpen] = useState(false)
    const [progress, setProgress] = useState(13)

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-demo-section]"))
        const observer = new IntersectionObserver((entries) => {
            const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
            if (visible?.target.id) setActiveId(visible.target.id)
        }, { rootMargin: "-15% 0px -65%", threshold: [0, 0.2, 0.5] })
        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        const timer = window.setTimeout(() => setProgress(66), 500)
        return () => window.clearTimeout(timer)
    }, [])

    const navigate = (id: string) => {
        setActiveId(id)
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    return <Tooltip.Provider delayDuration={250}>
        <Toast.Provider swipeDirection="right">
            <div className="min-h-screen bg-[#eeebe4] text-foreground">
                <header className="sticky top-0 z-40 border-b border-black/8 bg-[#fffefa]/90 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 md:px-8">
                        <div className="flex min-w-0 items-center gap-3">
                            <Button variant="outline" size="sm" onClick={onBack}><ArrowLeft className="mr-1 size-4" />返回笔记</Button>
                            <div className="min-w-0"><h1 className="truncate text-lg font-semibold">Radix Primitives 组件实验室</h1><p className="hidden text-xs text-muted-foreground sm:block">30 个官方组件 · 可交互演示 · 中文说明</p></div>
                        </div>
                        <Badge className="shrink-0 bg-[#335c4b]">30 / 30</Badge>
                    </div>
                </header>

                <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-8 md:px-8 lg:grid-cols-[250px_minmax(0,1fr)]">
                    <aside className="hidden lg:block">
                        <nav aria-label="Radix 组件导航" className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-black/8 bg-[#fffefa]/90 p-3 shadow-sm">
                            {groups.map((group) => <div key={group.label} className="mb-4 last:mb-0">
                                <p className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{group.label}</p>
                                <div className="space-y-0.5">{group.items.map((item) => <button key={item.id} type="button" onClick={() => navigate(item.id)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${activeId === item.id ? "bg-[#dfe9e2] font-semibold text-[#264b3c]" : "text-muted-foreground hover:bg-black/5 hover:text-foreground"}`}><span>{item.name}</span>{activeId === item.id ? <ChevronRight className="size-3.5" /> : null}</button>)}</div>
                            </div>)}
                        </nav>
                    </aside>

                    <main className="min-w-0 space-y-6">
                        <section className="rounded-2xl bg-[#335c4b] p-6 text-white shadow-xl shadow-[#335c4b]/15 sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">Official primitives</p>
                            <h2 className="mt-2 text-3xl font-semibold tracking-tight">从行为原语到完整交互</h2>
                            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/75">以下清单与 Radix Primitives 官方 Components 目录一致，演示文案、默认值、尺寸与 Violet 示例主题均按官方主示例还原；同时保留官方键盘导航、焦点管理和 ARIA 行为。</p>
                        </section>

                        <DemoSection id="accordion" title="Accordion" description="纵向堆叠的标题集合，点击标题展开或收起对应内容；支持单项或多项展开以及键盘导航。">
                            <Accordion.Root type="single" defaultValue="item-1" collapsible className="w-[300px] rounded-md bg-[#fdfcfd] px-5 shadow-[0_2px_10px] shadow-black/20">
                                {[
                                    ["item-1", "Is it accessible?", "Yes. It adheres to the WAI-ARIA design pattern."],
                                    ["item-2", "Is it unstyled?", "Yes. It's unstyled by default, giving you freedom over the look and feel."],
                                    ["item-3", "Can it be animated?", "Yes! You can animate the Accordion with CSS or JavaScript."],
                                ].map(([value, title, body]) => <Accordion.Item value={value} key={value} className="border-b border-[#e7e5e4] last:border-0"><Accordion.Header><Accordion.Trigger className="group flex h-[45px] w-full items-center justify-between text-left text-[15px] font-medium text-[#5746af] outline-none hover:text-[#473876]">{title}<ChevronDown className="size-4 text-[#8e79d9] transition group-data-[state=open]:rotate-180" /></Accordion.Trigger></Accordion.Header><Accordion.Content className="overflow-hidden pb-[15px] pr-5 text-[15px] leading-6 text-[#65636d]">{body}</Accordion.Content></Accordion.Item>)}
                            </Accordion.Root>
                        </DemoSection>

                        <DemoSection id="collapsible" title="Collapsible" description="使用一个触发器控制单块内容的展开与收起，适合高级选项、详情摘要和紧凑信息区。">
                            <Collapsible.Root className="w-[300px] text-[15px] text-white"><div className="flex items-center justify-between"><strong className="font-normal">@peduarte starred 3 repositories</strong><Collapsible.Trigger className="grid size-[25px] place-items-center rounded-full bg-white text-[#5746af] shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-[#f4f0fe]"><MoreHorizontal className="size-4" /></Collapsible.Trigger></div><div className="radix-official-panel mt-3 px-3 py-2.5 text-[#5746af]">@radix-ui/primitives</div><Collapsible.Content className="space-y-3 pt-3"><div className="radix-official-panel px-3 py-2.5 text-[#5746af]">@radix-ui/colors</div><div className="radix-official-panel px-3 py-2.5 text-[#5746af]">@radix-ui/themes</div></Collapsible.Content></Collapsible.Root>
                        </DemoSection>

                        <DemoSection id="tabs" title="Tabs" description="将多个内容面板分层展示，一次只显示一个；方向键可在标签之间移动。">
                            <Tabs.Root defaultValue="tab1" className="flex w-[300px] flex-col shadow-[0_2px_10px] shadow-black/20"><Tabs.List className="flex shrink-0 border-b border-[#e7e5e4]" aria-label="Manage your account"><Tabs.Trigger className="h-[45px] flex-1 bg-white px-5 text-[15px] text-[#65636d] outline-none first:rounded-tl-md last:rounded-tr-md hover:text-[#5746af] data-[state=active]:text-[#5746af] data-[state=active]:shadow-[inset_0_-1px_0_currentColor]" value="tab1">Account</Tabs.Trigger><Tabs.Trigger className="h-[45px] flex-1 bg-white px-5 text-[15px] text-[#65636d] outline-none first:rounded-tl-md last:rounded-tr-md hover:text-[#5746af] data-[state=active]:text-[#5746af] data-[state=active]:shadow-[inset_0_-1px_0_currentColor]" value="tab2">Password</Tabs.Trigger></Tabs.List><Tabs.Content value="tab1" className="grow rounded-b-md bg-white p-5 outline-none"><p className="mb-5 text-[15px] leading-normal text-[#65636d]">Make changes to your account here. Click save when you&apos;re done.</p><label className="mb-2 block text-[13px] text-[#211f26]" htmlFor="tabs-name">Name</label><input id="tabs-name" className="radix-official-input w-full" defaultValue="Pedro Duarte" /><div className="mt-5 flex justify-end"><button className="radix-official-button radix-official-button--green">Save changes</button></div></Tabs.Content><Tabs.Content value="tab2" className="grow rounded-b-md bg-white p-5 outline-none"><p className="mb-5 text-[15px] leading-normal text-[#65636d]">Change your password here. After saving, you&apos;ll be logged out.</p><label className="mb-2 block text-[13px] text-[#211f26]" htmlFor="tabs-password">Current password</label><input id="tabs-password" type="password" className="radix-official-input w-full" /><div className="mt-5 flex justify-end"><button className="radix-official-button radix-official-button--green">Change password</button></div></Tabs.Content></Tabs.Root>
                        </DemoSection>

                        <DemoSection id="alert-dialog" title="Alert Dialog" description="需要用户明确响应的重要模态确认框；打开后背景内容不可交互。">
                            <AlertDialog.Root><AlertDialog.Trigger className="radix-official-button">Delete account</AlertDialog.Trigger><AlertDialog.Portal><AlertDialog.Overlay className="radix-official-overlay" /><AlertDialog.Content className="radix-official-dialog"><AlertDialog.Title className="radix-official-title">Are you absolutely sure?</AlertDialog.Title><AlertDialog.Description className="radix-official-description">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialog.Description><div className="flex justify-end gap-6"><AlertDialog.Cancel className="radix-official-button">Cancel</AlertDialog.Cancel><AlertDialog.Action className="radix-official-button radix-official-button--red">Yes, delete account</AlertDialog.Action></div></AlertDialog.Content></AlertDialog.Portal></AlertDialog.Root>
                        </DemoSection>

                        <DemoSection id="dialog" title="Dialog" description="覆盖在主窗口上的对话框，提供完整焦点圈定、关闭和模态/非模态模式。">
                            <Dialog.Root><Dialog.Trigger className="radix-official-button">Edit profile</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="radix-official-overlay" /><Dialog.Content className="radix-official-dialog"><Dialog.Title className="radix-official-title">Edit profile</Dialog.Title><Dialog.Description className="radix-official-description">Make changes to your profile here. Click save when you&apos;re done.</Dialog.Description><fieldset className="radix-official-fieldset"><label className="radix-official-label" htmlFor="dialog-name">Name</label><input className="radix-official-input" id="dialog-name" defaultValue="Pedro Duarte" /></fieldset><fieldset className="radix-official-fieldset"><label className="radix-official-label" htmlFor="dialog-username">Username</label><input className="radix-official-input" id="dialog-username" defaultValue="@peduarte" /></fieldset><div className="radix-official-actions"><Dialog.Close className="radix-official-button radix-official-button--green">Save changes</Dialog.Close></div><Dialog.Close aria-label="Close" className="radix-official-icon-button"><X className="size-4" /></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
                        </DemoSection>

                        <DemoSection id="hover-card" title="Hover Card" description="鼠标悬停或键盘聚焦链接时提供内容预览，适合用户资料和链接摘要。">
                            <HoverCard.Root><HoverCard.Trigger asChild><a href="https://twitter.com/radix_ui" target="_blank" rel="noreferrer"><img className="size-[45px] rounded-full" src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png" alt="Radix UI" /></a></HoverCard.Trigger><HoverCard.Portal><HoverCard.Content sideOffset={5} className="radix-official-menu w-[300px] p-5"><div className="flex flex-col gap-[15px]"><img className="size-[60px] rounded-full" src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png" alt="Radix UI" /><div><div className="text-[15px] font-medium text-[#211f26]">Radix</div><div className="text-[15px] text-[#65636d]">@radix_ui</div></div><div className="text-[15px] leading-normal text-[#211f26]">Components, icons, colors, and templates for building high-quality, accessible UI. Free and open-source.</div><div className="flex gap-[15px] text-[15px]"><div><b>0</b> <span className="text-[#65636d]">Following</span></div><div><b>2,900</b> <span className="text-[#65636d]">Followers</span></div></div></div><HoverCard.Arrow className="fill-white" /></HoverCard.Content></HoverCard.Portal></HoverCard.Root>
                        </DemoSection>

                        <DemoSection id="popover" title="Popover" description="由按钮触发、可承载表单和丰富内容的非模态浮层，支持碰撞检测和定位。">
                            <Popover.Root><Popover.Trigger className="grid size-[35px] place-items-center rounded-full bg-white text-[#5746af] shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-[#f4f0fe]" aria-label="Update dimensions"><MoreHorizontal className="size-4" /></Popover.Trigger><Popover.Portal><Popover.Content sideOffset={5} className="radix-official-menu w-[260px] p-5"><p className="mb-2.5 text-[15px] font-medium text-[#211f26]">Dimensions</p>{[["Width", "100%"], ["Max. width", "300px"], ["Height", "25px"], ["Max. height", "none"]].map(([label, value]) => <fieldset key={label} className="mb-2 flex items-center gap-2.5"><label className="w-[75px] text-xs text-[#65636d]">{label}</label><input className="radix-official-input h-[25px] w-[120px] flex-none text-xs" defaultValue={value} /></fieldset>)}<Popover.Close aria-label="Close" className="radix-official-icon-button"><X className="size-4" /></Popover.Close><Popover.Arrow className="fill-white" /></Popover.Content></Popover.Portal></Popover.Root>
                        </DemoSection>

                        <DemoSection id="tooltip" title="Tooltip" description="鼠标悬停或键盘聚焦时显示简短补充信息，不用于承载必须阅读的内容。">
                            <Tooltip.Root><Tooltip.Trigger className="grid size-[35px] place-items-center rounded-full bg-white text-[#5746af] shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-[#f4f0fe]" aria-label="Add to library"><Plus className="size-4" /></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content sideOffset={5} className="z-[95] select-none rounded bg-white px-[15px] py-2.5 text-[15px] leading-none text-[#5746af] shadow-xl">Add to library<Tooltip.Arrow className="fill-white" /></Tooltip.Content></Tooltip.Portal></Tooltip.Root>
                        </DemoSection>

                        <DemoSection id="context-menu" title="Context Menu" description="通过右键或长按在指针位置打开操作菜单，支持键盘导航、分组和子菜单。">
                            <ContextMenu.Root><ContextMenu.Trigger className="grid h-[200px] w-[300px] place-items-center rounded bg-white text-[15px] text-[#65636d] shadow-[0_2px_10px] shadow-black/20">Right-click here.</ContextMenu.Trigger><ContextMenu.Portal><ContextMenu.Content className="radix-official-menu"><ContextMenu.Item className="radix-official-menu-item">Back <span className="radix-official-menu-shortcut">⌘+[</span></ContextMenu.Item><ContextMenu.Item className="radix-official-menu-item" disabled>Forward <span className="radix-official-menu-shortcut">⌘+]</span></ContextMenu.Item><ContextMenu.Item className="radix-official-menu-item">Reload <span className="radix-official-menu-shortcut">⌘+R</span></ContextMenu.Item><ContextMenu.Sub><ContextMenu.SubTrigger className="radix-official-menu-item">More Tools <ChevronRight className="ml-auto size-3.5" /></ContextMenu.SubTrigger><ContextMenu.Portal><ContextMenu.SubContent className="radix-official-menu"><ContextMenu.Item className="radix-official-menu-item">Save Page As…</ContextMenu.Item><ContextMenu.Item className="radix-official-menu-item">Create Shortcut…</ContextMenu.Item><ContextMenu.Item className="radix-official-menu-item">Developer Tools</ContextMenu.Item></ContextMenu.SubContent></ContextMenu.Portal></ContextMenu.Sub><ContextMenu.Separator className="radix-official-separator" /><ContextMenu.CheckboxItem className="radix-official-menu-item" checked>Show Bookmarks</ContextMenu.CheckboxItem><ContextMenu.CheckboxItem className="radix-official-menu-item">Show Full URLs</ContextMenu.CheckboxItem></ContextMenu.Content></ContextMenu.Portal></ContextMenu.Root>
                        </DemoSection>

                        <DemoSection id="dropdown-menu" title="Dropdown Menu" description="由按钮触发的一组操作或功能菜单，支持复选项、单选项、分组与子菜单。">
                            <DropdownMenu.Root><DropdownMenu.Trigger className="grid size-[35px] place-items-center rounded-full bg-white text-[#5746af] shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-[#f4f0fe]" aria-label="Customize options"><MoreHorizontal className="size-4" /></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content sideOffset={5} className="radix-official-menu"><DropdownMenu.Item className="radix-official-menu-item">New Tab <span className="radix-official-menu-shortcut">⌘+T</span></DropdownMenu.Item><DropdownMenu.Item className="radix-official-menu-item">New Window <span className="radix-official-menu-shortcut">⌘+N</span></DropdownMenu.Item><DropdownMenu.Item className="radix-official-menu-item" disabled>New Private Window <span className="radix-official-menu-shortcut">⇧+⌘+N</span></DropdownMenu.Item><DropdownMenu.Separator className="radix-official-separator" /><DropdownMenu.Sub><DropdownMenu.SubTrigger className="radix-official-menu-item">More Tools <ChevronRight className="ml-auto size-3.5" /></DropdownMenu.SubTrigger><DropdownMenu.Portal><DropdownMenu.SubContent className="radix-official-menu"><DropdownMenu.Item className="radix-official-menu-item">Save Page As…</DropdownMenu.Item><DropdownMenu.Item className="radix-official-menu-item">Developer Tools</DropdownMenu.Item></DropdownMenu.SubContent></DropdownMenu.Portal></DropdownMenu.Sub><DropdownMenu.Separator className="radix-official-separator" /><DropdownMenu.CheckboxItem className="radix-official-menu-item" checked><DropdownMenu.ItemIndicator className="absolute left-2"><Check className="size-3.5" /></DropdownMenu.ItemIndicator>Show Bookmarks</DropdownMenu.CheckboxItem></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>
                        </DemoSection>

                        <DemoSection id="menubar" title="Menubar" description="桌面应用常见的常驻菜单栏，提供文件、编辑等稳定命令入口和完整键盘导航。">
                            <Menubar.Root className="flex rounded-md bg-white p-[3px] shadow-[0_2px_10px] shadow-black/20">{[["File", "New Tab", "New Window"], ["Edit", "Undo", "Redo"], ["View", "Reload", "Force Reload"]].map(([menu, first, second]) => <Menubar.Menu key={menu}><Menubar.Trigger className="select-none rounded px-3 py-2 text-[13px] text-[#5746af] outline-none data-[state=open]:bg-[#6e56cf] data-[state=open]:text-white">{menu}</Menubar.Trigger><Menubar.Portal><Menubar.Content align="start" sideOffset={5} className="radix-official-menu"><Menubar.Item className="radix-official-menu-item">{first}</Menubar.Item><Menubar.Item className="radix-official-menu-item">{second}</Menubar.Item><Menubar.Separator className="radix-official-separator" /><Menubar.Item className="radix-official-menu-item">Print…</Menubar.Item></Menubar.Content></Menubar.Portal></Menubar.Menu>)}</Menubar.Root>
                        </DemoSection>

                        <DemoSection id="navigation-menu" title="Navigation Menu" description="面向网站主导航的链接集合，支持普通链接、下拉内容和键盘访问。">
                            <NavigationMenu.Root className="relative z-10 flex justify-center"><NavigationMenu.List className="flex list-none rounded-md bg-white p-1 shadow-[0_2px_10px] shadow-black/20"><NavigationMenu.Item><NavigationMenu.Trigger className="group flex items-center gap-1 rounded px-3 py-2 text-[15px] font-medium text-[#5746af] outline-none hover:bg-[#f4f0fe] data-[state=open]:bg-[#f4f0fe]">Learn<ChevronDown className="size-3.5 transition group-data-[state=open]:rotate-180" /></NavigationMenu.Trigger><NavigationMenu.Content className="absolute left-0 top-full mt-2 w-[500px] max-w-[80vw] rounded-md bg-white p-5 shadow-xl"><div className="grid gap-2 sm:grid-cols-[.75fr_1fr]"><NavigationMenu.Link href="#navigation-menu" className="row-span-3 flex flex-col justify-end rounded-md bg-gradient-to-br from-[#3e2c79] to-[#8e79d9] p-5 text-white"><strong>Radix Primitives</strong><span className="mt-2 text-sm text-white/80">Unstyled, accessible components for React.</span></NavigationMenu.Link><NavigationMenu.Link href="#navigation-menu" className="rounded p-3 hover:bg-[#f4f0fe]"><strong className="text-sm">Stitches</strong><p className="text-xs text-[#65636d]">CSS-in-JS with near-zero runtime.</p></NavigationMenu.Link><NavigationMenu.Link href="#navigation-menu" className="rounded p-3 hover:bg-[#f4f0fe]"><strong className="text-sm">Colors</strong><p className="text-xs text-[#65636d]">Beautiful, thought-out palettes.</p></NavigationMenu.Link><NavigationMenu.Link href="#navigation-menu" className="rounded p-3 hover:bg-[#f4f0fe]"><strong className="text-sm">Icons</strong><p className="text-xs text-[#65636d]">A crisp set of 15×15 icons.</p></NavigationMenu.Link></div></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Item><NavigationMenu.Trigger className="group flex items-center gap-1 rounded px-3 py-2 text-[15px] font-medium text-[#5746af] outline-none hover:bg-[#f4f0fe] data-[state=open]:bg-[#f4f0fe]">Overview<ChevronDown className="size-3.5 transition group-data-[state=open]:rotate-180" /></NavigationMenu.Trigger><NavigationMenu.Content className="absolute left-0 top-full mt-2 w-[500px] max-w-[80vw] rounded-md bg-white p-5 shadow-xl"><div className="grid grid-cols-2 gap-2">{["Introduction", "Getting started", "Styling", "Animation", "Accessibility", "Releases"].map((item) => <NavigationMenu.Link key={item} href="#navigation-menu" className="rounded p-3 text-sm text-[#5746af] hover:bg-[#f4f0fe]">{item}</NavigationMenu.Link>)}</div></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Item><NavigationMenu.Link href="https://github.com/radix-ui" target="_blank" className="block rounded px-3 py-2 text-[15px] font-medium text-[#5746af] hover:bg-[#f4f0fe]">Github</NavigationMenu.Link></NavigationMenu.Item></NavigationMenu.List></NavigationMenu.Root>
                        </DemoSection>

                        <DemoSection id="form" title="Form" description="基于原生约束验证 API 收集与校验信息，并以可访问方式关联标签、控件和错误消息。">
                            <Form.Root className="w-[260px]" onSubmit={(event) => event.preventDefault()}><Form.Field name="email" className="mb-2.5"><div className="flex items-baseline justify-between"><Form.Label className="text-[15px] font-medium text-white">Email</Form.Label><Form.Message match="valueMissing" className="text-[13px] text-white/80">Please enter your email</Form.Message><Form.Message match="typeMismatch" className="text-[13px] text-white/80">Please provide a valid email</Form.Message></div><Form.Control type="email" required className="mt-2.5 h-[35px] w-full rounded border border-white/50 bg-black/20 px-2.5 text-[15px] text-white outline-none focus:border-2 focus:border-white" /></Form.Field><Form.Field name="question" className="mb-2.5"><div className="flex items-baseline justify-between"><Form.Label className="text-[15px] font-medium text-white">Question</Form.Label><Form.Message match="valueMissing" className="text-[13px] text-white/80">Please enter a question</Form.Message></div><Form.Control asChild><textarea required className="mt-2.5 min-h-[80px] w-full resize-none rounded border border-white/50 bg-black/20 p-2.5 text-[15px] text-white outline-none focus:border-2 focus:border-white" /></Form.Control></Form.Field><Form.Submit className="radix-official-button w-full">Post question</Form.Submit></Form.Root>
                        </DemoSection>

                        <DemoSection id="label" title="Label" description="将可访问标签与原生或自定义表单控件关联；双击标签时会避免意外选中文本。">
                            <div className="flex items-center gap-[15px]"><Label.Root htmlFor="radix-name" className="text-[15px] font-medium text-white">First name</Label.Root><input id="radix-name" className="h-[35px] w-[200px] rounded bg-white px-2.5 text-[15px] text-[#5746af] shadow-[0_0_0_1px] shadow-[#aa99ec] outline-none focus:shadow-[0_0_0_2px]" defaultValue="Pedro Duarte" /></div>
                        </DemoSection>

                        <DemoSection id="checkbox" title="Checkbox" description="在选中、未选中和不确定三种状态之间切换的复选控件。">
                            <div className="flex items-center"><Checkbox.Root id="radix-checkbox" defaultChecked className="grid size-[25px] place-items-center rounded bg-white text-[#5746af] shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-[#f4f0fe] focus:shadow-[0_0_0_2px] focus:shadow-black"><Checkbox.Indicator><Check className="size-4" /></Checkbox.Indicator></Checkbox.Root><Label.Root htmlFor="radix-checkbox" className="pl-[15px] text-[15px] leading-none text-white">Accept terms and conditions.</Label.Root></div>
                        </DemoSection>

                        <DemoSection id="radio-group" title="Radio Group" description="一组选项中只允许选中一个，方向键可切换当前选择。">
                            <RadioGroup.Root defaultValue="default" className="flex flex-col gap-2.5" aria-label="View density">{[["default", "Default"], ["comfortable", "Comfortable"], ["compact", "Compact"]].map(([value, label]) => <div className="flex items-center" key={value}><RadioGroup.Item value={value} id={`radio-${value}`} className="grid size-[25px] place-items-center rounded-full bg-white text-[#5746af] shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-[#f4f0fe] focus:shadow-[0_0_0_2px] focus:shadow-black"><RadioGroup.Indicator><IndicatorDot /></RadioGroup.Indicator></RadioGroup.Item><Label.Root htmlFor={`radio-${value}`} className="pl-[15px] text-[15px] leading-none text-white">{label}</Label.Root></div>)}</RadioGroup.Root>
                        </DemoSection>

                        <DemoSection id="select" title="Select" description="由按钮触发的选项列表，具备分组、标签、占位符、类型搜索和完整键盘导航。">
                            <Select.Root><Select.Trigger className="radix-official-button gap-[5px]" aria-label="Food"><Select.Value placeholder="Select a fruit…" /><Select.Icon><ChevronDown className="size-4" /></Select.Icon></Select.Trigger><Select.Portal><Select.Content position="popper" sideOffset={5} className="radix-official-menu"><Select.Viewport><Select.Group><Select.Label className="px-[25px] text-xs leading-[25px] text-[#65636d]">Fruits</Select.Label>{[["apple", "Apple"], ["banana", "Banana"], ["blueberry", "Blueberry"], ["grapes", "Grapes"], ["pineapple", "Pineapple"]].map(([value, label]) => <Select.Item value={value} key={value} className="radix-official-menu-item"><Select.ItemIndicator className="absolute left-2"><Check className="size-3.5" /></Select.ItemIndicator><Select.ItemText>{label}</Select.ItemText></Select.Item>)}</Select.Group><Select.Separator className="radix-official-separator" /><Select.Group><Select.Label className="px-[25px] text-xs leading-[25px] text-[#65636d]">Vegetables</Select.Label>{[["aubergine", "Aubergine"], ["broccoli", "Broccoli"], ["carrot", "Carrot"], ["courgette", "Courgette"], ["leek", "Leek"]].map(([value, label], index) => <Select.Item value={value} key={value} disabled={index === 2} className="radix-official-menu-item"><Select.ItemIndicator className="absolute left-2"><Check className="size-3.5" /></Select.ItemIndicator><Select.ItemText>{label}</Select.ItemText></Select.Item>)}</Select.Group></Select.Viewport></Select.Content></Select.Portal></Select.Root>
                        </DemoSection>

                        <DemoSection id="slider" title="Slider" description="在连续或分步范围内选择数值，支持单值、范围、多滑块以及键盘和触控输入。">
                            <Slider.Root defaultValue={[50]} max={100} step={1} className="relative flex h-5 w-[200px] touch-none select-none items-center"><Slider.Track className="relative h-[3px] grow rounded-full bg-black/45"><Slider.Range className="absolute h-full rounded-full bg-white" /></Slider.Track><Slider.Thumb aria-label="Volume" className="block size-5 rounded-full bg-white shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-[#f4f0fe] focus:shadow-[0_0_0_5px] focus:shadow-black/30" /></Slider.Root>
                        </DemoSection>

                        <DemoSection id="switch" title="Switch" description="在开启与关闭之间切换的二态控件，适合即时设置而非多项选择。">
                            <div className="flex items-center"><Label.Root htmlFor="airplane-mode" className="pr-[15px] text-[15px] leading-none text-white">Airplane mode</Label.Root><Switch.Root id="airplane-mode" className="relative h-[25px] w-[42px] rounded-full bg-black/40 shadow-[0_2px_10px] shadow-black/20 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black"><Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow transition data-[state=checked]:translate-x-[19px]" /></Switch.Root></div>
                        </DemoSection>

                        <DemoSection id="one-time-password-field" title="One-Time Password Field" description="由一组单字符输入框组成的一次性验证码字段，支持粘贴、自动前进和原生表单提交。">
                            <OneTimePasswordField.Root className="flex gap-2" validationType="numeric" aria-label="One-time password">{Array.from({ length: 6 }).map((_, index) => <OneTimePasswordField.Input key={index} index={index} className="size-11 rounded border border-white/25 bg-black/25 text-center text-lg font-semibold text-white outline-none focus:border-white focus:ring-2 focus:ring-white/40" />)}<OneTimePasswordField.HiddenInput name="otp" /></OneTimePasswordField.Root>
                        </DemoSection>

                        <DemoSection id="password-toggle-field" title="Password Toggle Field" description="带有显示/隐藏切换按钮的密码字段，输入类型和可访问状态由 Radix 协调。">
                            <div className="relative w-[260px]"><PasswordToggleField.Root><PasswordToggleField.Input className="h-[35px] w-full rounded border border-white/25 bg-black/25 px-3 pr-11 text-[15px] text-white outline-none focus:border-white focus:ring-2 focus:ring-white/30" defaultValue="radix-secret" aria-label="Password" /><PasswordToggleField.Toggle className="absolute right-1 top-1 grid size-[27px] place-items-center rounded text-white hover:bg-white/10" aria-label="Toggle password visibility"><PasswordToggleField.Slot visible={<EyeOff className="size-4" />} hidden={<Eye className="size-4" />} /></PasswordToggleField.Toggle></PasswordToggleField.Root></div>
                        </DemoSection>

                        <DemoSection id="aspect-ratio" title="Aspect Ratio" description="让内容始终保持指定宽高比，适合媒体封面、视频和响应式卡片。">
                            <div className="w-[300px] overflow-hidden rounded-md shadow-[0_2px_10px] shadow-black/20"><AspectRatio.Root ratio={16 / 9}><img src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80" alt="Landscape photograph by Tobias Tullius" className="size-full object-cover" /></AspectRatio.Root></div>
                        </DemoSection>

                        <DemoSection id="avatar" title="Avatar" description="显示用户图像，并在图片不可用或加载期间提供可靠的文字回退。">
                            <div className="flex gap-5"><Avatar.Root className="inline-flex size-[45px] items-center justify-center overflow-hidden rounded-full bg-white align-middle"><Avatar.Image src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" alt="Colm Tuite" className="size-full object-cover" /><Avatar.Fallback className="text-[15px] font-medium text-[#5746af]">CT</Avatar.Fallback></Avatar.Root><Avatar.Root className="inline-flex size-[45px] items-center justify-center overflow-hidden rounded-full bg-white align-middle"><Avatar.Image src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80" alt="Pedro Duarte" className="size-full object-cover" /><Avatar.Fallback className="text-[15px] font-medium text-[#5746af]">JD</Avatar.Fallback></Avatar.Root><Avatar.Root className="inline-flex size-[45px] items-center justify-center overflow-hidden rounded-full bg-white align-middle"><Avatar.Fallback className="text-[15px] font-medium text-[#5746af]">PD</Avatar.Fallback></Avatar.Root></div>
                        </DemoSection>

                        <DemoSection id="progress" title="Progress" description="展示任务完成进度；数值和视觉指示器分离，便于实现确定或不确定状态。">
                            <Progress.Root value={progress} className="relative h-[25px] w-[300px] overflow-hidden rounded-full bg-black/35 shadow-[0_2px_10px] shadow-black/20"><Progress.Indicator className="size-full rounded-full bg-white transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]" style={{ transform: `translateX(-${100 - progress}%)` }} /></Progress.Root>
                        </DemoSection>

                        <DemoSection id="scroll-area" title="Scroll Area" description="在保留浏览器原生滚动行为的同时提供可定制、跨浏览器一致的滚动条。">
                            <ScrollArea.Root className="h-[225px] w-[200px] overflow-hidden rounded bg-white shadow-[0_2px_10px] shadow-black/20"><ScrollArea.Viewport className="size-full rounded"><div className="px-5 py-[15px]"><div className="mb-2.5 text-[15px] font-medium text-[#5746af]">Tags</div>{Array.from({ length: 50 }).map((_, index) => <div key={index} className="border-t border-[#e4defc] py-2.5 text-[13px] text-[#5746af]">v1.2.0-beta.{50 - index}</div>)}</div></ScrollArea.Viewport><ScrollArea.Scrollbar orientation="vertical" className="flex w-2.5 touch-none select-none bg-black/5 p-0.5"><ScrollArea.Thumb className="relative flex-1 rounded-full bg-black/30" /></ScrollArea.Scrollbar><ScrollArea.Corner /></ScrollArea.Root>
                        </DemoSection>

                        <DemoSection id="separator" title="Separator" description="以视觉或语义方式分隔内容，可选择水平/垂直方向以及是否仅作装饰。">
                            <div className="mx-[15px] w-full max-w-[300px] text-white"><div className="text-[15px] font-medium leading-5">Radix Primitives</div><div className="text-[15px] leading-5">An open-source UI component library.</div><Separator.Root className="my-[15px] h-px w-full bg-[#aa99ec]" /><div className="flex h-5 items-center text-[15px]"><span>Blog</span><Separator.Root decorative orientation="vertical" className="mx-[15px] h-full w-px bg-[#aa99ec]" /><span>Docs</span><Separator.Root decorative orientation="vertical" className="mx-[15px] h-full w-px bg-[#aa99ec]" /><span>Source</span></div></div>
                        </DemoSection>

                        <DemoSection id="toast" title="Toast" description="临时出现的简短消息，支持键盘快捷键、滑动关闭、动作按钮和多个消息队列。">
                            <button className="radix-official-button" onClick={() => { setToastOpen(false); window.setTimeout(() => setToastOpen(true), 100) }}>Add to calendar</button><Toast.Root open={toastOpen} onOpenChange={setToastOpen} duration={5000} className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-xl [grid-template-areas:'title_action'_'description_action']"><Toast.Title className="mb-[5px] text-[15px] font-medium text-[#211f26] [grid-area:title]">Scheduled: Catch up</Toast.Title><Toast.Description className="m-0 text-[13px] leading-[1.3] text-[#65636d] [grid-area:description]">{new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))}</Toast.Description><Toast.Action asChild altText="Goto schedule to undo" className="[grid-area:action]"><button className="radix-official-button radix-official-button--green h-[25px] px-2.5 text-xs">Undo</button></Toast.Action></Toast.Root><Toast.Viewport className="fixed bottom-0 right-0 z-[100] m-0 flex w-[390px] max-w-full list-none flex-col gap-2.5 p-[25px] outline-none" />
                        </DemoSection>

                        <DemoSection id="toggle" title="Toggle" description="可按下或弹起的二态按钮，适合加粗、收藏和固定等独立开关操作。">
                            <Toggle.Root className="grid size-[35px] place-items-center rounded bg-white text-[#65636d] shadow-[0_2px_10px] shadow-black/20 outline-none hover:bg-[#f4f0fe] focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=on]:bg-[#e4defc] data-[state=on]:text-[#211f26]" aria-label="Toggle italic"><Italic className="size-4" /></Toggle.Root>
                        </DemoSection>

                        <DemoSection id="toggle-group" title="Toggle Group" description="将多个 Toggle 组成单选或多选组，并提供一致的焦点与方向键导航。">
                            <ToggleGroup.Root type="single" defaultValue="center" className="inline-flex space-x-px rounded bg-[#e7e5e4] shadow-[0_2px_10px] shadow-black/20" aria-label="Text alignment">{[["left", AlignLeft], ["center", AlignCenter], ["right", AlignRight]].map(([value, Icon], index) => <ToggleGroup.Item key={value as string} value={value as string} className={`grid size-[35px] place-items-center bg-white text-[#65636d] outline-none hover:bg-[#f4f0fe] data-[state=on]:bg-[#e4defc] data-[state=on]:text-[#211f26] ${index === 0 ? "rounded-l" : index === 2 ? "rounded-r" : ""}`} aria-label={`${value} aligned`}><Icon className="size-4" /></ToggleGroup.Item>)}</ToggleGroup.Root>
                        </DemoSection>

                        <DemoSection id="toolbar" title="Toolbar" description="将按钮、链接、切换组和菜单组合成可用方向键导航的工具栏。">
                            <Toolbar.Root className="flex w-full min-w-max rounded-md bg-white p-2.5 shadow-[0_2px_10px] shadow-black/20" aria-label="Formatting options"><Toolbar.ToggleGroup type="multiple" aria-label="Text formatting">{[["bold", Bold], ["italic", Italic], ["strikethrough", Strikethrough]].map(([value, Icon]) => <Toolbar.ToggleItem key={value as string} value={value as string} className="ml-0.5 inline-flex h-[25px] items-center justify-center rounded px-[5px] text-[#65636d] outline-none first:ml-0 hover:bg-[#f4f0fe] hover:text-[#5746af] data-[state=on]:bg-[#e4defc] data-[state=on]:text-[#5746af]" aria-label={value as string}><Icon className="size-4" /></Toolbar.ToggleItem>)}</Toolbar.ToggleGroup><Toolbar.Separator className="mx-2.5 w-px bg-[#e7e5e4]" /><Toolbar.ToggleGroup type="single" defaultValue="center" aria-label="Text alignment">{[["left", AlignLeft], ["center", AlignCenter], ["right", AlignRight]].map(([value, Icon]) => <Toolbar.ToggleItem key={value as string} value={value as string} className="ml-0.5 inline-flex h-[25px] items-center justify-center rounded px-[5px] text-[#65636d] outline-none first:ml-0 hover:bg-[#f4f0fe] hover:text-[#5746af] data-[state=on]:bg-[#e4defc] data-[state=on]:text-[#5746af]" aria-label={value as string}><Icon className="size-4" /></Toolbar.ToggleItem>)}</Toolbar.ToggleGroup><Toolbar.Separator className="mx-2.5 w-px bg-[#e7e5e4]" /><Toolbar.Link href="#toolbar" className="hidden h-[25px] items-center rounded px-[5px] text-[13px] text-[#65636d] hover:bg-[#f4f0fe] sm:inline-flex">Edited 2 hours ago</Toolbar.Link><Toolbar.Button className="ml-auto inline-flex h-[25px] items-center justify-center rounded bg-[#6e56cf] px-2.5 text-[13px] text-white outline-none hover:bg-[#654dc4]">Share</Toolbar.Button></Toolbar.Root>
                        </DemoSection>
                    </main>
                </div>
            </div>
        </Toast.Provider>
    </Tooltip.Provider>
}
