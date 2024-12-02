import React, { useState } from 'react';
import { CheckIcon, ClipboardIcon } from '@heroicons/react/24/outline';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group">
      <pre className={`language-${language}`}>
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-lg bg-gray-800 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-gray-700"
      >
        {copied ? (
          <CheckIcon className="h-5 w-5 text-green-400" />
        ) : (
          <ClipboardIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}