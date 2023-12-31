import React, { useState, useRef } from 'react'
import styles from './index.module.scss'
import { hotriview } from '@/component/pages/Home/dummy.api'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { dataContentTiktok } from './api.tiktok'
import TiktokCard from '@/component/elements/TiktokCard'

const MainContentTiktok = () => {
  const [state, setState] = useState({
    activeSlide: 0,
  })

  const { activeSlide } = state
  const nodeRef = useRef(activeSlide)
  const [slide, setSlide] = useState<string>()

  const handlePrevOrNext = (isNext: boolean) => {
    if (isNext) {
      setState((prev) => ({
        ...prev,
        activeSlide: (prev.activeSlide + 1) % dataContentTiktok.length,
        nodeRef: activeSlide,
      }))
    } else {
      setState((prev) => ({
        ...prev,
        activeSlide:
          (prev.activeSlide - 1 + hotriview.length) % hotriview.length,
        nodeRef: activeSlide,
      }))
    }
  }

  return (
    <div className="relative flex justify-center pb-10 ">
      <div className={styles.maxContainer}>
        <div className="flex gap-[44px] justify-between">
          <h1 className={styles.title}>Konten Tiktok</h1>
          <div className={styles.line}>
            <div />
          </div>
          <div className="flex gap-[23px]">
            <div
              className={styles.dots}
              onClick={() => handlePrevOrNext(false)}
            >
              <ArrowBackIcon
                sx={{
                  color: 'white',
                  padding: {
                    xs: '4px',
                    md: '0px',
                  },
                }}
              />
            </div>
            <div className={styles.dots} onClick={() => handlePrevOrNext(true)}>
              <ArrowForwardIcon
                sx={{
                  color: 'white',
                  padding: {
                    xs: '4px',
                    md: '0px',
                  },
                }}
              />
            </div>
          </div>
        </div>
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={activeSlide}
            classNames={{
              enter: `opacity-0 translate-x-[${slide}50%] transition-all duration-500 ease-in-out`,
              enterActive: `opacity-100 translate-x-[${slide}0] transition-all duration-500 ease-in-out`,
              exit: 'opacity-100 transform scale-100 transition-all duration-500 ease-in-out',
              exitActive:
                'opacity-0 transform scale-90 transition-all duration-500 ease-in-out',
            }}
            timeout={500}
          >
            <div className={styles.gridCardItems}>
              {dataContentTiktok.map((item, i) => (
                <React.Fragment key={i}>
                  <TiktokCard tiktokUrl={item.url} />
                </React.Fragment>
              ))}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}

export default MainContentTiktok
