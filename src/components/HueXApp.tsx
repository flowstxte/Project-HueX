"use client";

import { useState } from "react";
import ColorPicker from "./ColorPicker";
import ColorValueDisplay from "./ColorValueDisplay";
import CodeSnippetGenerator from "./CodeSnippetGenerator";

export default function HueXApp() {
  const [color, setColor] = useState("#F25623");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    document.documentElement.style.setProperty('--primary-dynamic', newColor);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-7xl mx-auto">
      <div className="md:col-span-2">
        <ColorPicker color={color} onChange={handleColorChange} />
      </div>
      <div className="md:col-span-3 flex flex-col gap-8">
        <ColorValueDisplay color={color} />
        <CodeSnippetGenerator color={color} />
      </div>
    </div>
  );
}
