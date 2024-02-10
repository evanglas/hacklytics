import React from "react";
import OpenAI from "openai";

import { useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function sendRequest() {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a wise investor. Given a stock, a headline, and the stock prices direction of movement after the headline, explain the movement. Make your response concise, yet insightful.",
        },
        {
          role: "user",
          content:
            "Stock: APPL Headline: Apple announces new iPhone Direction: Up",
        },
      ],
      model: "gpt-3.5-turbo",
    });
    return response;
  } catch (error) {
    console.error("Error sending request to OpenAI:", error);
    throw error;
  }
}

export default function Gamenav() {
  const [explainText, setExplainText] = useState(null);
  const handleNextRoundClick = async () => {
    setExplainText("Fetching explanation...");
    try {
      const response = await sendRequest();
      setExplainText(response.choices[0].message.content);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row justify-around">
        <div className="flex flex-row justify-around w-[400px]">
          <div
            onClick={handleNextRoundClick}
            className="flex justify-center rounded-xl bg-blue-500 hover:opacity-80 p-5 border-black border-4"
          >
            Interpret This!
          </div>
          <div className="flex justify-center rounded-xl bg-blue-500 hover:opacity-80 p-5 border-black border-4">
            Next Round!
          </div>
        </div>
      </div>
      {explainText && (
        <div className="flex flex-row justify-center xl:w-1/2 w-[80%] mt-5 p-5 border-4 border-black rounded-xl">
          {explainText}
        </div>
      )}
    </div>
  );
}
