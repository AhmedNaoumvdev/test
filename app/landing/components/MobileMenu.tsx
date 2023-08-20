import "./MobileMenu.css";

const MobileMenu = () => {
  const toggle = () => {
    const el = document.querySelector(".ul") as HTMLUListElement;
    console.log("working");
    el.classList.toggle("active");
  };
  return (
    <div>
      <input
        onChange={toggle}
        className="check-icon"
        id="check-icon"
        name="check-icon"
        type="checkbox"
      />
      <label className="icon-menu" htmlFor="check-icon">
        <div className="bar bar--1"></div>
        <div className="bar bar--2"></div>
        <div className="bar bar--3"></div>
      </label>
    </div>
  );
};

export default MobileMenu;
