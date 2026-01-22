export default function ProductSkeleton() {
  return (
    <div className="skeleton animate-pulse">
      <div className="sk-img" />
      <div className="sk-body">
        <div className="sk-line w-3/4" />
        <div className="sk-line w-full" />
        <div className="sk-line w-5/6" />
        <div className="flex justify-between pt-2">
          <div className="sk-line w-20 h-4" />
          <div className="sk-line w-12 h-4" />
        </div>
      </div>
    </div>
  );
}
