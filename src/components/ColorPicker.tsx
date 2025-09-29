"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { rgbToHex, rgbToHsv, hsvToRgb, hexToRgb } from "@/lib/colors";
import type { HSV } from "@/lib/types";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const Saturation = ({ hsv, onChange }: { hsv: HSV, onChange: (newHsv: Partial<HSV>) => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return;
        e.preventDefault();
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = Math.max(0, Math.min(clientX - left, width));
        const y = Math.max(0, Math.min(clientY - top, height));

        const saturation = (x / width) * 100;
        const value = 100 - (y / height) * 100;

        onChange({ s: saturation, v: value });
    }, [onChange]);
    
    const stopMove = useCallback(() => {
        window.removeEventListener('mousemove', handleMove as any);
        window.removeEventListener('mouseup', stopMove);
        window.removeEventListener('touchmove', handleMove as any);
        window.removeEventListener('touchend', stopMove);
    }, [handleMove]);

    const startMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        handleMove(e);
        window.addEventListener('mousemove', handleMove as any);
        window.addEventListener('mouseup', stopMove);
        window.addEventListener('touchmove', handleMove as any);
        window.addEventListener('touchend', stopMove);
    }, [handleMove, stopMove]);

    const pointerStyle = {
        left: `${hsv.s}%`,
        top: `${100 - hsv.v}%`,
        backgroundColor: rgbToHex(hsvToRgb(hsv)),
    };

    return (
        <div 
            ref={containerRef}
            className="relative h-48 w-full cursor-pointer rounded-t-lg"
            style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
            onMouseDown={startMove}
            onTouchStart={startMove}
        >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, black, transparent)' }} />
            <div 
                className="absolute h-4 w-4 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2 transform transition-all duration-100 ease-in-out"
                style={pointerStyle}
            />
        </div>
    );
};

const HueSlider = ({ hsv, onChange }: { hsv: HSV, onChange: (newHsv: Partial<HSV>) => void }) => {
    return (
        <input
            type="range"
            min="0"
            max="360"
            value={hsv.h}
            onChange={(e) => onChange({ h: Number(e.target.value) })}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer slider-thumb"
            style={{background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)'}}
        />
    );
};

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [hsv, setHsv] = useState<HSV>(rgbToHsv(hexToRgb("#F25623")));
  const [inputValue, setInputValue] = useState("#F25623");

  useEffect(() => {
    const newRgb = hexToRgb(color);
    if(JSON.stringify(hsvToRgb(hsv)) !== JSON.stringify(newRgb)) {
      setHsv(rgbToHsv(newRgb));
    }
    setInputValue(color);
  }, [color]);
  
  const handleHsvChange = (newHsvPart: Partial<HSV>) => {
    const newHsv = { ...hsv, ...newHsvPart };
    const newHex = rgbToHex(hsvToRgb(newHsv));
    setHsv(newHsv);
    onChange(newHex);
    setInputValue(newHex);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setInputValue(newHex);
    if (/^#[0-9A-F]{6}$/i.test(newHex) || /^#[0-9A-F]{3}$/i.test(newHex)) {
      onChange(newHex);
      setHsv(rgbToHsv(hexToRgb(newHex)));
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-2">
        <Palette className="h-5 w-5" />
        <CardTitle className="text-xl">Color Picker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <Saturation hsv={hsv} onChange={handleHsvChange} />
        <div className="px-6 pb-6 space-y-4">
            <HueSlider hsv={hsv} onChange={handleHsvChange} />
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-md border transition-colors duration-200" style={{ backgroundColor: color }} />
                <div className="w-full">
                    <Label htmlFor="hex-input" className="text-xs text-muted-foreground">HEX</Label>
                    <Input id="hex-input" value={inputValue} onChange={handleInputChange} className="font-mono text-base"/>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
