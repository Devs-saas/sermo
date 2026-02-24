
export function HeaderComponent() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur w-full pb-5">
      <nav className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <a href="#" className="inline-flex items-center gap-2">
          <img src="svgs/logo-simple.svg" alt="Sermo logo" className='h-10'/>
          <span className="text-4xl tracking-[10%]">SERMO</span>
        </a>
      </nav>
    </header>
  )
}