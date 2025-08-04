import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F7FB]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#282828] mb-4">
          Page Not Found
        </h2>
        <p className="text-[#616060] mb-6">
          Could not find the requested resource.
        </p>
        <Link
          href="/"
          className="bg-[#079F9F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#067373] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
