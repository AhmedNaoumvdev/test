"use client";
import "./Landing.css";
import heroImg from "./landingAssets/Browser Frame.svg";
import phoneHero from "./landingAssets/phone.svg";
import feature1 from "./landingAssets/feature1.svg";
import feature1_1 from "./landingAssets/feature1-1.svg";
import phones from "./landingAssets/phones.svg";
import { AiOutlineDownload } from "react-icons/ai";
import DarkButton from "./components/DarkButton";
import PlayStoreButton from "./components/PlayStoreButton";
import Logo from "./components/Logo";
import Socials from "./components/Socials";
import { useTranslation } from "react-i18next";
import Langs from "./components/Langs";
import MobileMenu from "./components/MobileMenu";
import Link from "next/link";
import "../../i18n";
import Image from "next/image";

const Landing = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <div className="container">
      <nav className="nav">
        <Logo />
        <div>
          <ul className="ul">
            <a href="#feature">
              <li className="li">Features</li>
            </a>
            <a href="">
              <li className="li">Pricing</li>
            </a>
            <a href="">
              <li className="li">Support</li>
            </a>
            <div className="line"></div>
            <Link href={"/signin"}>
              <li className="li">Login</li>
            </Link>
            <Langs />
            <DarkButton />
          </ul>
          <MobileMenu />
        </div>
      </nav>
      {/* hero section */}
      <section className="hero">
        <div className="contents">
          <div className="texts">
            <h1> {t("hero.head")} </h1>
            <p className="description">{t("hero.desc")}</p>
            <div className="buttons">
              <Link href={"/signin"}>{t("hero.btn")}</Link>
              <a href="" className="downloadButtonHero">
                <AiOutlineDownload size={24} />
                {t("hero.download")}
              </a>
            </div>
          </div>
        </div>
        <div className="photos">
          <Image className="desktop" src={heroImg} alt="" />
          <Image className="phone" src={phoneHero} alt="" />
        </div>
      </section>
      {/* features section */}
      <section className="feature one" id="feature">
        <div className="contents">
          <div className="texts">
            <h1> {t("featureOne.head")} </h1>
            <p className="description">{t("featureOne.desc")}</p>
          </div>
        </div>
        <div className="photos">
          <Image className="feature1" src={feature1} alt="" />
          <Image className="feature1-1" src={feature1_1} alt="" />
        </div>
      </section>
      <section className="feature two">
        <div className="photos">
          <Image className="feature1" src={feature1} alt="" />
        </div>
        <div className="contents">
          <div className="texts">
            <h1>{t("featureTwo.head")}</h1>
            <p className="description">{t("featureTwo.desc")}</p>
          </div>
        </div>
      </section>
      <section className="feature">
        <div className="contents">
          <div className="texts">
            <h1>{t("featureThree.head")}</h1>
            <p className="description">{t("featureThree.desc")}</p>
          </div>
        </div>
        <div className="photos">
          <Image className="feature1" src={feature1} alt="" />
        </div>
      </section>
      {/* mobile download */}
      <section className="callToDownload">
        <div className="photos">
          <Image className="phones" src={phones} alt="" />
        </div>
        <div className="contents">
          <div className="texts">
            <h4> {t("call.calling")} </h4>
            <h1>{t("call.head")}</h1>
            <p className="description">{t("call.desc")}</p>
            <PlayStoreButton />
          </div>
        </div>
      </section>
      {/* footer */}
      <footer>
        <div className="footerContents">
          <Logo />
          <div className="company sec">
            <h3>Company</h3>
            <a href="">
              <h4>About</h4>
            </a>
            <a href="">
              <h4>Feature</h4>
            </a>
            <a href="">
              <h4>Pricing</h4>
            </a>
          </div>
          <div className="help sec">
            <h3>help</h3>
            <a href="">
              <h4>Customer Support</h4>
            </a>
            <a href="">
              <h4>Terms & Conditions</h4>
            </a>
            <a href="">
              <h4>Privacy policy</h4>
            </a>
          </div>
          <div className="install sec">
            <h3>Install</h3>
            <PlayStoreButton />
          </div>
        </div>
        <div className="separator"></div>
        <div className="copyRights">
          <p>&copy; Copyright {year}, All rights reserved by DELEGUE</p>
          <Socials />
        </div>
      </footer>
    </div>
  );
};

export default Landing;
