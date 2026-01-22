"use client";

export default function Header({
  search,
  setSearch,
  logoSrc,
}: {
  search: string;
  setSearch: (v: string) => void;
  logoSrc: string;
}) {
  return (
    <header className="header-shell">
      <div className="max-w-6xl mx-auto px-4">
        <div className="header-inner">

          <div className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Products Logo"
              className="h-10 w-10 rounded-xl object-contain"
            />
            <div className="hidden sm:block">
              <p className="font-extrabold leading-none text-base">Products</p>
              <p className="text-xs text-slate-500">DummyJSON Catalog</p>
            </div>
          </div>

          <div className="header-search">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products.."
              className="header-search-input"
            />
            <span className="header-search-icon">⌕</span>
          </div>
        </div>
      </div>
    </header>
  );
}
