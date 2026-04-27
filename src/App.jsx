import React, { useState } from "react";
import {
  Coffee,
  RotateCcw,
  Sparkles,
  ChevronRight,
  User,
  Loader2,
} from "lucide-react";

// Google Form config
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd1Qsn1LwcFAiTTT-hqi2pEgkhe8xEY1HgDMASzwNMgCqsweg/formResponse";
const FORM_FIELDS = {
  fullName: "entry.1639203253",
  age: "entry.1944132580",
  pronoun: "entry.924296976",
  birthDate: "entry.2064053006",
  result: "entry.935845943",
};

const questions = [
  {
    question: "Buổi sáng lý tưởng của bạn là gì?",
    options: [
      {
        text: "Dậy sớm tập gym, chuẩn bị cho ngày mới đầy năng lượng",
        type: "espresso",
      },
      { text: "Ăn sáng cùng gia đình, trò chuyện vui vẻ", type: "latte" },
      { text: "Ngủ nướng rồi đi cafe một mình đọc sách", type: "coldbrew" },
      {
        text: "Thưởng thức bữa sáng đẹp mắt, chụp vài tấm ảnh",
        type: "caramel",
      },
    ],
  },
  {
    question: "Cuối tuần bạn thường làm gì?",
    options: [
      {
        text: "Hoàn thành công việc còn dang dở hoặc học kỹ năng mới",
        type: "espresso",
      },
      { text: "Gặp gỡ bạn bè, tổ chức tiệc nhỏ tại nhà", type: "latte" },
      {
        text: "Khám phá quán cafe mới hoặc đi du lịch một mình",
        type: "coldbrew",
      },
      { text: "Đi mua sắm, xem phim tình cảm, làm bánh", type: "caramel" },
    ],
  },
  {
    question: "Khi gặp vấn đề khó khăn, bạn sẽ...?",
    options: [
      {
        text: "Phân tích nhanh và đưa ra quyết định dứt khoát",
        type: "espresso",
      },
      { text: "Tìm người thân để chia sẻ và xin lời khuyên", type: "latte" },
      {
        text: "Dành thời gian suy nghĩ một mình để tìm giải pháp",
        type: "coldbrew",
      },
      {
        text: "Nghe nhạc, viết nhật ký để cảm xúc lắng xuống",
        type: "caramel",
      },
    ],
  },
  {
    question: "Thể loại phim yêu thích của bạn?",
    options: [
      { text: "Hành động, thriller, phim tài liệu", type: "espresso" },
      { text: "Gia đình, hài kịch ấm áp", type: "latte" },
      { text: "Indie, nghệ thuật, khoa học viễn tưởng", type: "coldbrew" },
      { text: "Lãng mạn, hoạt hình, cổ trang", type: "caramel" },
    ],
  },
  {
    question: "Màu sắc nào thu hút bạn nhất?",
    options: [
      { text: "Đen, đỏ đậm, xám than", type: "espresso" },
      { text: "Be, nâu sữa, xanh pastel", type: "latte" },
      { text: "Xanh navy, xanh rêu, trắng lạnh", type: "coldbrew" },
      { text: "Hồng, vàng kem, tím lavender", type: "caramel" },
    ],
  },
  {
    question: "Phong cách thời trang của bạn?",
    options: [
      { text: "Tối giản, mạnh mẽ, chất liệu cao cấp", type: "espresso" },
      { text: "Thoải mái, dễ thương, basic dễ phối", type: "latte" },
      { text: "Vintage, unisex, độc đáo khác biệt", type: "coldbrew" },
      { text: "Nữ tính, nhiều chi tiết, màu ngọt ngào", type: "caramel" },
    ],
  },
  {
    question: "Bạn mô tả bản thân bằng một từ?",
    options: [
      { text: "Quyết đoán", type: "espresso" },
      { text: "Ấm áp", type: "latte" },
      { text: "Độc lập", type: "coldbrew" },
      { text: "Mơ mộng", type: "caramel" },
    ],
  },
];

