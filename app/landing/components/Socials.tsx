import "./Socials.css";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

const Socials = () => {
  return (
    <div className="socials">
      <a href="">
        <AiFillFacebook size={25} />
      </a>
      <a href="">
        <AiFillInstagram size={25} />
      </a>
    </div>
  );
};

export default Socials;
