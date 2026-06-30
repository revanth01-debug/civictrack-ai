const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
console.log("API KEY:", GEMINI_API_KEY);
export async function analyzeIssue(imageBase64) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Analyze this community issue image. Return issue type, severity, priority and suggested action."
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageBase64,
                },
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return data;
}