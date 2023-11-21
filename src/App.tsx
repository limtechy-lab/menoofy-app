
// import './App.css'

import { ThemeProvider } from "@/components/theme-provider"
import ProjectRoutes from './Routes'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProjectRoutes />
    </ThemeProvider>
  )
}

export default App
