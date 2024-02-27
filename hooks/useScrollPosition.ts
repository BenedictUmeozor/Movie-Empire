import { useState, useEffect } from 'react';

const useScrollPosition = (): { isAtTop: boolean; isAtBottom: boolean } => {
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Check if user is at the top of the page
      setIsAtTop(scrollTop === 0);

      // Check if user is at the bottom of the page
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isAtTop, isAtBottom };
};

export default useScrollPosition;
