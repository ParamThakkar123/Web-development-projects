from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from langchain.memory import MongoDBChatMessageHistory, ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.prompts.prompt import PromptTemplate
from transformers import AutoModelForCausalLM, AutoTokenizer
import os
import uvicorn

uri = "mongodb+srv://paramthakkar864:paramthakkar864@cluster0.wmszguq.mongodb.net/GPTdb?retryWrites=true&w=majority&appName=Cluster0"

device = "cuda"
model = AutoModelForCausalLM.from_pretrained("smallstepai/Misal-1B-instruct-v0.1", torch_dtype=torch.bfloat16, device_map='auto')
tokenizer = AutoTokenizer.from_pretrained("smallstepai/Misal-1B-instruct-v0.1")

def ask_misal(model, tokenizer, instruction, inputs='', system_prompt='', max_new_tokens=200, device='cuda'):
    ip = dict(system_prompt=system_prompt, instruction=instruction, inputs=inputs)
    model_inputs = tokenizer.apply_chat_template(ip, return_tensors='pt')
    outputs = model.generate(model_inputs.to(device), max_new_tokens=max_new_tokens)
    response = tokenizer.decode(outputs[0]).split('### Response:')[1].strip()
    return response

# FastAPI app setup
app = FastAPI()

# Define a schema for the POST request
class ChatInput(BaseModel):
    input: str
    session: str

DEFAULT_TEMPLATE = """You are a chatbot that answers users' questions appropriately and accurately."""

@app.post("/chat")
def chatbot(input, session):
    user_input = input
    session_id = session
    message_history = MongoDBChatMessageHistory(connection_string=uri, session_id=session_id)
    if message_history.messages:
        memories = ConversationBufferMemory(k=3)
        for message in message_history.messages:
            if message.type == 'user':
                memories.save_context({"input": message.content}, {})
            elif message.type == 'ai':
                memories.save_context({}, {"output": message.content})

        # Create a new conversation chain with memory
        conversation = ConversationChain(llm=model, prompt=PromptTemplate(input_variables=["history", "input"], template=DEFAULT_TEMPLATE), memory=memories)
        conv = conversation.predict(input=user_input, link=session_id)
        message_history.add_user_message(user_input)
        message_history.add_ai_message(conv)
        return {"response": conv}
    else:
        memories = ConversationBufferMemory(k=3)
        response = ask_misal(model, tokenizer, instruction=DEFAULT_TEMPLATE, inputs=user_input, max_new_tokens=200)
        message_history.add_user_message(user_input)
        message_history.add_ai_message(response)
        return {"response": response}
    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000, log_level="info")