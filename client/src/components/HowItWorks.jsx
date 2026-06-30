import {
  FaUpload,
  FaRobot,
  FaMapMarkedAlt,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload />,
    title: "Upload",
    desc: "Upload an image of the issue.",
  },
  {
    icon: <FaRobot />,
    title: "AI Analysis",
    desc: "AI detects the issue type automatically.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Location",
    desc: "Select the exact location on the map.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Resolved",
    desc: "Authorities resolve the complaint.",
  },
];

function HowItWorks() {
  return (
    <section className="py-24 px-10 bg-slate-950 text-white">
      <h2 className="text-4xl font-bold text-center mb-16">
        How It Works
      </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
       <div
  key={index}
className="bg-slate-900 p-10 min-h-[250px] rounded-2xl border border-slate-700 hover:border-blue-500 transition duration-300 flex flex-col justify-center">
            <div className="text-7xl text-blue-500 mb-6">
              {step.icon}
            </div>

            <h3 className="text-2xl font-bold mb-4">
              {step.title}
            </h3>

            <p className="text-slate-300 text-lg leading-7">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;