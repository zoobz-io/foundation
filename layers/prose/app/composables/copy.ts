export const useCopyAnchor = (id: string) => {
  const copied = ref(false);

  const copyAnchor = async () => {
    if (!id) return;

    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    await navigator.clipboard.writeText(url);

    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  };

  return {
    copied,
    copyAnchor,
  };
};
