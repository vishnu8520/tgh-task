export default function Controls({
  search,
  setSearch,
  sortBy,
  setSortBy,
  order,
  setOrder,
}: {
  search: string;
  setSearch: (v: string) => void;
  sortBy: "title" | "price";
  setSortBy: (v: "title" | "price") => void;
  order: "asc" | "desc";
  setOrder: (v: "asc" | "desc") => void;
}) {
  return (
    <div className="control-bar">
      <input
        className="control-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products (ex: phone, laptop...)"
      />

      <select
        className="control-select"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "title" | "price")}
      >
        <option value="title">Sort by: Name</option>
        <option value="price">Sort by: Price</option>
      </select>

      <select
        className="control-select"
        value={order}
        onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
      >
        <option value="asc">Order: Asc</option>
        <option value="desc">Order: Desc</option>
      </select>
    </div>
  );
}
