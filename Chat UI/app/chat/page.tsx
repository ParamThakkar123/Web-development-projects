"use client";
import React, { useState } from "react";
import { ModeToggle } from "../Components/Modetoggle";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Input } from "@/components/ui/input";
import {
  IndicTransliterate,
  Language,
  TriggerKeys,
} from "@ai4bharat/indic-transliterate";

const Chat = () => {
  const [text, setText] = useState("");
  const [lang, setLang] = useState<Language>("mr");

  return (
    <div className="flex">
      <div className="w-60">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 h-screen">
        <div className="flex justify-end p-5">
          <ModeToggle />
        </div>

        <div className="flex-1 text-center tracking-wide pl-12 pr-12 mt-40 text-xl">
          
        </div>

        <div className="w-full p-6"> {/* Input area */}
          <IndicTransliterate
            renderComponent={(props) => <Input {...props} />}
            value={text}
            onChangeText={(text) => setText(text)}
            lang={lang}
            className="w-full rounded text-lg font-serif"
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

