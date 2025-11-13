// separator is `-` to maintain css var convention
const separator = "-" as const;

type MergeTokenChunks<T extends string, S extends string> = T extends ""
  ? T
  : `${S}${T}`;

type Tokenize<S extends string, T extends string[]> = T extends [
  infer F extends string,
  ...infer R extends string[],
]
  ? `${F}${MergeTokenChunks<Tokenize<S, R>, S>}`
  : "";

export const tokenize = <C extends string[]>(...chunks: C) => {
  return chunks.join(separator) as Tokenize<typeof separator, C>;
};
