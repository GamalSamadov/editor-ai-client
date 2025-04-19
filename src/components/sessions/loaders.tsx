import { Skeleton } from "../ui/skeleton"

export const Loaders = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 14 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="w-full h-[30px] rounded-[10px]" />
        </div>
      ))}
    </div>
  )
}
