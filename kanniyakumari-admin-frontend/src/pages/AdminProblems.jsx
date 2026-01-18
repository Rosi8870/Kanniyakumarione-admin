import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getAdminProblems,
  approveProblem,
  rejectProblem,
  deleteProblem,
} from "../services/problems.admin.service";

export default function AdminProblems() {
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      setItems(await getAdminProblems());
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reported Problems</h1>

      {items.map(p => (
        <div key={p.id} className="border rounded-xl p-4 mb-4">
          <h2 className="font-semibold">{p.title}</h2>
          <p className="text-sm text-gray-600">{p.description}</p>

          {p.imageUrl && (
            <img
              src={p.imageUrl}
              className="mt-2 rounded-lg"
            />
          )}

          <div className="flex gap-2 mt-3">
            <button
              onClick={async () => {
                await approveProblem(p.id);
                toast.success("Approved");
                load();
              }}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Approve
            </button>

            <button
              onClick={async () => {
                await rejectProblem(p.id);
                toast("Rejected");
                load();
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Reject
            </button>

            <button
              onClick={async () => {
                await deleteProblem(p.id);
                toast.error("Deleted");
                load();
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
