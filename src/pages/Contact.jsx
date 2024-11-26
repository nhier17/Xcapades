import { useRef, } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../components/AnimatedTitle";
import Button from "../components/Button";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const imageRef = useRef(null);

    useGSAP(() => {
      // GSAP animation
      gsap.fromTo(
        imageRef.current,
        { x: "50%", scale: 1.5, skewX: 20 }, // Initial state
        {
          x: "0%",
          scale: 1,
          skewX: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true, // Smooth animation tied to scroll
          },
        }
      );
    }, []);

  return (
    <div className="min-h-screen w-screen bg-yellow-300 py-24 px-5 sm:px-10">
      {/* Hero Section */}
      <h1 className="special-font text-black uppercase text-center hero-heading">
        c<b>o</b>ntact us
      </h1>
      <div className="flex justify-center mt-5">
        <img
          ref={imageRef}
          src="img/contact.png"
          alt="Contact illustration"
          className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
        />
      </div>
      
      {/* Main Content */}
      <div className="bg-white mt-16 w-screen h-dvh">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Got a question?</h2>
          <AnimatedTitle
            title="Get in to<b>u</b>ch <br /> <b>w</b>ith us"
            containerClass="mt-5 capitalize text-xl font-bold"
          />
        </div>

        {/* Inquiry Details */}
        <div className="mt-10 space-y-8">
          {[
            { id: "001", text: "General Enquiries" },
            { id: "002", text: "Careers" },
            { id: "003", text: "Partner Enquiries" },
            { id: "004", text: "Press Enquiries" },
          ].map((item) => (
            <div key={item.id} className="flex items-start">
              <h1 className="text-lg font-bold text-yellow-600">{item.id}</h1>
              <p className="ml-5 text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-10">
          <Button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
