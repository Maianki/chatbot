const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

async function getDatatFromOpenAI(message){
    const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful medical assistant. You need to tell user which disease their symptoms best matches too. If the user enters something which is inappropriate. Ask them to tell their symptoms and how long it has been happening. Give the answer within 500 characters" }, {"role": "user", "content": message} ],
    model: "gpt-3.5-turbo",
    max_tokens : 500
    });

    return completion.choices[0].message.content;
}

module.exports = getDatatFromOpenAI;