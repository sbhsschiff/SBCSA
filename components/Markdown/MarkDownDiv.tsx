import type { JSX } from "react";
import { MarkDownBlock } from "@/common/interfaces/markdown";

interface MarkUpDivProps {
  blocks: MarkDownBlock[];
}

function GenerateMarkDownSpan({ block }: { block: MarkDownBlock }): JSX.Element {
  const cN = (block.markdown ?? "").split(" ").reduce((classNames, item) => {
    switch (item) {
      case "bold":
        return classNames + " font-bold ";
      case "italic":
        return classNames + " italic ";
      case "underline":
        return classNames + " underline ";
      case "strikethrough":
        return classNames + " line-through ";
      default:
        return classNames;
    }
  }, "");
  const content =
    block.markdown && block.markdown.includes("newline") ? (
      <>
        {block.content}
        <br />
      </>
    ) : (
      block.content
    );

  return (
    <span className={cN}>
      {block.href ? (
        <a target="_blank" rel="noopener noreferrer" href={block.href} className="hover:text-viking-gold underline">
          {content}
        </a>
      ) : (
        content
      )}
    </span>
  );
}

export default function MarkDownDiv({ blocks }: MarkUpDivProps) {
  return (
    <div>
      <p>
        {blocks.map((item, index) => (
          <GenerateMarkDownSpan key={index} block={item} />
        ))}
      </p>
    </div>
  );
}
