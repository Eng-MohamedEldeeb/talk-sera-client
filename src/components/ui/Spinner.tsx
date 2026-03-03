export const Spinner = ({ fullPage }: { fullPage?: boolean }) => {
  const el = (
    <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C]/20 border-t-[#C9A84C] animate-spin" />
  );
  if (fullPage)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#07080F]">
        {el}
      </div>
    );
  return el;
};
