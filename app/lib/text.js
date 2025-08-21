export async function translateText(text, targetLang) {
  if (!text || targetLang === "en") return text;
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang }),
    });
    const data = await res.json();
    return data.translatedText || text;
  } catch (err) {
    console.error("Translation error:", err);
    return text;
  }
}
