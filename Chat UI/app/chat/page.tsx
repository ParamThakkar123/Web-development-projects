"use client"
import React, { useState } from "react";
import { ModeToggle } from "../Components/Modetoggle";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Input } from "@/components/ui/input";
import { IndicTransliterate, Language, TriggerKeys } from "@ai4bharat/indic-transliterate";
import { Send } from "lucide-react";
import './chat.css'

const Chat = () => {
  const [text, setText] = useState("");
  const [lang, setLang] = useState<Language>("mr");

  return (
    <div className="flex">
      <div className="p-0 w-64">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 h-screen">
        <div className="flex justify-end p-5">
          <ModeToggle />
        </div>

        <div className="flex-1 text-center tracking-wide pl-12 pr-12 mt-40 text-xl">
          <span className="animated-gradient-text">Welcome to the MarathiGPT</span>
          <p className="mt-5">Where our language model speaks better than your local chaiwala ! If our AI cracks a joke, don't be surprised if it asks for a tip.. in data! Get ready to chat, laugh and maybe even argue with a machine. (Spoiler: It always has the last word.)</p>
        </div>

        <div className="input-container relative p-5"> {/* Input area */}
  <IndicTransliterate
    renderComponent={(props) => <Input {...props} />}
    value={text}
    onChangeText={(text) => setText(text)}
    lang={lang}
    className="w-full rounded text-lg font-serif indic-transliterate-suggestion"
    placeholder="Type here..."
    triggerKeys={[
      TriggerKeys.KEY_RETURN,
      TriggerKeys.KEY_ENTER,
      TriggerKeys.KEY_SPACE,
      TriggerKeys.KEY_TAB,
    ]}
    offsetY={-274}
    offsetX={-20}
  />
</div>

      </div>
    </div>
  );
};

export default Chat;
