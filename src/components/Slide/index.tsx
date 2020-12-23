/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Banner,
  Title,
  StyleSlider,
  SliderTrack,
  NavWrap,
  Nav,
} from "./styled";
import axios from "axios";

type notice = {
  title: string;
  url: string;
};

function Slide() {
  const [slideWidth, setSlideWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const navWrapRef = useRef<HTMLDivElement>(null);
  const [navWrapRefWidth, setNavWrapRefWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(0);
  const [notices, setNotices] = useState<notice[]>([] as notice[]);

  const slideTrackStyle = {
    width: slideWidth * notices.length,
    transform: `translateX(-${currentSlide * slideWidth}px)`,
  };

  const onClickNav = (i: number) => {
    setCurrentSlide(i);
  };

  const handleSlideWidth = useCallback(() => {
    if (sliderRef.current) {
      setSlideWidth(sliderRef.current.offsetWidth);
    }
  }, [slideWidth]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=54cfead6486041a2af9ec1cf6e98d343`
      );
      response.data.articles.length > 3
        ? setNotices(response.data.articles.slice(0, 3))
        : setNotices(response.data.articles);
    })();
  }, []);

  useEffect(() => {
    if (navWrapRef.current) {
      setNavWrapRefWidth(navWrapRef.current.offsetWidth);
    }
  }, [notices]);

  useEffect(() => {
    if (notices.length < 1) return;
    const slideRefWidths: number[] = [];
    for (let i = 0; i < notices.length; i++) {
      if (slideRefs[i].current) {
        slideRefWidths.push(slideRefs[i].current!.scrollWidth);
      }
    }
    const maxSlideWidth = Math.max(...slideRefWidths);
    setSlideWidth(maxSlideWidth);
  }, [notices, navWrapRefWidth]);

  useEffect(() => {
    handleSlideWidth();
    window.addEventListener("resize", handleSlideWidth);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setCurrentSlide(currentSlide < notices.length - 1 ? currentSlide + 1 : 0);
    }, 3000);
    return function cleanUp() {
      clearInterval(timerRef.current);
    };
  }, [notices, currentSlide]);

  return (
    <>
      {notices && notices.length > 0 && (
        <Banner>
          <StyleSlider ref={sliderRef} width={slideWidth}>
            <SliderTrack style={slideTrackStyle}>
              {notices.map((notice, i) => {
                return (
                  <Title key={i} ref={slideRefs[i]} width={slideWidth}>
                    <a href={notice.url} target="_blank">
                      {notice.title}
                    </a>
                  </Title>
                );
              })}
            </SliderTrack>
          </StyleSlider>
          {notices.length > 1 && (
            <NavWrap ref={navWrapRef}>
              {notices.map((notice, i) => {
                return (
                  <Nav
                    className={i === currentSlide ? "current" : ""}
                    onClick={() => onClickNav(i)}
                    key={i}
                  />
                );
              })}
            </NavWrap>
          )}
        </Banner>
      )}
    </>
  );
}
export default React.memo(Slide);
