import React, { useEffect, useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";

export default function EmailSend({ templates }) {
  const [to, setTo] = useState("");
  const [template, setTemplate] = useState(templates[0]?.key || "");
  const [subject, setSubject] = useState(templates[0]?.defaultSubject || "");
  const [vars, setVars] = useState({}); // key:value map
  const [placeholders, setPlaceholders] = useState(templates[0]?.placeholders || []);

  useEffect(() => {
    const t = templates.find(t => t.key === template);
    if (t) {
      setSubject(t.defaultSubject);
      setPlaceholders(t.placeholders);
      // reset vars for the selected template (optional)
      const fresh = {};
      t.placeholders.forEach(p => (fresh[p] = ""));
      setVars(fresh);
    }
  }, [template]);

  const submit = (e) => {
    e.preventDefault();
    router.post(route("admin.email.send"), { to, template, subject, vars });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Head title="Send Email" />
      <h1 className="text-2xl font-semibold mb-4">Send Email</h1>

      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Recipient Email</label>
          <input type="email" className="mt-1 w-full border rounded p-2"
                 value={to} onChange={(e)=>setTo(e.target.value)} required />
        </div>

        <div>
          <label className="block text-sm font-medium">Template</label>
          <select className="mt-1 w-full border rounded p-2"
                  value={template} onChange={(e)=>setTemplate(e.target.value)}>
            {templates.map(t => (
              <option key={t.key} value={t.key}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input type="text" className="mt-1 w-full border rounded p-2"
                 value={subject} onChange={(e)=>setSubject(e.target.value)} />
        </div>

        <div className="border rounded p-3">
          <p className="text-sm font-medium mb-2">Placeholders</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {placeholders.map((ph) => (
              <div key={ph}>
                <label className="block text-xs text-gray-600">[{ph}]</label>
                <input className="mt-1 w-full border rounded p-2"
                       value={vars[ph] ?? ""}
                       onChange={(e)=>setVars({...vars, [ph]: e.target.value})}
                       placeholder={`Value for [${ph}]`} />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Only fields you fill will be replaced. Others keep their bracket text.
          </p>
        </div>

        <button type="submit"
          className="px-4 py-2 rounded bg-teal-600 text-white font-semibold">
          Send Email
        </button>
      </form>
    </div>
  );
}
