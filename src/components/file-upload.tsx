import { AudioWaveformIcon, Hand, MousePointerClickIcon } from "lucide-react"

export const FileInput = () => {
  return (
    <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
      <div className="md:flex">
        <div className="w-full p-3">
          <div className="relative h-48 rounded-lg border-2 border-slate-500 bg-gray-100 dark:bg-gray-800 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="absolute flex flex-col items-center">
              <AudioWaveformIcon size={50} className="mb-4" />
              <span className="text-gray-500 font-semibold flex items-center justify-center gap-1">
                <Hand size={17} /> <span>Bu yerga ovozli faylni tashlang</span>
              </span>
              <span className="text-gray-400 font-normal mt-1 flex items-center justify-center gap-1">
                yoki yuklash uchun bosing <MousePointerClickIcon size={17} />
              </span>
            </div>

            <input
              name=""
              className="h-full w-full opacity-0 cursor-pointer"
              type="file"
              accept="audio/mp3 audio/wav audio/mpeg audio/x-wav audio/x-mp3 audio/x-mpeg-3 audio/aac audio/ogg audio/webm audio/flac audio/mp4"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
