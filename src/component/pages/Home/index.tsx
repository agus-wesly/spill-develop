import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { ReactElement, JSXElementConstructor } from 'react'
import styles from './index.module.scss'

import MainLayout from '@/component/layouts/MainLayout'

import MainHotReview from '@/component/main/MainHotReview'

import MainFeature from '@/component/main/MainFeature'
import MainBannerAds from '@/component/main/MainBannerAds'
import MainArticles from '@/component/main/MainArticles'
// import MainContentReview from '@/component/main/MainContentReview'
import Button from '@/component/elements/Button/component'
import SearchRecomendationItem from '@/component/elements/SearchRecomendation'
import Alert from '@/component/alert'
import Link from 'next/link'
import { useDebounce } from '@/hooks/useDebounce'
import useClickOutside from '@/hooks/useClickOutside'

const Home = ({
  data,
  article,
}: {
  data: { hot_review: Hotriview[]; selection_product: Product[] }
  article: Article[]
}) => {
  const router = useRouter()
  const [openRecomendation, setOpenRecomendation] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  const searchContainerRef = useRef<HTMLDivElement>(null)

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    const searchParam = new URLSearchParams({
      q: searchVal,
    })
    router.push(`/catalogue-product?${searchParam.toString()}`)
  }

  const { withSuccess } = router.query

  const keys = ['Risol goreng', 'Icikiwir asik', 'Laptop baru']

  const debouncedKeyword = useDebounce(searchVal, 800)

  useEffect(() => {
    // TODO : Search recomendation product from API !
    console.log({
      debouncedKeyword,
    })
  }, [debouncedKeyword])

  useClickOutside(searchContainerRef, () => {
    if (openRecomendation) {
      setOpenRecomendation(false)
    }
  })

  return (
    <main>
      <div className="bg-radial bg-[#111827] w-full h-[100vh]">
        <div className="mx-auto h-full flex items-center">
          <div className={styles.wording}>
            <div className={styles.maxWording}>
              <h1>
                Cari produk, <br /> Baca review, <br /> Checkout, <br /> lalu{' '}
                <label>Spill</label> disini.
              </h1>
            </div>
            <p>
              Spill adalah tempat buat bantu kamu yang bingung mau checkout
              produk apa
            </p>
            <div className="relative" ref={searchContainerRef}>
              <form
                onSubmit={handleSearchSubmit}
                className="flex justify-between bg-white p-2 items-center rounded-xl gap-[8px]"
              >
                <img
                  src="/icons/search.svg"
                  alt="search"
                  className="w-4 h-4 mr-1 "
                />
                <input
                  placeholder="Cari produk apapun"
                  id="search"
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="md:w-[420px] border-none outline-none bg-white text-[14px] leading-low"
                  onFocus={() => setOpenRecomendation(true)}
                />
                <Button
                  className="py-[10px] px-[24px] w-[76px] h-[40px]"
                  type="submit"
                >
                  Cari
                </Button>
              </form>
              {openRecomendation && (
                <div className="absolute top-[66px] w-full rounded-xl shadow-md bg-white z-[5] overflow-hidden">
                  {!searchVal ? (
                    <>
                      <h3 className="p-4 font-bold text-label-lg">
                        <span className="mr-2">🔥</span>Produk Paling Banyak
                        Dicari:
                      </h3>
                      <SearchRecomendationItem className="text-left text-sm font-normal text-neutral-900" />
                      <SearchRecomendationItem className="text-left text-sm font-normal text-neutral-900" />
                    </>
                  ) : (
                    <>
                      <SearchRecomendationItem
                        value={searchVal}
                        className="text-left text-sm font-normal text-neutral-900"
                      />
                    </>
                  )}
                </div>
              )}
            </div>

            <div className={styles.horizontalStack}>
              <div className={styles.keywordHeader}>Handphone Murah</div>
              <div className={styles.keywordHeader}>Skincare</div>
              <div className={styles.keywordHeader}>Iphone 13 Pro</div>
              <div className={styles.keywordHeader}>Kamera Terbaik</div>
            </div>
          </div>
        </div>
      </div>
      <MainHotReview hotReview={data.hot_review} />
      <MainFeature />
      <MainBannerAds />
      <MainArticles artikel={article} />
      {/* <MainContentReview contentReview={data.selection_product} /> */}

      {withSuccess ? (
        <Alert
          defaultOpen
          closeElement={
            <Link
              href={'/'}
              replace
              className="w-full flex justify-center items-center py-3 px-4 gap-2 rounded-[12px] border border-[1A1A1A] text-label-lg outline-none"
            >
              Close
            </Link>
          }
        >
          <section className="text-center">
            <h1 className="text-headline-sm md:text-headline-md font-bold">
              Review kamu berhasil Dikirim !!
            </h1>
            <p className="text-label-md md:text-title-md">
              Terimakasih telah membantu orang lain yang akan membeli barang
              tersebut dengan review Kamu
            </p>
          </section>
        </Alert>
      ) : null}
    </main>
  )
}

Home.getLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>
) => <MainLayout isNormal={false}>{page}</MainLayout>

export default Home
