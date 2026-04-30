export default function PageLoadingSpinner() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <span
        className="inline-block size-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"
        aria-label="Loading"
      />
    </div>
  );
}
