export default function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border p-4 bg-white dark:bg-gray-900 shadow-sm">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
