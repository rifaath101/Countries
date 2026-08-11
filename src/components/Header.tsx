import { useState, useEffect } from "react"

function Header() {
  const [lightMode, setLightMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", lightMode === false)
  }, [lightMode])

  return (
    <header className="relative z-10 bg-white dark:bg-gray-800 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5 lg:px-16 lg:py-6 shadow-lg border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
      <h1 className="text-base font-extrabold sm:text-xl lg:text-2xl">
        Where in the world?
      </h1>
      <button
        type="button"
        className="text-sm sm:text-base"
        onClick={() => setLightMode(!lightMode)}
      >
        {lightMode ? `Dark Mode` : "Light Mode"}
      </button>
    </header>
  )
}

export default Header
