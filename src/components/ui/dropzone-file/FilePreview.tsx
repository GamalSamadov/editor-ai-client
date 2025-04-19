"use client"

interface FilePreviewProps {
  fileName: string | null
  onClear: () => void
  isLoading: boolean
  error?: string | null
}

export const FilePreview = ({
  fileName,
  onClear,
  isLoading,
  error,
}: FilePreviewProps) => {
  if (!fileName || error) return null

  return (
    <div className="relative mt-1 mx-3.5 flex items-center rounded-lg bg-green-100/50 dark:bg-green-900/30 p-3 border border-green-300 dark:border-green-700">
      <div className="flex-1 font-light overflow-hidden whitespace-nowrap text-ellipsis pr-2 text-sm text-gray-800 dark:text-gray-200">
        <p title={fileName}>{fileName}</p>
      </div>
      <button
        type="button"
        onClick={onClear}
        disabled={isLoading}
        className="ml-2 flex h-[24px] w-[24px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-500/20 dark:bg-gray-700/40 font-bold text-xs text-gray-800 dark:text-gray-200 transition hover:bg-red-500/80 dark:hover:bg-red-600/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Remove selected file"
      >
        X
      </button>
    </div>
  )
}
