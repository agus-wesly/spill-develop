import useLockBodyScroll from '@/hooks/useLockBody'
import Image from 'next/image'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function SearchMobile({ onClose }: { onClose: () => void }) {
  useLockBodyScroll()
  return (
    <div className="fixed z-[99] w-screen h-screen inset-0 bg-white md:hidden p-5">
      <nav className="flex items-center justify-between">
        <button onClick={onClose}>
          <ArrowBackIcon className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="flex-1 gap-2 flex items-center py-2 px-4 justify-between">
          <input
            className="placeholder:text-label-lg flex-1"
            placeholder="Find Your Product Here"
          />

          <button className="w-5 h-5">
            <Image
              src={'/icons/search.svg'}
              width={0}
              height={0}
              alt="search"
              className="w-full h-full object-contain"
            />
          </button>
        </div>
      </nav>

      <div className="flex flex-col">
        <h1 className="flex p-4 items-center gap-2 self-stretch text-label-lg font-bold ">
          🔥 Produk Paling Banyak Dicari:
        </h1>

        <button className="p-4 flex items-center self-stretch gap-2">
          <Image
            src="/icons/search.svg"
            alt="search"
            width={0}
            height={0}
            className="w-3 h-3"
          />

          <p className="text-label-lg">Item</p>
        </button>
        <button className="p-4 flex items-center self-stretch gap-2">
          <Image
            src="/icons/search.svg"
            alt="search"
            width={0}
            height={0}
            className="w-3 h-3"
          />

          <p className="text-label-lg">Item</p>
        </button>
        <button className="p-4 flex items-center self-stretch gap-2">
          <Image
            src="/icons/search.svg"
            alt="search"
            width={0}
            height={0}
            className="w-3 h-3"
          />

          <p className="text-label-lg">Item</p>
        </button>
      </div>
    </div>
  )
}
