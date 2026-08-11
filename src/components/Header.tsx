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
        className="flex cursor-pointer items-center gap-2 text-sm sm:text-base"
        onClick={() => setLightMode(!lightMode)}
      >
        {lightMode ? (
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="4" strokeLinecap="round" />
            <path
              strokeLinecap="round"
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            />
          </svg>
        )}
        {lightMode ? "Dark Mode" : "Light Mode"}
      </button>
    </header>
  )
}

export default Header
