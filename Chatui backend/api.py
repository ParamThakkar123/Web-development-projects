from fastapi import FastAPI
from transformers import pipeline
from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
from langchain.memory import MongoDBChatMessageHistory, ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.prompts.prompt import PromptTemplate
from transformers import AutoModelForCausalLM, AutoTokenizer
import uvicorn
from typing import List
import json
from pymongo import MongoClient
from pydantic import BaseModel

uri = "mongodb+srv://paramthakkar864:paramthakkar864@cluster0.wmszguq.mongodb.net/GPTdb?retryWrites=true&w=majority&appName=Cluster0"

app = FastAPI()

tokenizer = AutoTokenizer.from_pretrained("smallstepai/Misal-1B-instruct-v0.1")
model = AutoModelForCausalLM.from_pretrained("smallstepai/Misal-1B-instruct-v0.1")

text_pipeline = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    max_new_tokens=1024,
    temperature=0,
)

llm = HuggingFacePipeline(pipeline=text_pipeline, model_kwargs={"temperature": 0})

_DEFAULT_TEMPLATE = """
आपण एक प्रामाणिक सहाय्यक आहात. वापरकर्त्यांच्या प्रश्नांची उत्तरे शक्य तितक्या योग्य आणि अचूकपणे द्या.
History: \"{history}\"
Query: \"{input}\"
"""

client = MongoClient("mongodb+srv://paramthakkar864:paramthakkar864@cluster0.wmszguq.mongodb.net/GPTdb?retryWrites=true&w=majority&appName=Cluster0")
db = client["chat_history"]
collection = db["message_store"]

class Message(BaseModel):
    _id: str
    SessionId: str
    History: dict

@app.get("/messages", response_model=List[Message])
def get_messages():
    messages = list(collection.find({}, {"_id": 1, "SessionId": 1, "History": 1}))
    formatted_messages = []
    for message in messages:
        formatted_message = {
            "_id": str(message["_id"]),
            "SessionId": str(message["SessionId"]),
            "History": json.loads(message["History"])
        }
        formatted_messages.append(formatted_message)
    return formatted_messages


@app.post('/chat')
def chatbot(input, session):
    message_history = MongoDBChatMessageHistory(
        connection_string=uri, session_id=session
    )

    PROMPT = PromptTemplate(input_variables=["history", "input"], template=_DEFAULT_TEMPLATE,)

    memories = ConversationBufferMemory(k=3, return_messages=True)

    if len(message_history.messages):
        memories.save_context(
            {"input": message_history.messages[0].content},
            {"output": message_history.messages[1].content}
        )
        conversation = ConversationChain(llm=llm, verbose=False, prompt=PROMPT, memory=memories)
        conv = conversation.predict(input=input)
        message_history.add_user_message(input)
        message_history.add_ai_message(conv)
        return conv
    else:
        conversation = ConversationChain(llm=llm, verbose=False, prompt=PROMPT, memory=memories)
        conv = conversation.predict(input=input)
        message_history.add_user_message(input)
        message_history.add_ai_message(conv)
        return conv
    
if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1', port=8000)