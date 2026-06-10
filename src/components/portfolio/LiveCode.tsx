/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from "react";

type Lang = "mern" | "cpp" | "python";

const SNIPPETS: Record<Lang, { file: string; code: string }> = {
  mern: {
    file: "~/mern/freelance-dashboard/server.js",
    code: `// MERN  client project management API
import express from "express";
import mongoose from "mongoose";
import Project from "./models/Project.js";

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.post("/api/projects", async (req, res) => {
  const { title, client, budget, deadline, status } = req.body;

  const project = await Project.create({
    title,
    client,
    budget,
    deadline,
    status: status || "active",
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    project,
  });
});

app.get("/api/projects", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

app.listen(5000, () => {
  console.log("MERN backend running on port 5000");
});`,
  },

  cpp: {
    file: "~/cpp/problem-solving/order_summary.cpp",
    code: `// C++  freelance order cost calculator
#include <iostream>
#include <vector>
using namespace std;

struct Service {
  string name;
  double price;
};

double calculateTotal(vector<Service> services) {
  double total = 0;

  for (Service service : services) {
    total += service.price;
  }

  return total;
}

int main() {
  vector<Service> services = {
    {"Portfolio Website", 25000},
    {"Admin Dashboard", 40000},
    {"Backend API", 30000}
  };

  double total = calculateTotal(services);

  cout << "Freelance Project Summary" << endl;
  cout << "Total Services: " << services.size() << endl;
  cout << "Total Cost: PKR " << total << endl;

  return 0;
}`,
  },

  python: {
    file: "~/python/automation/client_report.py",
    code: `# Python  automated client project report
from datetime import datetime

projects = [
    {"name": "Portfolio Website", "status": "Completed", "progress": 100},
    {"name": "E-Commerce Dashboard", "status": "In Progress", "progress": 75},
    {"name": "Business Landing Page", "status": "Completed", "progress": 100},
]

def generate_report(projects):
    completed = [p for p in projects if p["status"] == "Completed"]

    print("Client Project Report")
    print("Generated:", datetime.now().strftime("%d %b %Y"))
    print("Total Projects:", len(projects))
    print("Completed Projects:", len(completed))
    print()

    for project in projects:
        print(f'{project["name"]} - {project["progress"]}% - {project["status"]}')

generate_report(projects)`,
  },
};

const TABS: { id: Lang; label: string }[] = [
  { id: "mern", label: "MERN" },
  { id: "cpp", label: "C++" },
  { id: "python", label: "Python" },
];

function highlightLine(line: string, lang: Lang) {
  const commentStart =
    lang === "python" ? line.indexOf("#") : line.indexOf("//");

  let codePart = line;
  let commentPart = "";

  if (commentStart !== -1) {
    codePart = line.slice(0, commentStart);
    commentPart = line.slice(commentStart);
  }

  const keywordRegex =
    lang === "cpp"
      ? /\b(include|using|namespace|struct|string|double|int|return|for|if|else|vector|cout|endl|main)\b/g
      : lang === "python"
        ? /\b(from|import|def|return|for|in|if|else|print)\b/g
        : /\b(import|from|const|let|async|await|return|new|if|else|for)\b/g;

  const functionRegex =
    /\b(express|json|connect|post|get|create|status|find|sort|listen|size|calculateTotal|generate_report|strftime|now|append)\b/g;

  const stringRegex = /(".*?"|'.*?'|`.*?`)/g;
  const numberRegex = /\b(\d+)\b/g;

  const parts = codePart.split(
    /(".*?"|'.*?'|`.*?`|\b\d+\b|\b[A-Za-z_][A-Za-z0-9_]*\b)/g,
  );

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (stringRegex.test(part)) {
          stringRegex.lastIndex = 0;
          return <span key={index} className="text-yellow-300">{part}</span>;
        }
        if (numberRegex.test(part)) {
          numberRegex.lastIndex = 0;
          return <span key={index} className="text-orange-300">{part}</span>;
        }
        if (keywordRegex.test(part)) {
          keywordRegex.lastIndex = 0;
          return <span key={index} className="text-pink-400">{part}</span>;
        }
        if (functionRegex.test(part)) {
          functionRegex.lastIndex = 0;
          return <span key={index} className="text-cyan-300">{part}</span>;
        }
        return <span key={index}>{part}</span>;
      })}
      {commentPart && (
        <span className="text-slate-500 italic">{commentPart}</span>
      )}
    </>
  );
}

export default function LiveCode() {
  const [lang, setLang] = useState<Lang>("mern");
  const [text, setText] = useState("");
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const target = SNIPPETS[lang].code;

    if (reduceRef.current) {
      setText(target);
      return;
    }

    setText("");
    let i = 0;

    const id = setInterval(() => {
      i += 2;
      setText(target.slice(0, i));
      if (i >= target.length) clearInterval(id);
    }, 14);

    return () => clearInterval(id);
  }, [lang]);

  const lines = text.split("\n");

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0b1020]/95 shadow-2xl shadow-cyan-500/10 w-full max-w-full">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 bg-[#0f172a]">
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-400 shadow-lg shadow-red-400/40 shrink-0" />
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/40 shrink-0" />
        <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/40 shrink-0" />
        <span className="ml-2 sm:ml-3 font-mono text-[10px] sm:text-xs text-slate-400 truncate min-w-0">
          {SNIPPETS[lang].file}
        </span>
        <span className="ml-auto font-mono text-[10px] sm:text-xs text-cyan-300 animate-pulse shrink-0">
          ● live
        </span>
      </div>

      {/* Language tabs */}
      <div className="flex gap-0.5 sm:gap-1 px-2 sm:px-3 pt-2 sm:pt-3 border-b border-white/10 bg-[#0b1020]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setLang(t.id)}
            className={`font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-t-lg transition-all ${
              lang === t.id
                ? "bg-cyan-400/10 text-cyan-300 border-b-2 border-cyan-300"
                : "text-slate-500 hover:text-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Code area */}
      <pre
        className="font-mono leading-relaxed text-slate-200"
        style={{
          fontSize: "clamp(10px, 2.5vw, 12.5px)",
          padding: "clamp(10px, 3vw, 20px)",
          minHeight: "18rem",
          maxHeight: "26rem",
          overflowX: "auto",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} className="flex">
            <span className="text-slate-600 w-5 sm:w-8 shrink-0 select-none text-right pr-2 sm:pr-3 text-[9px] sm:text-[11px]">
              {i + 1}
            </span>
            <code className="flex-1 min-w-0 whitespace-pre">
              {line ? highlightLine(line, lang) : " "}
            </code>
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-cyan-300 align-middle animate-pulse" />
      </pre>
    </div>
  );
}