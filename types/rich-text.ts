export type RichTextChild = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type ListItemNode = {
  type: "list-item";
  children: RichTextChild[];
};

export type RichTextNode = {
  type: "paragraph" | "list" | "heading";
  children: (RichTextChild | ListItemNode)[];
  format?: "unordered" | "ordered"; // Para las listas
  level?: number; // Para encabezados
};
