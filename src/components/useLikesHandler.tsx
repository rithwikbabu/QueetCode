// useLikesHandler.ts
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

type problemVotes = {
  likes: number;
  dislikes: number;
  userLike: string;
};

export const useLikesHandler = (data: any) => {
  const user = useUser();
  const mutation = api.likes.handleLikes.useMutation();
  const [likesTrigger, setLikesTrigger] = useState(false);

  const handleLikes = async (likeValue: number) => {
    if (user && user.user && user.user.id && data && data.id) {
      try {
        await mutation.mutateAsync({
          clerkId: user.user.id,
          problemId: data.id,
          value: likeValue,
        });

        await updateLikes();
        // This will run after the mutation has completed.
        setLikesTrigger((prevTrigger) => !prevTrigger);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    }
  };

  // Fetch the user's like status for this problem
  const userLikeQuery = api.likes.getLikesByUser.useQuery({
    clerkId: user?.user?.id || "0",
    problemId: data?.id || 0,
  });

  const totalLikeQuery = api.likes.getTotalLikesAndDislikes.useQuery({
    problemId: data?.id || 0,
  });

  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const [userLike, setUserLike] = useState<string>("");

  const updateLikes = async () => {
    // Wait for refetches to complete
    await Promise.all([totalLikeQuery.refetch(), userLikeQuery.refetch()]);

    setLikes(totalLikeQuery.data?.likes || 0);
    setDislikes(totalLikeQuery.data?.dislikes || 0);

    if (userLikeQuery.data?.value === 1) {
      setUserLike("like");
    } else if (userLikeQuery.data?.value === -1) {
      setUserLike("dislike");
    } else {
      setUserLike("");
    }
  };

  let votes: problemVotes = {
    likes: likes,
    dislikes: dislikes,
    userLike: userLike,
  };

  return {
    likesTrigger,
    setLikesTrigger,
    handleLikes,
    votes,
    updateLikes,
    totalLikeQuery,
  };
};
