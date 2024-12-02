import React, { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h1, h2, h3'))
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.charAt(1)),
      }));
    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' }
    );

    elements.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-24">
      <h4 className="text-sm font-semibold text-gray-900 mb-4">On this page</h4>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-sm py-1 ${
              heading.level === 1 ? 'pl-0' : `pl-${(heading.level - 1) * 4}`
            } ${
              activeId === heading.id
                ? 'text-indigo-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}