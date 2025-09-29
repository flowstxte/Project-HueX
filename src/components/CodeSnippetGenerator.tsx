"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { hexToRgb } from "@/lib/colors";
import { generateSnippet, platformList, Platform } from "@/lib/code-snippets";
import CopyButton from "./CopyButton";
import { ChevronDown, Code } from 'lucide-react';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface CodeSnippetGeneratorProps {
  color: string;
}

export default function CodeSnippetGenerator({ color }: CodeSnippetGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(platformList[0]);
  const rgb = hexToRgb(color);
  const snippet = generateSnippet(selectedPlatform, color, rgb);

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              <CardTitle className="text-xl">Code Snippets</CardTitle>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {platformList.map((platform) => (
                <Button
                  key={platform}
                  variant={selectedPlatform === platform ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedPlatform(platform)}
                  className="text-xs"
                >
                  {platform}
                </Button>
              ))}
            </div>
            <div className="relative mt-2 p-4 rounded-md bg-secondary font-mono text-sm">
              <div className="absolute top-2 right-2">
                <CopyButton textToCopy={snippet} />
              </div>
              <pre className="whitespace-pre-wrap break-all">
                <code>{snippet}</code>
              </pre>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
