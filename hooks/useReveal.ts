import { useEffect, useRef } from "react";

export function useReveal() {
  const rvRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { 
        if(e.isIntersecting) e.target.classList.add("vis"); 
      }),
      { threshold: 0.08 }
    );
    
    rvRefs.current.forEach(el => el && obs.observe(el));
    
    return () => { 
      obs.disconnect(); 
    };
  }, []);

  const rv = (el: HTMLElement | null) => { 
    if(el && !rvRefs.current.includes(el)) rvRefs.current.push(el); 
  };

  return rv;
}
