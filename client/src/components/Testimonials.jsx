function Testimonials() {
  const users = [
    {
      name: "Citizen",
      text: "Reporting issues has become much faster with CivicTrack AI.",
    },
    {
      name: "Municipal Officer",
      text: "The dashboard helps us monitor complaints efficiently.",
    },
    {
      name: "Community Volunteer",
      text: "Live maps make it easy to identify problem areas.",
    },
  ];

  return (
    <section className="py-24 px-10 bg-slate-950 text-white">
      <h2 className="text-4xl font-bold text-center mb-16">
        What People Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-slate-900 p-8 rounded-2xl border border-slate-700"
          >
            <p className="text-slate-400 mb-6">
              "{user.text}"
            </p>

            <h3 className="font-bold text-blue-400">
              {user.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;