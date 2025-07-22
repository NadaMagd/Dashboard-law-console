
import Dashboard from "./pages/Dashboard"

import './index.css'
import { useEffect } from "react"
import { getArticlesDate } from "./Service/Posts/Posts"
import ArticlesTable from './pages/ArticlesTable';

function App() {

  return (
    <>
<ArticlesTable/>
    </>
  )
}

export default App
