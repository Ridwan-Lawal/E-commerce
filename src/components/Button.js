export function Button({
  content = "Button",
  bgColor = "bg-slate-800",
  textColor = "text-white",
  width = "w-full",
}) {
  return (
    <button
      className={`${bgColor} ${width} ${textColor} py-2.5 text-lg font-medium`}
    >
      {content}
    </button>
  );
}
