import React, { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from 'react';

import styles from './styles.module.css';

interface TextAreaProps {
  content: string;
}

export const TextArea: FC<TextAreaProps> = ({ content }) => {
  const [text, setText] = useState(content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleScroll = () => {
    if (textAreaRef.current && textDisplayRef.current) {
      textDisplayRef.current.scrollTop = textAreaRef.current.scrollTop;
      textDisplayRef.current.scrollLeft = textAreaRef.current.scrollLeft;
    }
  };

  const highlightedText = useMemo(() => {
    const parts = text.split(/(\s+|\n)/).map((part, i) => {
      if (part.startsWith('#')) {
        return <span key={i}>{part}</span>;
      } else if (part === '\n') {
        return (
          <p>
            <br key={i} />
            <br key={`${i}${i}`} />
          </p>
        );
      } else {
        return part;
      }
    });

    return parts;
  }, [text]);

  useEffect(() => {
    if (textAreaRef.current && textDisplayRef.current) {
      textDisplayRef.current.scrollTop = textAreaRef.current.scrollTop;
      textDisplayRef.current.scrollLeft = textAreaRef.current.scrollLeft;
    }
  }, [text]);

  return (
    <div className={styles.wrapper}>
      <div ref={textDisplayRef} className={styles.text}>
        {highlightedText}
      </div>
      <textarea
        ref={textAreaRef}
        className={styles.textarea}
        value={text}
        onChange={handleChange}
        onScroll={handleScroll}
      />
    </div>
  );
};
