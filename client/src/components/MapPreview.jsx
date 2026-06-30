import { Link } from "react-router-dom";

function MapPreview() {
  return (
    
<section className="py-24 px-10 bg-slate-950 text-center text-white mt-20">

  <h2 className="text-5xl font-bold mb-4">
    🗺 Open Community Map
  </h2>

  <p className="text-slate-400 text-lg mb-8">
    Explore civic complaints across communities and track issue locations in real time.
  </p>

<div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-xl">

  <div className="w-full h-[500px] bg-slate-800 flex items-center justify-center">

    <div className="absolute left-6 top-6 bg-slate-900/95 p-8 rounded-2xl w-80 border border-slate-700">

      <h3 className="text-2xl font-bold mb-4 text-white">
        Community Map
      </h3>

      <p className="text-slate-400 mb-6">
        Real-time overview of reported issues.
      </p>

      <div className="space-y-4">
        <div>
          <h4 className="text-blue-400 font-bold">Total Issues</h4>
          <p className="text-3xl text-white">523</p>
        </div>

        <div>
          <h4 className="text-yellow-400 font-bold">In Progress</h4>
          <p className="text-3xl text-white">312</p>
        </div>

        <div>
          <h4 className="text-green-400 font-bold">Resolved</h4>
          <p className="text-3xl text-white">211</p>
        </div>
      </div>

    </div>

    <h2 className="text-4xl text-slate-400 font-semibold">
      Live Community Map Preview
    </h2>

  </div>

</div>
  <Link
    to="/map"
    className="inline-block mt-6 text-blue-400 font-semibold hover:text-blue-300"
  >
    Open Community Map →
  </Link>

</section>
  );
}

export default MapPreview;