import ReviewCard from '@/component/detail/ReviewCard'
import WriteDiscussion from '@/component/detail/WriteDiscussion'
import WriteReview from '@/component/detail/WriteReview'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/component/elements/Tabs'
import TabsInfluencerContent from './TabsInfluencerContent'

const DiscussionSection = () => {
  return (
    <Tabs defaultValue="review" className="main-container pt-0 bg-white pb-10">
      <TabsList className="flex flex-row justify-start mb-10 bg-transparent">
        <TabsTrigger className="flex-1" value="review">
          Review
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="diskusi">
          Diskusi
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="influencer">
          Konten Influencer
        </TabsTrigger>
      </TabsList>
      <TabsContent value="review" className="space-y-10">
        <WriteReview />
        <div className="space-y-10 px-10">
          <ReviewCard showLike />
          <ReviewCard showLike />
        </div>
      </TabsContent>
      <TabsContent value="diskusi">
        <div className="px-5 md:px-10">
          <WriteDiscussion />
        </div>
      </TabsContent>
      <TabsContent value="influencer">
        <TabsInfluencerContent />
      </TabsContent>
    </Tabs>
  )
}

export default DiscussionSection
