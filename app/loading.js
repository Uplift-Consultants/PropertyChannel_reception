import LoadingSpinner from "@icons/spinner.svg"

export default function Loading() {
  return (
    <div className="loading wrapper">
      <div className="loader">
        <LoadingSpinner className="animate-spin" width={48} height={48} />
      </div>
    </div>
  );
}
