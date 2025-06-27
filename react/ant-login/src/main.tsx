import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginV2 from './Login-v2.tsx'
import Dashboard   from "./Dashboard.tsx";
import { ProConfigProvider } from "@ant-design/pro-components";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ProConfigProvider light>
        <Dashboard />
      </ProConfigProvider>
    </StrictMode>,
)

// https://pro-components.antdigital.dev/components/login-form
