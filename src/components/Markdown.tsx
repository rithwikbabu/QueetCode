import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  md: string;
};

const Markdown: React.FC<MarkdownProps> = ({ md }) => {
  return (
    <div className="flex w-full flex-col text-sm text-white">
      <ReactMarkdown
        children={md}
        remarkPlugins={[remarkGfm]}
        components={{
          code: ({ inline, children, ...props }) => {
            if (inline) {
              return (
                <code
                  className="rounded-[5px] border border-[#f7faff1f]
                            bg-[#ffffff12] p-[.125rem] text-xs leading-4 text-[#eff1f6bf]"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            // The code block inside a pre tag will just render the children
            return <>{children}</>
          },
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="mb-3" {...props} />,
          ul: ({ node, ...props }) => <ul className="mb-4 mx-4" {...props} />,
          pre: ({ node, ...props }) => (
            <pre
              className="bg-[#ffffff12] text-[#eff1f6bf] rounded-lg text-sm leading-5 my-4 p-4 whitespace-pre-wrap"
              {...props}
            />
          ),
        }}
      />
    </div>
  );
};

export default Markdown;
