import { useState } from 'react'
import useSWR from "swr";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

function App() {
  const [ count, setCount ] = useState(0)
  const { data, error, isLoading } = useSWR("https://api.github.com/repos/vercel/swr", fetcher);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
  return (
      <>
        <div>
          <h1>{ data.name }</h1>
          <p>{ data.description }</p>
          <strong>👁 { data.subscribers_count }</strong>{ " " }
          <strong>✨ { data.stargazers_count }</strong>{ " " }
          <strong>🍴 { data.forks_count }</strong>
        </div>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={ viteLogo } className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={ reactLogo } className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={ () => setCount((count) => count + 1) }>
            count is { count }
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
  )
}

export default App
