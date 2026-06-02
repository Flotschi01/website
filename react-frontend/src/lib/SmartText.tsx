import React, { useState, useEffect, useRef } from 'react';

interface SmartTextProps {
  content: string;
  collapsible?: boolean;
}

const parseInlineStyles = (text: string): React.ReactNode[] => {
  const tokens = text.split(/(\*.*?\*|_.*?_|`.*?`)/g);

  return tokens.map((token, index) => {
    if (token.startsWith('*') && token.endsWith('*')) {
      return <strong key={index} style={{ fontWeight: 600 }}>{token.slice(1, -1)}</strong>;
    }
    if (token.startsWith('_') && token.endsWith('_')) {
      return <em key={index}>{token.slice(1, -1)}</em>;
    }
    if (token.startsWith('`') && token.endsWith('`')) {
      return <code key={index}>{token.slice(1, -1)}</code>;
    }
    return token;
  });
};

export const SmartText: React.FC<SmartTextProps> = ({ content, collapsible = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect if the text height actually exceeds the maximum allowed collapsed height
  useEffect(() => {
    if (!collapsible) return;

    const checkOverflow = () => {
      if (containerRef.current) {
        // Tailwind 'lg' breakpoint is 1024px. Matches our CSS max-heights
        const isDesktop = window.innerWidth >= 1024;
        const maxHeightThreshold = isDesktop ? 336 : 250;

        // Compare the true un-clamped height of the text to the threshold
        setIsOverflowing(containerRef.current.scrollHeight > maxHeightThreshold + 50);
      }
    };

    // Run on initial render and whenever content changes
    checkOverflow();

    // Add event listener to re-verify if the user resizes their screen
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [content, collapsible]);

  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentListItems: React.ReactNode[] = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('- ')) {
      const itemContent = trimmed.substring(2);
      currentListItems.push(
        <li key={`li-${index}`}>{parseInlineStyles(itemContent)}</li>
      );
    } else {
      if (currentListItems.length > 0) {
        renderedElements.push(<ul key={`ul-${index}`} className="list-disc list-outside mb-4 pl-8">{currentListItems}</ul>);
        currentListItems = [];
      }

      if (trimmed === '') {
        renderedElements.push(<br key={`br-${index}`} />);
      } else {
        renderedElements.push(
          <p key={`p-${index}`} style={{ margin: '0 0 8px 0' }}>
            {parseInlineStyles(line)}
          </p>
        );
      }
    }
  });

  if (currentListItems.length > 0) {
    renderedElements.push(<ul key="ul-final" className="list-disc list-outside mb-4 pl-8">{currentListItems}</ul>);
  }

  if (!collapsible) {
    return <>{renderedElements}</>;
  }

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          !isOverflowing
            ? '' // Do absolutely nothing if the text is short enough to fit naturally
            : isExpanded
            ? 'max-h-[2000px]'
            : 'max-h-[250px] lg:max-h-[336px] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]'
        }`}
      >
        {renderedElements}
      </div>

      {/* Only render the button if the text actually overflows the thresholds */}
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-block text-base font-medium text-[var(--color-primary)] hover:opacity-80 underline underline-offset-4 transition-all focus:outline-none"
        >
          {isExpanded ? 'Weniger anzeigen' : 'Mehr erfahren'}
        </button>
      )}
    </div>
  );
};