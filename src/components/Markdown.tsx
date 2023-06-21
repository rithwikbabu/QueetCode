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
                  children={children}
                  {...props}
                />
              );
            }
            // The code block inside a pre tag will just render the children
            return <>{children}</>;
          },
          p: ({ ...props }) => <p className="mb-4" {...props} />,
          li: ({ ...props }) => <li className="mb-3" {...props} />,
          ul: ({ ...props }) => <ul className="mx-4 mb-4" {...props} />,
          pre: ({ ...props }) => (
            <pre
              className="my-4 whitespace-pre-wrap rounded-lg bg-[#ffffff12] p-4 text-sm leading-5 text-[#eff1f6bf]"
              {...props}
            />
          ),
        }}
      />
    </div>
  );
};

export default Markdown;
