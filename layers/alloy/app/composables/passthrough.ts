export const usePassthrough = <P, E = {}>(
  userPT: MaybeRefOrGetter<Passthrough<P, E> | undefined>,
  localPT: MaybeRefOrGetter<Recipe<P, E>>,
) => computed(() => passthrough(toValue(userPT), toValue(localPT)));

export const useItemPassthrough = <T, P, E = {}>(
  items: MaybeRefOrGetter<T[]>,
  userPT: MaybeRefOrGetter<Passthrough<P, E> | undefined>,
  localPT: (item: T) => Recipe<P, E>,
) =>
  computed(() =>
    toValue(items).map((item) => ({
      item,
      pt: passthrough(toValue(userPT), localPT(item)),
    })),
  );
