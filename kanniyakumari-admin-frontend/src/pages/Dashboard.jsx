export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 pt-24 pb-28">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome, Admin
        </h1>
        <p className="text-slate-400 mt-2">
          Control panel for managing the system
        </p>
      </div>

      {/* UI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {[
          "Manage Problems",
          "Manage Businesses",
          "Manage Hospitals",
          "Manage Schools",
          "Tourist Places",
          "System Settings",
        ].map((title, i) => (
          <div
            key={i}
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80"
          >
            <h2 className="text-xl font-semibold mb-2">
              {title}
            </h2>
            <p className="text-sm text-slate-400">
              Access and manage {title.toLowerCase()}
            </p>

            {/* Hover line */}
            <div className="mt-4 h-[2px] w-0 bg-blue-500 group-hover:w-12 transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Footer Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl p-8 text-center">
        <h3 className="text-lg font-semibold">
          Admin Workspace
        </h3>
        <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Use the navigation bar to switch between sections and manage content efficiently.
        </p>
      </div>

    </div>
  );
}
