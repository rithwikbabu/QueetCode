import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Background from "~/components/Background";
import Markdown from "~/components/Markdown";
import { useLikesHandler } from "~/components/useLikesHandler";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();

  // Get URL parts. Assume it's an array, or default to an array with an empty string.
  const slug = Array.isArray(router.query.slug) ? router.query.slug : [""];

  // Ensure url[0] is a string before passing it to the API call
  const problemUrl = typeof slug[0] === "string" ? slug[0] : "";

  const { data, isLoading } = api.problems.getProblemByUrl.useQuery({
    url: problemUrl,
  });
  const tabs = ["description", "submissions"];

  // if url has only one element or is undefined, default tab to 'description'
  const currentTab = slug && slug.length > 1 ? slug[1] : "description";
  // Function to check if the current route is active
  const isActive = (t: string | undefined) => t === currentTab;

  const [position, setPosition] = useState<number>(35);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    // Changed type here
    if (dragging) {
      const percentageOfScreen = (event.clientX / window.innerWidth) * 100;
      setPosition(percentageOfScreen);
    }
  };

  // Add event listeners for mouse move and mouse up to the window
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (dragging) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [dragging]);

  const { likesTrigger, handleLikes, updateLikes, votes, totalLikeQuery } =
    useLikesHandler(data);

  useEffect(() => {
    (async () => {
      await updateLikes();
    })();
  }, [likesTrigger, totalLikeQuery]);

  if (isLoading || totalLikeQuery.isLoading) return <div>Loading...</div>;

  const markdown = data?.content?.replace(/\\n/g, "\n").replace(/\\`/g, "\`");

  console.log(markdown)

  return (
    <Background>
      <div
        id="content-wrapper"
        className="mt-12 h-[calc(100vh-48px)] w-full p-2"
      >
        <div className="flex h-full w-full flex-row">
          <div
            id="left-container"
            className="h-full"
            style={{ width: `calc(${position}% - 4px)` }}
          >
            <div className="flex h-full flex-col">
              <div className="flex h-9 w-full items-center justify-between rounded-t border-b border-neutral-700 bg-neutral-900 px-4">
                <div className="flex h-full flex-row gap-8">
                  {tabs.map((t, index) => (
                    <div
                      key={index}
                      className={`tab ${isActive(t) ? "active" : ""}`}
                    >
                      <Link href={`${problemUrl}/${t}`}>
                        <div
                          className={`relative flex h-full select-none items-center whitespace-nowrap text-xs font-medium  hover:text-white ${
                            isActive(t) ? "text-white" : "text-neutral-400"
                          }`}
                        >
                          <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
                          <div
                            className={`absolute -bottom-[1px] h-[2px] w-full  ${
                              isActive(t) ? "bg-neutral-400" : ""
                            }`}
                          ></div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex h-full w-full flex-col overflow-y-auto rounded-b bg-neutral-800">
                <div id="header" className="w-full px-5 pt-5">
                  <div className="w-full">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <div className="flex h-full items-center">
                          <span className="mr-2 text-lg font-medium text-white">
                            {data?.id}. {data?.title}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="inline-flex gap-2 text-lg">
                          <div className="inline-block">
                            <div>
                              <div className="cursor-pointer rounded px-2 py-1 text-neutral-400 transition-colors hover:bg-neutral-600 hover:text-blue-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="16"
                                  viewBox="0 0 23 16"
                                  fill="currentColor"
                                >
                                  <path d="M1.48535 3.08496C1.69271 3.08496 1.87256 3.15902 2.0249 3.30713C2.17725 3.45947 2.25342 3.64144 2.25342 3.85303V7.26807H5.77002V3.85303C5.77002 3.64144 5.84619 3.45947 5.99854 3.30713C6.15088 3.15902 6.33073 3.08496 6.53809 3.08496H6.55713C6.76449 3.08496 6.94434 3.15902 7.09668 3.30713C7.24902 3.45947 7.3252 3.64144 7.3252 3.85303V12.2319C7.3252 12.4478 7.24902 12.6276 7.09668 12.7715C6.94434 12.9238 6.76449 13 6.55713 13H6.53809C6.33073 13 6.15088 12.9238 5.99854 12.7715C5.84619 12.6276 5.77002 12.4478 5.77002 12.2319V8.81689H2.25342V12.2319C2.25342 12.4478 2.17725 12.6276 2.0249 12.7715C1.87256 12.9238 1.69271 13 1.48535 13H1.46631C1.25895 13 1.0791 12.9238 0.926758 12.7715C0.774414 12.6276 0.698242 12.4478 0.698242 12.2319V3.85303C0.698242 3.64144 0.774414 3.45947 0.926758 3.30713C1.0791 3.15902 1.25895 3.08496 1.46631 3.08496H1.48535ZM9.68018 5.6875C9.896 5.6875 10.0758 5.76367 10.2197 5.91602C10.3721 6.06836 10.4482 6.25033 10.4482 6.46191V12.2319C10.4482 12.4478 10.3721 12.6276 10.2197 12.7715C10.0758 12.9238 9.896 13 9.68018 13H9.66748C9.45589 13 9.27393 12.9238 9.12158 12.7715C8.96924 12.6276 8.89307 12.4478 8.89307 12.2319V6.46191C8.89307 6.25033 8.96924 6.06836 9.12158 5.91602C9.27393 5.76367 9.45589 5.6875 9.66748 5.6875H9.68018ZM9.67383 4.8623C9.42839 4.8623 9.21891 4.77555 9.04541 4.60205C8.87191 4.42855 8.78516 4.21908 8.78516 3.97363C8.78516 3.73242 8.87191 3.52507 9.04541 3.35156C9.21891 3.17806 9.42839 3.09131 9.67383 3.09131C9.91504 3.09131 10.1224 3.17806 10.2959 3.35156C10.4736 3.52083 10.5625 3.72819 10.5625 3.97363C10.5625 4.22331 10.4736 4.43278 10.2959 4.60205C10.1224 4.77555 9.91504 4.8623 9.67383 4.8623ZM13.5142 12.2319C13.5142 12.4478 13.438 12.6276 13.2856 12.7715C13.1333 12.9238 12.9535 13 12.7461 13H12.7271C12.5197 13 12.3398 12.9238 12.1875 12.7715C12.0352 12.6276 11.959 12.4478 11.959 12.2319V8.75977C11.959 7.91341 12.2594 7.18978 12.8604 6.58887C13.4613 5.98796 14.1849 5.6875 15.0312 5.6875C15.8734 5.6875 16.5949 5.98796 17.1958 6.58887C17.7967 7.18978 18.0972 7.91341 18.0972 8.75977V12.2319C18.0972 12.4478 18.021 12.6276 17.8687 12.7715C17.7248 12.9238 17.5449 13 17.3291 13H17.3164C17.1048 13 16.9229 12.9238 16.7705 12.7715C16.6182 12.6276 16.542 12.4478 16.542 12.2319V8.75977C16.542 8.34082 16.396 7.98324 16.104 7.68701C15.8078 7.39079 15.4502 7.24268 15.0312 7.24268C14.6081 7.24268 14.2484 7.39079 13.9521 7.68701C13.6602 7.98324 13.5142 8.34082 13.5142 8.75977V12.2319ZM20.1602 3.08496C20.3675 3.08496 20.5474 3.15902 20.6997 3.30713C20.8521 3.45947 20.9282 3.64144 20.9282 3.85303V5.6875H21.8804C22.0877 5.6875 22.2676 5.76367 22.4199 5.91602C22.5723 6.06836 22.6484 6.25033 22.6484 6.46191V6.47461C22.6484 6.69043 22.5723 6.87028 22.4199 7.01416C22.2676 7.1665 22.0877 7.24268 21.8804 7.24268H20.9282V11.0068C20.9282 11.1296 20.9705 11.2332 21.0552 11.3179C21.1398 11.4025 21.2456 11.4448 21.3726 11.4448H21.8804C22.0877 11.4448 22.2676 11.521 22.4199 11.6733C22.5723 11.8257 22.6484 12.0076 22.6484 12.2192V12.2319C22.6484 12.4478 22.5723 12.6276 22.4199 12.7715C22.2676 12.9238 22.0877 13 21.8804 13H21.3726C20.8224 13 20.3506 12.8053 19.957 12.416C19.5677 12.0225 19.373 11.5527 19.373 11.0068V3.85303C19.373 3.64144 19.4492 3.45947 19.6016 3.30713C19.7539 3.15902 19.9338 3.08496 20.1411 3.08496H20.1602Z"></path>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-4">
                      <div
                        className={`${
                          data?.difficulty === "Easy"
                            ? "bg-easy text-easy"
                            : data?.difficulty === "Medium"
                            ? "bg-medium text-medium"
                            : "bg-hard text-hard"
                        } inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize`}
                      >
                        {data?.difficulty}
                      </div>
                      <div
                        className={`${
                          data?.difficulty === "Easy"
                            ? "text-easy"
                            : data?.difficulty === "Medium"
                            ? "text-medium"
                            : "text-hard"
                        } flex rounded p-[3px] text-lg transition-colors duration-200`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="1em"
                          height="1em"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M20 12.005v-.828a1 1 0 112 0v.829a10 10 0 11-5.93-9.14 1 1 0 01-.814 1.826A8 8 0 1020 12.005zM8.593 10.852a1 1 0 011.414 0L12 12.844l8.293-8.3a1 1 0 011.415 1.413l-9 9.009a1 1 0 01-1.415 0l-2.7-2.7a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div
                          className=" flex cursor-pointer items-center space-x-1 rounded px-1 py-[3px] text-neutral-400 hover:bg-neutral-700"
                          onClick={() => handleLikes(1)}
                        >
                          <div
                            className={`text-lg ${
                              votes.userLike === "like"
                                ? "text-easy"
                                : "text-neutral-400"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.04 9.11l3.297-7.419a1 1 0 01.914-.594 3.67 3.67 0 013.67 3.671V7.33h4.028a2.78 2.78 0 012.78 3.2l-1.228 8.01a2.778 2.778 0 01-2.769 2.363H5.019a2.78 2.78 0 01-2.78-2.78V11.89a2.78 2.78 0 012.78-2.78H7.04zm-2.02 2a.78.78 0 00-.781.78v6.232c0 .431.35.78.78.78H6.69V11.11H5.02zm12.723 7.793a.781.781 0 00.781-.666l1.228-8.01a.78.78 0 00-.791-.898h-5.04a1 1 0 01-1-1V4.77c0-.712-.444-1.32-1.07-1.56L8.69 10.322v8.58h9.053z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <div className="text-xs">{votes.likes}</div>
                        </div>
                        <div
                          className=" flex cursor-pointer items-center space-x-1 rounded px-1 py-[3px] text-neutral-400 hover:bg-neutral-700"
                          onClick={() => handleLikes(-1)}
                        >
                          <div
                            className={`text-lg ${
                              votes.userLike === "dislike"
                                ? "text-hard"
                                : "text-neutral-400"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M13.663 22.309a1 1 0 01-.914.594 3.67 3.67 0 01-3.67-3.671V16.67H5.05a2.78 2.78 0 01-2.78-3.2l1.228-8.01a2.778 2.778 0 012.769-2.364H18.98a2.78 2.78 0 012.78 2.781v6.232a2.78 2.78 0 01-2.78 2.78H16.96l-3.297 7.419zm5.318-9.419a.78.78 0 00.78-.78V5.878a.78.78 0 00-.78-.78H17.31v7.792h1.67zM6.257 5.097a.781.781 0 00-.781.666l-1.229 8.01a.78.78 0 00.792.898h5.04a1 1 0 011 1v3.56c0 .712.443 1.32 1.07 1.56l3.16-7.113v-8.58H6.258z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <div className="text-xs">{votes.dislikes}</div>
                        </div>
                      </div>

                      <div>
                        <div
                          id="headlessui-popover-button-:ro:"
                          aria-expanded="false"
                          data-headlessui-state=""
                        >
                          <div>
                            <div className="flex  h-full  cursor-pointer items-center rounded p-[3px] text-lg text-neutral-400 transition-colors hover:bg-neutral-700">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="1em"
                                height="1em"
                                fill="currentColor"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M11.394 2.074a2.5 2.5 0 011.212 0c.723.181 1.185.735 1.526 1.262.342.528.703 1.259 1.131 2.127l.392.795c.302.61.348.667.386.7a.502.502 0 00.086.063c.043.025.11.052.786.15l.877.128c.958.139 1.764.256 2.372.418.606.162 1.276.43 1.671 1.062a2.5 2.5 0 01.375 1.152c.052.744-.333 1.354-.728 1.841-.397.489-.98 1.058-1.674 1.733l-.634.619c-.489.476-.527.537-.548.583a.506.506 0 00-.033.101c-.01.05-.015.122.1.794l.15.873c.164.954.302 1.758.335 2.386.034.627-.014 1.346-.493 1.918a2.5 2.5 0 01-.98.712c-.692.279-1.39.102-1.976-.124-.588-.226-1.309-.605-2.165-1.056l-.785-.412c-.603-.317-.674-.335-.724-.34a.496.496 0 00-.106 0c-.05.005-.12.023-.724.34l-.785.412c-.856.45-1.577.83-2.165 1.056-.585.226-1.284.403-1.976.124a2.501 2.501 0 01-.98-.712c-.48-.572-.527-1.291-.493-1.918.033-.628.171-1.431.335-2.386l.15-.873c.115-.672.11-.745.1-.794a.5.5 0 00-.033-.101c-.02-.046-.06-.107-.548-.583l-.634-.619c-.694-.675-1.277-1.244-1.674-1.733-.395-.487-.78-1.097-.728-1.841a2.5 2.5 0 01.375-1.152c.395-.633 1.065-.9 1.67-1.062.61-.162 1.415-.28 2.373-.418l.877-.128c.675-.098.743-.125.786-.15a.5.5 0 00.086-.062c.038-.034.084-.09.386-.701l.392-.795c.428-.868.789-1.599 1.131-2.127.341-.527.803-1.08 1.526-1.262zm.493 1.939c-.023.013-.132.089-.34.41-.271.418-.58 1.042-1.045 1.982l-.364.738-.05.103c-.213.434-.428.872-.788 1.197a2.5 2.5 0 01-.43.312c-.42.241-.903.31-1.381.379a52.6 52.6 0 00-.114.016l-.815.119c-1.037.15-1.725.252-2.207.38-.37.099-.476.18-.495.197a.5.5 0 00-.07.216c.005.025.044.153.285.45.314.386.811.874 1.562 1.605l.59.575.082.08c.346.336.697.676.895 1.118.072.162.127.332.164.506.1.474.016.955-.067 1.431l-.02.113-.138.811c-.178 1.033-.294 1.72-.32 2.217-.02.382.023.508.034.532.05.058.113.103.183.133.026.003.16.006.516-.132.465-.18 1.082-.502 2.01-.99l.728-.382.102-.054c.427-.226.859-.454 1.34-.505.177-.02.355-.02.532 0 .481.051.913.28 1.34.505l.102.054.728.383c.928.487 1.545.81 2.01.99.357.137.49.134.516.13a.499.499 0 00.183-.132c.01-.024.055-.15.034-.532-.026-.497-.142-1.184-.32-2.217l-.139-.81-.02-.114c-.082-.476-.166-.957-.066-1.431.037-.174.092-.344.164-.506.198-.442.549-.782.895-1.118a20.8 20.8 0 00.083-.08l.59-.575c.75-.731 1.247-1.219 1.561-1.606.241-.296.28-.424.285-.45a.5.5 0 00-.07-.215c-.02-.017-.126-.098-.495-.196-.482-.129-1.17-.23-2.207-.381l-.815-.119-.113-.016c-.479-.068-.963-.138-1.382-.379a2.5 2.5 0 01-.43-.312c-.36-.325-.575-.763-.788-1.197a31.757 31.757 0 00-.05-.103l-.364-.738c-.464-.94-.774-1.564-1.045-1.982-.208-.321-.317-.397-.34-.41a.5.5 0 00-.226 0zm8.326 6.044v.002-.002zm-3.246 9.575h-.002.002zm-9.934 0h.002-.002zm-3.246-9.575v.002-.002z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          id="headlessui-popover-button-:r7:"
                          aria-expanded="false"
                          data-headlessui-state=""
                        >
                          <div className="flex  h-full  cursor-pointer items-center rounded p-[3px] text-lg text-neutral-400 transition-colors hover:bg-neutral-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M11.5 5.5a7 7 0 107 7 1 1 0 112 0 9 9 0 11-9-9 1 1 0 110 2z"
                                clip-rule="evenodd"
                              ></path>
                              <path
                                fill-rule="evenodd"
                                d="M20.207 3.793a1 1 0 010 1.414l-7 7a1 1 0 01-1.414-1.414l7-7a1 1 0 011.414 0z"
                                clip-rule="evenodd"
                              ></path>
                              <path
                                fill-rule="evenodd"
                                d="M14.5 4.5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0v-3h-3a1 1 0 01-1-1z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 pt-4">
                  <Markdown md={markdown || ""} />
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex h-full w-2 items-center justify-center transition hover:cursor-col-resize hover:bg-neutral-100 hover:opacity-20"
            onMouseDown={handleMouseDown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2 14"
              width="2"
              height="14"
              fill="currentColor"
              className="-translate-y-8 text-neutral-800 transition"
            >
              <circle
                r="1"
                transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 1)"
              ></circle>
              <circle
                r="1"
                transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 7)"
              ></circle>
              <circle
                r="1"
                transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 1 13)"
              ></circle>
            </svg>
          </div>
          <div
            id="right-container"
            className="h-full"
            style={{ width: `calc(${100 - position}% - 4px)` }}
          >
            <div className="flex h-full flex-col">
              <div className="flex h-9 w-full items-center justify-between rounded-t border-b border-neutral-700 bg-neutral-900 px-4"></div>
              <div className="flex h-full w-full overflow-y-auto rounded-b bg-neutral-800"></div>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}
