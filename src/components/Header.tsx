function Header() {
  return (
    <header className="relative z-10 bg-white flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5 lg:px-16 lg:py-6 shadow-lg border-b border-gray-200">
      <h1 className="text-base font-extrabold sm:text-xl lg:text-2xl">
        Where in the world?
      </h1>
      <button type="button" className="text-sm sm:text-base">
        Dark Mode
      </button>
    </header>
  )
}

export default Header
