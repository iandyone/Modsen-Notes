import React, { ChangeEvent, FC, useEffect, useMemo, useRef } from 'react';

import styles from './styles.module.css';
import { TextAreaProps } from './types';

export const TextArea: FC<TextAreaProps> = ({ content, tags, onChange, onBlur }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);

  const handleOnChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleScroll = () => {
    if (textAreaRef.current && textDisplayRef.current) {
      textDisplayRef.current.scrollTop = textAreaRef.current.scrollTop;
      textDisplayRef.current.scrollLeft = textAreaRef.current.scrollLeft;
    }
  };

  const highlightedText = useMemo(() => {
    const parts = content.split(/(\s+|\n)/).map((word, index) => {
      if (tags.includes(word) || (word.startsWith('#') && word.length > 1)) {
        return <span key={index}>{word}</span>;
      }

      if (word === '\n') {
        return <br key={index} />;
      }

      return word;
    });

    return parts;
  }, [content, tags]);

  const handleOnBlurTextarea = () => {
    onBlur();
  };

  useEffect(() => {
    if (textAreaRef.current && textDisplayRef.current) {
      textDisplayRef.current.scrollTop = textAreaRef.current.scrollTop;
      textDisplayRef.current.scrollLeft = textAreaRef.current.scrollLeft;
    }
  }, [content]);

  return (
    <div className={styles.wrapper}>
      <div ref={textDisplayRef} className={styles.text}>
        {highlightedText}
      </div>
      <textarea
        id="note-description"
        ref={textAreaRef}
        className={styles.textarea}
        value={content}
        onChange={handleOnChangeTextarea}
        onScroll={handleScroll}
        onBlur={handleOnBlurTextarea}
      />
    </div>
  );
};
