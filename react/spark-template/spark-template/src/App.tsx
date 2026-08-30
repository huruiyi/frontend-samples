import { useEffect, useState } from "react"

import { RadixPrimitivesGallery } from "@/components/gallery/RadixPrimitivesGallery"
import { NotesWorkspace } from "@/components/notes/NotesWorkspace"

function App() {
    const getView = () => window.location.hash === "#components" ? "components" : "notes"
    const [view, setView] = useState<"notes" | "components">(getView)

    useEffect(() => {
        const syncView = () => setView(getView())
        window.addEventListener("hashchange", syncView)
        return () => window.removeEventListener("hashchange", syncView)
    }, [])

    const showNotes = () => {
        history.replaceState(null, "", window.location.pathname + window.location.search)
        setView("notes")
    }

    const showComponents = () => {
        window.location.hash = "components"
        setView("components")
    }

    return view === "notes"
        ? <NotesWorkspace onOpenGallery={showComponents} />
        : <RadixPrimitivesGallery onBack={showNotes} />
}

export default App
