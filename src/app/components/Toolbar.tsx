"use client";

export default function Toolbar({
  sortBy,
  setSortBy,
  order,
  setOrder,
}: {
  sortBy: "title" | "price";
  setSortBy: (v: "title" | "price") => void;
  order: "asc" | "desc";
  setOrder: (v: "asc" | "desc") => void;
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 mt-6">
      <div className="toolbar-shell">
        <div className="toolbar-left">
          <h1 className="toolbar-title">Dummy Product List</h1>
          <p className="toolbar-subtitle">
            Browse products with search, sorting, and infinite scroll.
          </p>
        </div>

        <div className="toolbar-right">
          <div className="toolbar-field">
            <label className="toolbar-label">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "title" | "price")}
              className="toolbar-select"
            >
              <option value="title">Name</option>
              <option value="price">Price</option>
            </select>
          </div>

          <div className="toolbar-field">
            <label className="toolbar-label">Order</label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
              className="toolbar-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