const results = {
  espresso: {
    emoji: "☕",
    name: "Espresso Enthusiast",
    tagline: "Mạnh mẽ, đậm đà, không khoan nhượng",
    description:
      "Bạn là người năng động, quyết đoán và luôn hướng tới hiệu quả. Giống như một tách espresso đậm đặc, bạn không cần màu mè hay phô trương — sự mạnh mẽ và tinh túy của bạn tự nói lên tất cả.",
    traits: ["Quyết đoán", "Tự tin", "Tham vọng", "Thẳng thắn", "Hiệu quả"],
    gradient: "from-amber-900 via-stone-800 to-neutral-900",
    accent: "bg-amber-900",
    textAccent: "text-amber-100",
  },
  latte: {
    emoji: "🥛",
    name: "Latte Lover",
    tagline: "Cân bằng, ấm áp, dễ gần",
    description:
      "Bạn là kiểu người hòa đồng, ấm áp và luôn mang đến cảm giác dễ chịu cho mọi người xung quanh. Như một ly latte mềm mại, bạn biết cách cân bằng giữa các mối quan hệ và tạo nên sự hài hòa trong cuộc sống.",
    traits: ["Thân thiện", "Đồng cảm", "Cân bằng", "Chu đáo", "Đáng tin cậy"],
    gradient: "from-amber-100 via-orange-100 to-rose-100",
    accent: "bg-amber-700",
    textAccent: "text-amber-900",
  },
  coldbrew: {
    emoji: "🧊",
    name: "Cold Brew Cool",
    tagline: "Trầm tính, sâu sắc, khác biệt",
    description:
      "Bạn là người trầm tính, sáng tạo và yêu sự tự do. Giống như cold brew được ủ chậm suốt nhiều giờ, bạn có chiều sâu và sự độc đáo mà không phải ai cũng hiểu được ngay — nhưng ai hiểu rồi sẽ yêu mãi.",
    traits: ["Sáng tạo", "Độc lập", "Sâu sắc", "Bình tĩnh", "Khác biệt"],
    gradient: "from-slate-700 via-blue-900 to-slate-900",
    accent: "bg-blue-900",
    textAccent: "text-blue-100",
  },
  caramel: {
    emoji: "🍯",
    name: "Caramel Dreamer",
    tagline: "Ngọt ngào, tinh tế, lãng mạn",
    description:
      "Bạn là người lãng mạn, mơ mộng và yêu những điều đẹp đẽ. Như một ly caramel macchiato ngọt ngào, bạn mang đến niềm vui và sự ấm áp cho cuộc sống, luôn tìm thấy vẻ đẹp trong những điều nhỏ bé nhất.",
    traits: ["Lãng mạn", "Tinh tế", "Sáng tạo", "Nhạy cảm", "Lạc quan"],
    gradient: "from-pink-200 via-rose-200 to-amber-200",
    accent: "bg-rose-600",
    textAccent: "text-rose-900",
  },
};

const pronounOptions = [
  "She/Her",
  "He/Him",
  "They/Them",
  "Prefer not to say",
  "Other (Please specify)",
];

