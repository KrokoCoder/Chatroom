const { CohereClient } = require("cohere-ai");
const dotenv = require("dotenv");
dotenv.config();
const key = process.env.KEY;

const client = new CohereClient({ token: key });


/**
 * Get the answer from the chatbot based on the given question and chat history.
 * 
 * @param {string} question - The question to ask the chatbot.
 * @param {Array} chatHistory - The chat history in the format [{ role: "USER", message: "..." }, { role: "CHATBOT", message: "..." }].
 * @returns {Promise<string>} - The answer from the chatbot.
 */
async function getAnswer(question, chatHistory) {
    const chatStream = await client.chatStream({
            chatHistory: chatHistory,
            message: question,
            // perform web search before answering the question. You can also use your own custom connector.
    });

    var text = "";

    for await (const message of chatStream) {
            if (message.eventType === "text-generation") {
                     text += message.text;
                     console.log(text);
            }
    }

 return text;
}

exports.getAnswer = getAnswer;

