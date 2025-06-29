import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import { ProConfigProvider } from "@ant-design/pro-components";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ProConfigProvider>
        <App />
      </ProConfigProvider>
    </StrictMode>,
)

// https://pro-components.antdigital.dev/components/login-form
