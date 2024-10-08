import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-primary ">
      <footer className="footer container mx-auto  py-12 text-white">
        <aside className="flex flex-col md:mx-0 mx-auto md:items-start items-center">
          <Link to="/">
            <h1 className="font-extrabold font-roboto lg:text-4xl md:text-3xl text-xl">
              Keepo
            </h1>
          </Link>
          <p className="lg:text-base text-sm font-lato">
            Most Efficient Asset Management Solutions
          </p>
        </aside>
        <nav className="flex flex-col md:mx-0 mx-auto md:items-start items-center">
          <h6 className="font-bold font-roboto lg:text-2xl md:text-xl text-lg text-white">
            Services
          </h6>
          <a className="link link-hover underline">Branding</a>
          <a className="link link-hover underline">Design</a>
          <a className="link link-hover underline">Marketing</a>
          <a className="link link-hover underline">Advertisement</a>
        </nav>
        <nav className="flex flex-col md:mx-0 mx-auto md:items-start items-center">
          <h6 className="font-bold font-roboto lg:text-2xl md:text-xl text-lg text-white">
            Company
          </h6>
          <a className="link link-hover underline">About us</a>
          <a className="link link-hover underline">Contact</a>
          <a className="link link-hover underline">Jobs</a>
          <a className="link link-hover underline">Press kit</a>
        </nav>
        <nav className="flex flex-col md:mx-0 mx-auto md:items-start items-center">
          <h6 className="font-bold font-roboto lg:text-2xl md:text-xl text-lg text-white">
            Legal
          </h6>
          <a className="link link-hover underline">Terms of use</a>
          <a className="link link-hover underline">Privacy policy</a>
          <a className="link link-hover underline">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
