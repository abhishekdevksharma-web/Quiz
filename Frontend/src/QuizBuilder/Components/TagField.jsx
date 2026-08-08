import React, { useContext } from "react";
import { Hash, Pencil } from "lucide-react";
import AdminContext from "../../context/adminContext/adminContext";

function TagField() {
  const { quizMeta, setQuizMeta, colorMode } = useContext(AdminContext);

  return (
    <div
      className={`flex flex-1 items-center h-9 rounded-lg border px-3 gap-2 text-sm transition-all
      ${
        colorMode
          ? "bg-slate-900 border-slate-700 text-slate-100 focus-within:border-indigo-500"
          : "bg-white border-slate-300 text-slate-900 focus-within:border-indigo-500"
      }`}
    > 
      <Hash
        size={16}
        className={colorMode ? "text-slate-400" : "text-slate-500"}
      />
 
      <span
        className={`text-xs font-medium ${
          colorMode ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Tag
      </span>
 
      <span className="mx-1 text-slate-400">|</span>
 
      <input
        type="text"
        value={quizMeta.tag}
        onChange={(e) =>
          setQuizMeta((prev) => ({
            ...prev,
            tag: e.target.value,
          }))
        }
        placeholder="#"
        className="w-12 bg-transparent outline-none text-sm uppercase"
      />
 
      <Pencil
        size={14}
        className={colorMode ? "text-slate-400" : "text-slate-500"}
      />
    </div>
  );
}

export default TagField;
