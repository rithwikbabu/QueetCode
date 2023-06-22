import { useUser } from "@clerk/nextjs";
import { api } from "./api";

function LikesHandler(problemId: number | undefined) {
  const { user, isLoaded } = useUser();

  const dummyProblemId = -1; // Or another value that would not exist as a problemId

  // Always call the useQuery hook, but ignore the results when not loaded or problemId is undefined
  const likesByUserQuery = api.likes.getLikesByUser.useQuery({ clerkId: user?.id || '', problemId: problemId || dummyProblemId });
  const totalLikesAndDislikesQuery = api.likes.getTotalLikesAndDislikes.useQuery({ problemId: problemId || dummyProblemId });

  const likesByUser = isLoaded && problemId ? likesByUserQuery : null;
  const totalLikesAndDislikes = problemId ? totalLikesAndDislikesQuery : null;

  // Use the useMutation hook at the top level
  const handleLikesMutation = api.likes.handleLikes.useMutation({
    onSuccess: () => {
      // Invalidate the queries after a successful mutation
      void likesByUserQuery.refetch();
      void totalLikesAndDislikesQuery.refetch();
    },
  });

  const handleLike = () => {
    if (!isLoaded || !problemId) return;
    const newValue = likesByUser?.data?.value === 1 ? 0 : 1;
    handleLikesMutation.mutate({ clerkId: user?.id || '', problemId, value: newValue });
  };

  const handleDislike = () => {
    if (!isLoaded || !problemId) return;
    const newValue = likesByUser?.data?.value === -1 ? 0 : -1;
    handleLikesMutation.mutate({ clerkId: user?.id || '', problemId, value: newValue });
  };

  return { likesByUser, totalLikesAndDislikes, handleLike, handleDislike };
}

export default LikesHandler;
