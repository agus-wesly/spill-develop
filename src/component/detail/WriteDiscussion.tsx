import React, { FormEvent, createContext, useState } from 'react'
import SendIcon from '../elements/SendIcon'
// import ReviewCard from './ReviewCard'
import DiscussionCard from './DiscussonCard'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export type DiscussionQuery = {
  data: { discussionsWithTime: Discussion[] }
}

async function getDiscussionById(productId: string | string[]) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/discussion/${productId}`
  )
  const jsonResp: { data: { discussionsWithTime: Discussion[] } } =
    await resp.json()

  const idMap: Record<string, any> = {}

  jsonResp.data.discussionsWithTime.forEach((item) => {
    idMap[item.id] = { ...item, replies: [] }
  })

  const hierarchy: Discussion[] = []
  jsonResp.data.discussionsWithTime.forEach((item) => {
    if (item.parentId === null) {
      hierarchy.push(idMap[item.id])
    } else if (idMap[item.parentId]) {
      idMap[item.parentId].replies.push(idMap[item.id])
    }
  })

  return hierarchy
}

export const discussionListContext = createContext<{
  isOpenDiscusionIdReply: string | null
  setIsOpenDiscusionIdReply: (params: string | null) => void
}>({
  isOpenDiscusionIdReply: null,
  setIsOpenDiscusionIdReply: () => {},
})

const WriteDiscussion = () => {
  const router = useRouter()
  const productId = router.query.id

  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const [isOpenDiscusionIdReply, setIsOpenDiscusionIdReply] = useState<
    null | string
  >(null)

  const { data, isError, isLoading } = useQuery<Discussion[]>({
    queryFn: async () => getDiscussionById(productId!),
    queryKey: ['discussion', productId],
    enabled: !!productId,
  })

  const discussions = data || []

  let content
  if (isLoading) {
    content = <p className="text-center font-semibold">Loading ...</p>
  } else if (isError) {
    content = (
      <p className="text-center font-semibold">
        Ada error nih, silahkan coba lagi nanti.
      </p>
    )
  } else if (!discussions?.length) {
    content = (
      <p className="text-center font-semibold">
        Belum ada diskusi untuk produk ini. Jadilah yang pertama menuliskan
        diskusi.
      </p>
    )
  } else {
    content = (
      <discussionListContext.Provider
        value={{ isOpenDiscusionIdReply, setIsOpenDiscusionIdReply }}
      >
        {discussions.map((disc) => (
          <DiscussionCard key={disc.id} {...disc} />
        ))}
      </discussionListContext.Provider>
    )
  }

  async function handleSendDiscussion(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!session) {
      router.push(
        `/login?${new URLSearchParams({
          callbackUrl: `/detail-product/${productId}`,
        }).toString()}`
      )
      return
    }

    const { reviewContent } = e.target as EventTarget & {
      reviewContent: { value: string }
    }

    const body = reviewContent.value

    reviewContent.value = ''

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/discussion/${productId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            body,
            parentId: null,
          }),
        }
      )
    } catch (error) {
    } finally {
      queryClient.invalidateQueries({
        queryKey: ['discussion', productId],
      })
    }
  }

  return (
    <div className="w-full flex flex-col gap-10 md:gap-3">
      <form onSubmit={handleSendDiscussion} className="space-y-3">
        <label
          htmlFor="new-review"
          className="text-label-lg font-bold font-satoshi"
        >
          Apa yang menjadi keresahanmu dalam memilih produk?
        </label>

        <DiscussionForm />
      </form>

      {content}
    </div>
  )
}

export default WriteDiscussion

export function DiscussionForm({}: {}) {
  return (
    <fieldset className="relative rounded-xl h-[104px] border md:px-4 md:py-3">
      <textarea
        id="new-review"
        name="reviewContent"
        className="w-full outline-none p-4 md:p-0 resize-none h-full placeholder:text-abu text-label-lg placeholder:text-label-lg font-satoshi placeholder:font-satoshi"
        placeholder="Review kamu disini"
      />
      <button className="absolute bottom-3 right-3" type="submit">
        <span>
          <SendIcon color="#1598CC" size={20} />
        </span>
      </button>
    </fieldset>
  )
}
