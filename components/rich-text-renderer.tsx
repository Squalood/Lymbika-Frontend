import React from "react";

// Tipos compatibles con Strapi RichText
export type RichTextNode = {
  type: string;
  children: RichTextChild[];
  format?: string; // Para las listas
  level?: number; // Para encabezados
};

type RichTextChild = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

type RichTextRendererProps = {
  content: RichTextNode[];
};

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  return (
    <div className="space-y-4">
      {content.map((node, idx) => {
        switch (node.type) {
          case "paragraph":
            return (
              <p key={idx}>
                {node.children.map((child, cIdx) => (
                  <RichTextChildRenderer key={cIdx} child={child} />
                ))}
              </p>
            );

          case "list":
            if (node.format === "unordered") {
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1">
                  {node.children.map((item: any, i: number) => (
                    <li key={i}>
                      {item.children.map((child: RichTextChild, j: number) => (
                        <RichTextChildRenderer key={j} child={child} />
                      ))}
                    </li>
                  ))}
                </ul>
              );
            } else if (node.format === "ordered") {
              return (
                <ol key={idx} className="list-decimal pl-5 space-y-1">
                  {node.children.map((item: any, i: number) => (
                    <li key={i}>
                      {item.children.map((child: RichTextChild, j: number) => (
                        <RichTextChildRenderer key={j} child={child} />
                      ))}
                    </li>
                  ))}
                </ol>
              );
            }
            return null;

          case "heading":
            if (node.level === 1) return <h1 key={idx} className="text-3xl font-bold">{node.children.map((child, cIdx) => <RichTextChildRenderer key={cIdx} child={child} />)}</h1>;
            if (node.level === 2) return <h2 key={idx} className="text-2xl font-bold">{node.children.map((child, cIdx) => <RichTextChildRenderer key={cIdx} child={child} />)}</h2>;
            if (node.level === 3) return <h3 key={idx} className="text-xl font-bold">{node.children.map((child, cIdx) => <RichTextChildRenderer key={cIdx} child={child} />)}</h3>;
            if (node.level === 4) return <h4 key={idx} className="text-lg font-bold">{node.children.map((child, cIdx) => <RichTextChildRenderer key={cIdx} child={child} />)}</h4>;
            return null;

          default:
            return null;
        }
      })}
    </div>
  );
};

const RichTextChildRenderer: React.FC<{ child: RichTextChild }> = ({ child }) => {
  let className = "";
  if (child.bold) className += " font-semibold";
  if (child.italic) className += " italic";
  if (child.underline) className += " underline";

  return <span className={className}>{child.text}</span>;
};

export default RichTextRenderer;