import "./Langs.css";
import { useTranslation } from "react-i18next";
import { BiChevronDown } from "react-icons/bi";

const Langs = () => {
  const { i18n } = useTranslation();
  const toggle = () => {
    const el = document.querySelector(".langs ul") as HTMLUListElement;
    el.classList.toggle("activeLangs");
  };
  return (
    <div onClick={toggle} className="langs">
      <div className="hov">
        Languages <BiChevronDown />{" "}
      </div>
      <ul>
        <li onClick={() => i18n.changeLanguage("en")}>English</li>
        <li onClick={() => i18n.changeLanguage("fr")}>French</li>
        <li onClick={() => i18n.changeLanguage("ar")}>Arabic</li>
      </ul>
    </div>
  );
};

export default Langs;
