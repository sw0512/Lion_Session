export default function Button({
  text,
  type = "button",
  onClick,
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        h-[49px] w-full max-w-[330px]
        px-6 py-3 rounded-xl
        body-lg text-white
        bg-primary-400
        hover:bg-primary-600
        active:bg-primary-700
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-primary-500
        disabled:cursor-not-allowed
        disabled:bg-primary-100
        disabled:text-white
      "
    >
      {text}
    </button>
  );
}
