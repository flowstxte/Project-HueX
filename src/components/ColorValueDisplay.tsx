"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { hexToRgb, rgbToHsl, rgbToHsv} from "@/lib/colors";
import CopyButton from "./CopyButton";
import { Ruler } from "lucide-react";

interface ColorValueDisplayProps {
  color: string;
}

const ValueRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between font-mono text-sm py-3 transition-colors duration-150 hover:bg-secondary/50 px-3 -mx-3 rounded-md">
    <span className="text-muted-foreground">{label}</span>
    <div className="flex items-center gap-2">
      <span className="font-medium">{value}</span>
      <CopyButton textToCopy={value} />
    </div>
  </div>
);

export default function ColorValueDisplay({ color }: ColorValueDisplayProps) {
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb);
  const hsv = rgbToHsv(rgb);

  const values = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "HSV", value: `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)` },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Ruler className="h-5 w-5" />
        <CardTitle className="text-xl">Color Values</CardTitle>
      </CardHeader>
      <CardContent>
        {values.map((item, index) => (
          <React.Fragment key={item.label}>
            <ValueRow label={item.label} value={item.value} />
            {index < values.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}