export default function CoffeeQuiz() {
  const [screen, setScreen] = useState("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    espresso: 0,
    latte: 0,
    coldbrew: 0,
    caramel: 0,
  });
  const [selectedOption, setSelectedOption] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    pronoun: "",
    birthDate: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmittingResult, setIsSubmittingResult] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Vui lòng nhập họ tên";
    else if (formData.fullName.trim().length < 2)
      errors.fullName = "Họ tên quá ngắn";

    if (!formData.age.trim()) errors.age = "Vui lòng nhập tuổi";
    else if (
      isNaN(formData.age) ||
      parseInt(formData.age) < 1 ||
      parseInt(formData.age) > 120
    )
      errors.age = "Tuổi không hợp lệ";

    if (!formData.pronoun) errors.pronoun = "Vui lòng chọn đại từ xưng hô";

    if (!formData.birthDate) errors.birthDate = "Vui lòng chọn ngày sinh";
    else if (new Date(formData.birthDate) > new Date())
      errors.birthDate = "Ngày sinh không thể ở tương lai";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getResultType = (scoreSet) =>
    Object.keys(scoreSet).reduce((a, b) => (scoreSet[a] > scoreSet[b] ? a : b));

  const submitToGoogleForm = async (resultType, scoreSet) => {
    const result = results[resultType];
    const body = new URLSearchParams();
    body.append(FORM_FIELDS.fullName, formData.fullName);
    body.append(FORM_FIELDS.age, formData.age);
    body.append(FORM_FIELDS.pronoun, formData.pronoun);
    body.append(FORM_FIELDS.birthDate, formData.birthDate);
    body.append(FORM_FIELDS.result, result.name);

    console.log("=== SUBMITTING TO GOOGLE FORM ===");
    console.log("Data:", {
      ...formData,
      result: result.name,
      scores: scoreSet,
    });

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      console.log("✅ Request sent successfully");
      return true;
    } catch (err) {
      console.error("❌ Submit error:", err);
      return false;
    }
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;
    setScreen("quiz");
  };

  const startQuiz = () => {
    setScreen("form");
    setFormErrors({});
  };

  const handleAnswer = (type, index) => {
    setSelectedOption(index);
    setTimeout(() => {
      const newScores = { ...scores, [type]: scores[type] + 1 };
      setScores(newScores);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setScreen("result");
        setIsSubmittingResult(true);
        setSubmitStatus("submitting");

        const resultType = getResultType(newScores);
        submitToGoogleForm(resultType, newScores).then((wasSubmitted) => {
          setIsSubmittingResult(false);
          setSubmitStatus(wasSubmitted ? "submitted" : "error");
        });
      }
    }, 400);
  };

  const resetQuiz = () => {
    setScreen("welcome");
    setCurrentQuestion(0);
    setScores({ espresso: 0, latte: 0, coldbrew: 0, caramel: 0 });
    setFormData({ fullName: "", age: "", pronoun: "", birthDate: "" });
    setFormErrors({});
    setIsSubmittingResult(false);
    setSubmitStatus("idle");
  };

  const getResult = () => {
    return results[getResultType(scores)];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // === WELCOME SCREEN ===
  if (screen === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full mb-6 shadow-lg">
            <Coffee className="w-10 h-10 text-amber-50" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Bạn là kiểu người uống cà phê nào?
          </h1>
          <p className="text-stone-600 text-lg mb-2">
            Khám phá tính cách của bạn qua 7 câu hỏi thú vị
          </p>
          <p className="text-stone-500 text-sm mb-8 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Chỉ mất 2 phút thôi!
          </p>
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-amber-700 to-amber-900 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            Bắt đầu ngay <ChevronRight className="w-5 h-5" />
          </button>
          <div className="mt-10 grid grid-cols-4 gap-3">
            {Object.values(results).map((r, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-1">{r.emoji}</div>
                <div className="text-xs text-stone-500">
                  {r.name.split(" ")[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === FORM SCREEN ===
  if (screen === "form") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full mb-4 shadow-md">
              <User className="w-8 h-8 text-amber-50" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
              Thông tin của bạn
            </h2>
            <p className="text-stone-500 text-sm">
              Điền thông tin để bắt đầu hành trình khám phá
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Nguyễn Văn A"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none ${
                  formErrors.fullName
                    ? "border-rose-400 bg-rose-50"
                    : "border-stone-200 focus:border-amber-700 bg-white"
                }`}
              />
              {formErrors.fullName && (
                <p className="text-rose-500 text-xs mt-1">
                  {formErrors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Tuổi <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                placeholder="25"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none ${
                  formErrors.age
                    ? "border-rose-400 bg-rose-50"
                    : "border-stone-200 focus:border-amber-700 bg-white"
                }`}
              />
              {formErrors.age && (
                <p className="text-rose-500 text-xs mt-1">{formErrors.age}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Đại từ xưng hô <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {pronounOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFormData({ ...formData, pronoun: opt })}
                    className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      formData.pronoun === opt
                        ? "border-amber-700 bg-amber-50 text-amber-900"
                        : "border-stone-200 text-stone-600 hover:border-amber-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {formErrors.pronoun && (
                <p className="text-rose-500 text-xs mt-1">
                  {formErrors.pronoun}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">
                Ngày sinh <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={formData.birthDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-xl border-2 transition-colors outline-none ${
                  formErrors.birthDate
                    ? "border-rose-400 bg-rose-50"
                    : "border-stone-200 focus:border-amber-700 bg-white"
                }`}
              />
              {formErrors.birthDate && (
                <p className="text-rose-500 text-xs mt-1">
                  {formErrors.birthDate}
                </p>
              )}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setScreen("welcome")}
                className="flex-shrink-0 px-6 py-3 rounded-full font-semibold text-stone-600 border-2 border-stone-200 hover:bg-stone-50 transition-all disabled:opacity-50"
              >
                Quay lại
              </button>
              <button
                onClick={handleFormSubmit}
                className="flex-1 bg-gradient-to-r from-amber-700 to-amber-900 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
              >
                Tiếp tục <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-400 text-center pt-2">
              🔒 Thông tin của bạn sẽ được lưu trữ an toàn
            </p>
          </div>
        </div>
      </div>
    );
  }

  // === QUIZ SCREEN ===
  if (screen === "quiz") {
    const q = questions[currentQuestion];
    const firstName = formData.fullName.trim().split(" ").pop();
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-stone-600">
                {firstName && currentQuestion === 0 && (
                  <span className="text-amber-800">Chào {firstName}! </span>
                )}
                Câu {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-amber-800">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-600 to-amber-800 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-8 leading-snug">
              {q.question}
            </h2>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.type, i)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 ${
                    selectedOption === i
                      ? "border-amber-700 bg-amber-50 scale-[1.02]"
                      : "border-stone-200 hover:border-amber-400 hover:bg-amber-50/50"
                  } ${
                    selectedOption !== null && selectedOption !== i
                      ? "opacity-40"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 ${
                        selectedOption === i
                          ? "border-amber-700 bg-amber-700"
                          : "border-stone-300"
                      }`}
                    />
                    <span className="text-stone-700 text-base md:text-lg">
                      {opt.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === RESULT SCREEN ===
  const result = getResult();
  const firstName = formData.fullName.trim().split(" ").pop();
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${result.gradient} flex items-center justify-center p-6 transition-all duration-700`}
    >
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="text-center">
          <div className="text-7xl md:text-8xl mb-4 animate-bounce">
            {result.emoji}
          </div>
          <div className="text-sm uppercase tracking-widest text-stone-500 mb-2">
            {firstName ? `${firstName}, bạn là...` : "Bạn là..."}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-3">
            {result.name}
          </h1>
          <p className={`text-lg font-medium mb-6 ${result.textAccent}`}>
            {result.tagline}
          </p>

          <div className="bg-stone-50 rounded-2xl p-6 mb-6 text-left">
            <p className="text-stone-700 leading-relaxed">
              {result.description}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-widest text-stone-500 mb-3">
              Đặc điểm nổi bật
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {result.traits.map((trait, i) => (
                <span
                  key={i}
                  className={`${result.accent} text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm`}
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-stone-200 pt-6">
            <h3 className="text-sm uppercase tracking-widest text-stone-500 mb-3">
              Điểm của bạn
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {Object.entries(scores).map(([type, score]) => (
                <div key={type} className="text-center">
                  <div className="text-2xl mb-1">{results[type].emoji}</div>
                  <div className="text-xs text-stone-500 mb-1">
                    {results[type].name.split(" ")[0]}
                  </div>
                  <div className="text-lg font-bold text-stone-700">
                    {score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 text-sm text-stone-500 flex items-center justify-center gap-2 min-h-6">
            {isSubmittingResult && (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving result...
              </>
            )}
            {submitStatus === "submitted" && "Result saved."}
            {submitStatus === "error" &&
              "Could not save result. Please try again later."}
          </div>

          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-amber-700 to-amber-900 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Làm lại quiz
          </button>
        </div>
      </div>
    </div>
  );
}
