import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Brain,
  BriefcaseBusiness,
  Check,
  ClipboardList,
  Loader2,
  Mail,
  Network,
  RotateCcw,
  Sparkles,
  Target,
  UserRound,
  Zap,
} from "lucide-react";
import logoUrl from "../logo.jpg";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd1Qsn1LwcFAiTTT-hqi2pEgkhe8xEY1HgDMASzwNMgCqsweg/formResponse";

const FORM_FIELDS = {
  fullName: "entry.1639203253",
  universityYear: "",
  major: "",
  email: "",
  phone: "",
  cvLink: "",
  result: "entry.935845943",
};

const yearOptions = ["1st year", "2nd year", "3rd year", "Final year", "Other"];

const resultTypes = {
  driver: {
    key: "A",
    icon: Zap,
    name: "Driver",
    headline: "Fast | Action | Results",
    color: "orange",
    accent: "bg-[#f79400]",
    text: "text-[#f79400]",
    border: "border-[#f79400]",
    soft: "bg-orange-50",
    ring: "ring-orange-100",
    summary:
      "You thrive in fast environments where speed, ownership, and outcomes matter more than overthinking.",
    strengths: ["Decisive", "Momentum-focused", "Commercial", "Bold"],
    roles: [
      "Sales / Business Development",
      "Startup / Founder track",
      "Project / Delivery roles",
      "Account Executive",
      "Growth / Performance roles",
    ],
  },
  thinker: {
    key: "B",
    icon: Brain,
    name: "Thinker",
    headline: "Logic | Depth | Insight",
    color: "blue",
    accent: "bg-blue-600",
    text: "text-blue-700",
    border: "border-blue-500",
    soft: "bg-blue-50",
    ring: "ring-blue-100",
    summary:
      "You enjoy solving complex problems and understanding how systems, people, and markets really work.",
    strengths: ["Analytical", "Curious", "Strategic", "Insightful"],
    roles: [
      "Management Consulting",
      "Data Analyst / Business Analyst",
      "Product Strategy",
      "Research roles",
      "Finance / Investment Analyst",
    ],
  },
  operator: {
    key: "C",
    icon: ClipboardList,
    name: "Operator",
    headline: "Structure | Order | Execution",
    color: "teal",
    accent: "bg-teal-600",
    text: "text-teal-700",
    border: "border-teal-500",
    soft: "bg-teal-50",
    ring: "ring-teal-100",
    summary:
      "You make sure things actually get done smoothly, reliably, and on time.",
    strengths: ["Organized", "Reliable", "Process-minded", "Practical"],
    roles: [
      "Project Manager",
      "Operations / BizOps",
      "HR / Admin / People Ops",
      "Supply Chain / Logistics",
      "Program Coordinator",
    ],
  },
  connector: {
    key: "D",
    icon: Network,
    name: "Connector",
    headline: "People | Trust | Communication",
    color: "violet",
    accent: "bg-violet-600",
    text: "text-violet-700",
    border: "border-violet-500",
    soft: "bg-violet-50",
    ring: "ring-violet-100",
    summary:
      "You work best through people, building trust, alignment, and relationships.",
    strengths: ["Empathetic", "Persuasive", "Collaborative", "Warm"],
    roles: [
      "HR / Recruiting",
      "Marketing / Branding",
      "Client Success / Account Management",
      "Community / Partnership roles",
      "PR / Communications",
    ],
  },
};

const questions = [
  {
    question: "You prefer work that is:",
    options: [
      { text: "Fast and results-driven", type: "driver" },
      { text: "Deep and analytical", type: "thinker" },
      { text: "Structured and organized", type: "operator" },
      { text: "People-focused", type: "connector" },
    ],
  },
  {
    question: "When facing a problem, you:",
    options: [
      { text: "Act fast", type: "driver" },
      { text: "Analyze it", type: "thinker" },
      { text: "Make a plan", type: "operator" },
      { text: "Discuss with people", type: "connector" },
    ],
  },
  {
    question: "You dislike:",
    options: [
      { text: "Slow progress", type: "driver" },
      { text: "Confusion in thinking", type: "thinker" },
      { text: "Chaos", type: "operator" },
      { text: "Poor communication", type: "connector" },
    ],
  },
  {
    question: "When learning something new, you:",
    options: [
      { text: "Learn by doing", type: "driver" },
      { text: "Study first", type: "thinker" },
      { text: "Follow steps", type: "operator" },
      { text: "Learn from others", type: "connector" },
    ],
  },
  {
    question: "You want to be known as:",
    options: [
      { text: "Action-oriented", type: "driver" },
      { text: "A smart problem-solver", type: "thinker" },
      { text: "Reliable and structured", type: "operator" },
      { text: "Good with people", type: "connector" },
    ],
  },
];

