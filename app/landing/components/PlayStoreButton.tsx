import "./PlayStoreButton.css";
import play from "../landingAssets/play.svg";
import Image from "next/image";

const PlayStoreButton = () => {
  return (
    <a className="google" href="">
      <Image src={play} alt="" />
      <div className="text">
        <p>GET IT ON</p>
        <p>Google Play</p>
      </div>
    </a>
  );
};

export default PlayStoreButton;
