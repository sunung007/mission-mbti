import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export function scrollToTopFunc() {
  window.scrollTo(0, 0);
}

export default function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    scrollToTopFunc();
  }, [pathname]);

  return null;
}
