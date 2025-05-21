import building from "../src/assets/building.svg";
import construction from "../src/assets/construction.svg";
import design from "../src/assets/design.svg";
import document from "../src/assets/document.svg";
import paint from "../src/assets/paint.svg";
import support from "../src/assets/support.svg";

import { IoDocumentTextSharp } from "react-icons/io5";
import { MdOutlineDesignServices } from "react-icons/md";
import { FaRegBuilding } from "react-icons/fa";
import { FaSitemap } from "react-icons/fa";

import client1 from "../src/assets/client1.png";
import client2 from "../src/assets/client2.png";
import client3 from "../src/assets/client3.png";

export const allservices = [
   {
    icon: building,
    title: "Structural Renovation",
    about:
      "We revamp and reinforce existing public and commercial structures, including water purifier enclosures, using quality materials.",
  },
  {
    icon: construction,
    title: "Sliding Window Installation",
    about:
      "Expert fabrication and fitting of aluminum and UPVC sliding windows that ensure safety, airflow, and modern aesthetics.",
  },
  {
    icon: design,
    title: "Architectural Design & Planning",
    about:
      "Custom layout planning and visualization using modern tools to match the site’s purpose, space, and visual harmony.",
  },
  {
    icon: document,
    title: "Official Documentation Support",
    about:
      "We assist in creating and managing essential documentation such as work quotes, layout drafts, and licensing paperwork.",
  },
  {
    icon: paint,
    title: "Interior & Exterior Finishing",
    about:
      "We provide detailed finishing services including paint, sealing, and protective coating to elevate the final look of each project.",
  },
  {
    icon: support,
    title: "24x7 Customer Support",
    about:
      "Dedicated support team ready to handle queries, project updates, and after-installation maintenance across all services.",
  },
];

export const planning = [
  {
    icon: IoDocumentTextSharp,
    title: "Planning & Documentation",
    about:
      "We analyze project requirements, provide on-site assessment, handle all necessary documentation like project proposals and paperwork.",
  },
  {
    icon: MdOutlineDesignServices,
    title: "Custom Design Solutions",
    about:
      "Tailored infrastructure and layout designs using modern techniques and materials like UPVC, aluminum, and MS for long-lasting solutions.",
  },
  {
    icon: FaRegBuilding,
    title: "Building & Framing",
    about:
      "Expert construction of structural frames, protective enclosures, and sliding windows around public utilities and commercial properties.",
  },
  {
    icon: FaSitemap,
    title: "Final Finishing & Setup",
    about:
      "We handle complete finishing — from painting and sealing to secure installations — ensuring projects are ready for safe, aesthetic public use.",
  },
];

export const clients = [
  {
    image: client1,
    name: "Alex Parker",
    about:
      "AARA INFRAA delivered exactly what we needed. Their attention to detail during the installation of safety enclosures was impressive.",
    post: "Project Supervisor",
  },
  {
    image: client2,
    name: "Drew James",
    about:
      "Their team helped us with custom design solutions and high-quality materials. We are extremely satisfied with their professionalism.",
    post: "Site Architect",
  },
  {
    image: client3,
    name: "Sam Peterson",
    about:
      "Excellent service and on-time completion! The team ensured safety and durability for our public purifier frame installations. Great job overall!",
    post: "Construction Lead",
  },
];
