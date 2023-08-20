import "./DarkButton.css";

const DarkButton = () => {
  const toggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const body = document.querySelector("body") as HTMLBodyElement;
    if (e.target.checked) body.classList.add("dark");
    else body.classList.remove("dark");
  };
  return (
    <div className="dark">
      <input type="checkbox" className="theme-checkbox" onChange={toggle} />
    </div>
  );
};

export default DarkButton;
