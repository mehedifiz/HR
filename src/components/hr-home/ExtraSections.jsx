import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Link } from "react-router-dom";

function ExtraSections() {
  return (
    <section className="py-6">
      <div className="flex justify-center items-center md:py-8 py-3">
        <SectionTitle sectionTitle={"Contact Us"} />
      </div>

      <div className="container mx-auto">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <img
                src="https://i.ibb.co/HtcfVn7/about.jpg"
                alt="Image"
                className="rounded-md"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-lato py-8 w-5/6 md:w-4/6 md:px-0 px-2 mx-auto text-center">
                Please email us right away if you experience any problems with
                this software.
              </h3>
              <form noValidate="" className="space-y-5 md:px-8 px-5">
                <div>
                  <label htmlFor="name" className="text-sm">
                    <strong>Full name</strong>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder=""
                    className="w-full p-3 rounded border"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm">
                    <strong>Email</strong>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 rounded border"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-sm">
                    <strong>Message</strong>
                  </label>
                  <textarea
                    id="message"
                    rows="3"
                    className="w-full p-2 rounded border"
                  ></textarea>
                </div>
                <button
                  disabled
                  className="w-full p-3 text-sm font-lato bg-primary text-white font-bold tracking-wide uppercase rounded"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExtraSections;
