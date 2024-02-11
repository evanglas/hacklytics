import React from "react";
import OpenAI from "openai";
import axios from "axios";

import { useState } from "react";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function sendRequest(stock, headline, direction) {
  try {
    // Your Lambda function endpoint
    const endpoint =
      "https://foybrayfiauncvja5ngxpfvdae0weiah.lambda-url.us-east-2.on.aws/";

    // Your API request data
    const requestData = {
      messages: [
        {
          role: "system",
          content:
            "You are a wise investor. Given a stock, a headline, and the stock prices direction of movement after the headline, explain the movement. Make your response concise, yet insightful.",
        },
        {
          role: "user",
          content: `Stock: ${stock}, Headline: ${headline}, Direction: ${direction}`,
        },
      ],
      model: "gpt-3.5-turbo",
    };

    // Send a POST request to the Lambda function
    const lambdaResponse = await axios.post(endpoint, requestData);

    // Set the response received from the Lambda function
    return lambdaResponse.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default function Gamenav(props) {
  const handleInterpret = async () => {
    if (props.interpreted) return;
    props.setExplainText("Fetching explanation...");
    try {
      const response = await sendRequest(
        props.stock,
        props.headline,
        props.result
      );
      props.setExplainText(response.choices[0].message.content);
      props.setInterpreted(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const dataBefore = [210, 215, 212, 210, 215, 217, 219];
  const dataAfter = [219, 218, 214, 210, 208, 205, 200];
  const changeTime = "11:35 AM";

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row justify-around">
        <div className="flex flex-row justify-around w-[400px]">
          {props.guessed && (
            <div
              onClick={handleInterpret}
              className="flex justify-center hover:cursor-pointer rounded-xl shadow-2xl shadow-slate-400 text-white bg-blue-500 hover:opacity-80 p-5"
            >
              Interpret This!
            </div>
          )}
          <div
            onClick={props.handleNextRoundClick}
            className="flex justify-center hover:cursor-pointer rounded-xl shadow-2xl shadow-slate-400 text-white bg-blue-500 hover:opacity-80 p-5"
          >
            Next Round!
          </div>
        </div>
      </div>
      {props.explainText && (
        <div className="flex flex-row justify-center xl:w-1/2 w-[80%] mt-5 p-5 border-4 border-black rounded-xl">
          {props.explainText}
        </div>
      )}
    </div>
  );
}
