const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

let messagesArr = [{ role: "system", content: "You are a helpful medical assistant. You need to tell user   which disease their symptoms best matches too. If the user enters something which is inappropriate. Ask them to tell their symptoms and how long it has been happening. Give the answer within 500 characters" }]; 

async function getDatatFromOpenAI(message){

    let newMessage = {"role" : "user", "content" : message};

    messagesArr.push(newMessage);

    const completion = await openai.chat.completions.create({
    messages: messagesArr,
    model: "gpt-3.5-turbo",
    max_tokens : 500
    });

    let assistantReply =  completion.choices[0].message.content;
 
    let assistantAnswer = {"role" :  "assistant", "content" : assistantReply};

    messagesArr.push(assistantAnswer);

    return completion.choices[0].message.content;
}

module.exports = getDatatFromOpenAI;