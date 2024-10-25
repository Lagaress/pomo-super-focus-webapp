import { BucketItem } from "@/components/(bucket-list)/data-table";

const dummyBucketList: BucketItem[] = [
  {
    id: "1",
    title: "Build a remote office",
    description: "Lorem Epsum",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Retire parents",
    description: "Lorem Epsum",
    isCompleted: false,
  },
  {
    id: "3",
    title: "Earn first income!",
    description: "Lorem Epsum",
    isCompleted: true,
  },
  {
    id: "4",
    title: "Watch Royal Challengers Bangalore winning IPL Trophy alive.",
    description: "Lorem Epsum",
    isCompleted: false,
  },
  {
    id: "5",
    title: "Selfie with Virat Kohli!",
    description: "Lorem Epsum",
    isCompleted: false,
  },
];

const howToModalBucketListObj = {
  screenTitle: (
    <>
      Welcome to{" "}
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Bucket List Screen!
      </span>{" "}
      😻
    </>
  ),
  screenHeader: (
    <div>
      {" "}
      C'mon! Fill your
      <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Bucket!
      </span>{" "}
    </div>
  ),
  screenDescription: (
    <>
      A bucket list is a powerful way to manifest your dreams, filled with life
      experiences that go beyond just career milestones. It’s about exploring
      new places, embracing personal growth, and cherishing moments that spark
      joy and fulfillment. From adventures that push your boundaries to quiet
      reflections that deepen your soul, your bucket list is a roadmap to a life
      well-lived.
      <br />
      <br />
      You can add as many items you want in your bucket and can also track which
      items are completed. Enjoy our tabular format of displaying your bucket
      list;)
    </>
  ),
  showCats: true,
  ctaBtnText: "Understood, Thanks and close.",
};

export { dummyBucketList, howToModalBucketListObj };