const baseScores = {
  driver: 0,
  thinker: 0,
  operator: 0,
  connector: 0,
};

const emptyForm = {
  fullName: "",
  universityYear: "",
  major: "",
  email: "",
  phone: "",
  cvLink: "",
};

const appendIfConfigured = (body, field, value) => {
  if (field && value) body.append(field, value);
};

const getResultType = (scoreSet) => {
  const priority = ["driver", "thinker", "operator", "connector"];
  return priority.reduce((winner, type) =>
    scoreSet[type] > scoreSet[winner] ? type : winner,
  );
};

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-4 ${
    hasError
      ? "border-red-400 focus:ring-red-100"
      : "border-slate-200 focus:border-[#f79400] focus:ring-orange-100"
  }`;

function BrandMark({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logoUrl}
        alt="Arches"
        className={compact ? "h-9 w-9 object-contain" : "h-14 w-14 object-contain"}
      />
      <div>
        <div className="font-serif text-2xl leading-none text-[#475156]">
          Arches
        </div>
        {!compact && (
          <div className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#f79400]">
            FutureQuest
          </div>
        )}
      </div>
    </div>
  );
}

export default function FutureQuest() {
  const [screen, setScreen] = useState("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState(baseScores);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmittingResult, setIsSubmittingResult] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const firstName = formData.fullName.trim().split(" ").pop();

  const result = useMemo(() => resultsForScores(scores), [scores]);

  function resultsForScores(scoreSet) {
    return resultTypes[getResultType(scoreSet)];
  }

  const updateForm = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Please enter your full name.";
    if (!formData.universityYear) errors.universityYear = "Please choose your university year.";
    if (!formData.major.trim()) errors.major = "Please enter your major.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email.";
    }
    if (!/^[0-9+\s().-]{8,}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (formData.cvLink && !/^https?:\/\/\S+$/i.test(formData.cvLink.trim())) {
      errors.cvLink = "Please paste a valid link starting with http or https.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitToGoogleForm = async (resultType, scoreSet) => {
    const finalResult = resultTypes[resultType];
    const body = new URLSearchParams();

    appendIfConfigured(body, FORM_FIELDS.fullName, formData.fullName.trim());
    appendIfConfigured(body, FORM_FIELDS.universityYear, formData.universityYear);
    appendIfConfigured(body, FORM_FIELDS.major, formData.major.trim());
    appendIfConfigured(body, FORM_FIELDS.email, formData.email.trim());
    appendIfConfigured(body, FORM_FIELDS.phone, formData.phone.trim());
    appendIfConfigured(body, FORM_FIELDS.cvLink, formData.cvLink.trim());
    appendIfConfigured(body, FORM_FIELDS.result, finalResult.name);

    console.log("Submitting FutureQuest response", {
      ...formData,
      result: finalResult.name,
      scores: scoreSet,
    });

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      return true;
    } catch (err) {
      console.error("Submit error:", err);
      return false;
    }
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;
    setScreen("quiz");
  };

  const handleAnswer = (type, index) => {
    setSelectedOption(index);
    setTimeout(() => {
      const newScores = { ...scores, [type]: scores[type] + 1 };
      setScores(newScores);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        return;
      }

      const resultType = getResultType(newScores);
      setScreen("result");
      setIsSubmittingResult(true);
      setSubmitStatus("submitting");
      submitToGoogleForm(resultType, newScores).then((wasSubmitted) => {
        setIsSubmittingResult(false);
        setSubmitStatus(wasSubmitted ? "submitted" : "error");
      });
    }, 320);
  };

  const resetQuiz = () => {
    setScreen("welcome");
    setCurrentQuestion(0);
    setScores(baseScores);
    setSelectedOption(null);
    setFormData(emptyForm);
    setFormErrors({});
    setIsSubmittingResult(false);
    setSubmitStatus("idle");
  };

  if (screen === "welcome") {
    return (
      <main className="min-h-screen bg-[#fffaf2] text-slate-900">
        <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-8">
          <div className="absolute inset-x-0 top-0 h-2 bg-[#f79400]" />
          <div className="absolute right-[-10%] top-[-16%] h-80 w-80 rounded-full border-[56px] border-orange-100/70" />
          <div className="absolute bottom-[-18%] left-[-12%] h-96 w-96 rounded-full border-[72px] border-slate-100" />

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <BrandMark />
              <div className="mt-14 max-w-2xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-[#b76400] shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  FTU x RMIT Career Fair
                </div>
                <h1 className="text-5xl font-black leading-[1.02] tracking-normal text-[#3f474b] md:text-7xl">
                  FutureQuest
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
                  Discover your career working style in two minutes, then collect
                  your Arches booth gift with your result.
                </p>
                <button
                  onClick={() => setScreen("form")}
                  className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-lg bg-[#f79400] px-7 text-base font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-[#e18200] hover:shadow-xl"
                >
                  Start Your Quest
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-2xl shadow-orange-100/70">
              <div className="rounded-xl bg-[#fff4df] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#f79400]">
                    Career Profiles
                  </span>
                  <BriefcaseBusiness className="h-5 w-5 text-[#3f474b]" />
                </div>
                <div className="grid gap-3">
                  {Object.values(resultTypes).map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm"
                      >
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-lg ${item.accent} text-white`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-bold text-[#3f474b]">
                            {item.name}
                          </div>
                          <div className="text-sm text-slate-500">
                            {item.headline}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (screen === "form") {
    return (
      <main className="min-h-screen bg-[#fffaf2] px-5 py-8 text-slate-900">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <BrandMark compact />
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-[#a85f00]">
            Step 1 of 3
          </span>
        </div>

        <section className="mx-auto mt-8 grid w-full max-w-5xl gap-6 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl bg-[#3f474b] p-7 text-white">
            <UserRound className="h-10 w-10 text-[#f79400]" />
            <h2 className="mt-6 text-3xl font-black tracking-normal">
              Your information
            </h2>
            <p className="mt-4 leading-7 text-slate-200">
              Share a few details so Arches can connect your FutureQuest result
              with career opportunities after the fair.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Full name
                </label>
                <input
                  className={inputClass(formErrors.fullName)}
                  value={formData.fullName}
                  onChange={(e) => updateForm("fullName", e.target.value)}
                  placeholder="Your full name"
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  University year
                </label>
                <div className="grid gap-2">
                  {yearOptions.map((year) => (
                    <button
                      key={year}
                      onClick={() => updateForm("universityYear", year)}
                      className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
                        formData.universityYear === year
                          ? "border-[#f79400] bg-orange-50 text-[#9a5800] ring-4 ring-orange-100"
                          : "border-slate-200 text-slate-600 hover:border-orange-300"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                {formErrors.universityYear && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    {formErrors.universityYear}
                  </p>
                )}
              </div>

              <div className="grid content-start gap-5">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Major
                  </label>
                  <input
                    className={inputClass(formErrors.major)}
                    value={formData.major}
                    onChange={(e) => updateForm("major", e.target.value)}
                    placeholder="Business, Marketing, Finance..."
                  />
                  {formErrors.major && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      {formErrors.major}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Email
                  </label>
                  <input
                    className={inputClass(formErrors.email)}
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="you@email.com"
                    type="email"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Phone number
                  </label>
                  <input
                    className={inputClass(formErrors.phone)}
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="+84..."
                    inputMode="tel"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    CV link <span className="font-medium text-slate-400">optional</span>
                  </label>
                  <input
                    className={inputClass(formErrors.cvLink)}
                    value={formData.cvLink}
                    onChange={(e) => updateForm("cvLink", e.target.value)}
                    placeholder="https://drive.google.com/..."
                  />
                  {formErrors.cvLink && (
                    <p className="mt-1 text-xs font-semibold text-red-500">
                      {formErrors.cvLink}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <button
                onClick={() => setScreen("welcome")}
                className="rounded-lg border border-slate-200 px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Back
              </button>
              <button
                onClick={handleFormSubmit}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#f79400] px-5 py-3 font-bold text-white transition hover:bg-[#e18200]"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (screen === "quiz") {
    const q = questions[currentQuestion];

    return (
      <main className="min-h-screen bg-[#fffaf2] px-5 py-8 text-slate-900">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
          <BrandMark compact />
          <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-bold text-[#a85f00]">
            Step 2 of 3
          </span>
        </div>

        <section className="mx-auto mt-8 w-full max-w-4xl">
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between text-sm font-bold text-slate-600">
              <span>
                {firstName ? `Hi ${firstName}, ` : ""}
                Question {currentQuestion + 1} / {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full ${
                    index <= currentQuestion ? "bg-[#f79400]" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60 md:p-9">
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#3f474b] text-white">
                <Target className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-black leading-tight tracking-normal text-[#3f474b] md:text-4xl">
                {q.question}
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {q.options.map((option, index) => {
                const item = resultTypes[option.type];
                const Icon = item.icon;
                const isSelected = selectedOption === index;

                return (
                  <button
                    key={option.text}
                    onClick={() => handleAnswer(option.type, index)}
                    disabled={selectedOption !== null}
                    className={`group min-h-24 rounded-xl border-2 p-4 text-left transition ${
                      isSelected
                        ? `${item.border} ${item.soft} scale-[1.01] ring-4 ${item.ring}`
                        : "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
                    } ${
                      selectedOption !== null && !isSelected ? "opacity-40" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                          isSelected ? item.accent : "bg-slate-100"
                        } ${isSelected ? "text-white" : "text-slate-500"}`}
                      >
                        {isSelected ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                          Option {item.key}
                        </div>
                        <div className="mt-1 text-lg font-bold text-[#3f474b]">
                          {option.text}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    );
  }

  const ResultIcon = result.icon;

  return (
    <main className="min-h-screen bg-[#3f474b] px-5 py-8 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div className="rounded-xl bg-white px-4 py-3 shadow-lg">
          <BrandMark compact />
        </div>
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white">
          Step 3 of 3
        </span>
      </div>

      <section className="mx-auto mt-8 grid w-full max-w-5xl gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl bg-white p-6 shadow-2xl md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-black uppercase tracking-[0.22em] text-[#f79400]">
                Your FutureQuest Type
              </div>
              <h1 className="mt-3 text-5xl font-black tracking-normal text-[#3f474b] md:text-6xl">
                {result.name}
              </h1>
            </div>
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${result.accent} text-white shadow-lg`}
            >
              <ResultIcon className="h-8 w-8" />
            </div>
          </div>

          <div className={`mt-7 rounded-xl ${result.soft} p-5`}>
            <div className={`text-lg font-black ${result.text}`}>
              {result.headline}
            </div>
            <p className="mt-3 leading-7 text-slate-700">{result.summary}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Signature strengths
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.strengths.map((strength) => (
                <span
                  key={strength}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-[#3f474b]"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-7 rounded-xl border border-orange-200 bg-orange-50 p-5">
            <p className="font-bold text-[#8f5200]">
              Screenshot this result and collect your gift at the Arches booth.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Best-fit paths
            </h2>
            <div className="mt-4 grid gap-3">
              {result.roles.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3"
                >
                  <BriefcaseBusiness className={`h-5 w-5 ${result.text}`} />
                  <span className="font-semibold text-slate-700">{role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-400">
              Stay connected
            </h2>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-700">
              <a
                className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 transition hover:bg-orange-50"
                href="https://www.linkedin.com/company/arches-expert-network-service/"
                target="_blank"
                rel="noreferrer"
              >
                <Network className="h-5 w-5 text-[#f79400]" />
                LinkedIn: Arches Expert Network Service
              </a>
              <a
                className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 transition hover:bg-orange-50"
                href="mailto:recruitment@arches-global.com"
              >
                <Mail className="h-5 w-5 text-[#f79400]" />
                recruitment@arches-global.com
              </a>
            </div>

            <div className="mt-5 min-h-6 text-sm font-semibold text-slate-500">
              {isSubmittingResult && (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving result...
                </span>
              )}
              {submitStatus === "submitted" && "Result saved."}
              {submitStatus === "error" && "Could not save result."}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f79400] px-5 py-4 font-bold text-white shadow-lg shadow-black/10 transition hover:bg-[#e18200]"
          >
            <RotateCcw className="h-5 w-5" />
            Start Again
          </button>
        </div>
      </section>
    </main>
  );
}
