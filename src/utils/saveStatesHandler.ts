import { useUser } from "@clerk/nextjs";
import { api } from "./api";

function SaveStatesHandler(
  problemId: number | undefined,
  language: string | undefined
) {
  const { user, isLoaded } = useUser();

  const dummyProblemId = -1; // Or another value that would not exist as a problemId
  const dummyLanguage = ""; // Or another value that would not exist as a language

  // Always call the useQuery hook, but ignore the results when not loaded or problemId is undefined
  const saveStateQuery = api.saveStates.getSaveState.useQuery({
    clerkId: user?.id || "",
    problemId: problemId || dummyProblemId,
    language: language || dummyLanguage,
  });
  const saveState = isLoaded && problemId && language ? saveStateQuery : null;

  return { saveState };
}

export default SaveStatesHandler;
