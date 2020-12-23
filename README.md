### news 가져오기 (슬라이더에 3개까지 노출)

~~~js
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
~~~


### 가져온 news들 중 최대 너비를 구해 setSlideWidth

~~~js
for (let i = 0; i < notices.length; i++) {
      if (slideRefs[i].current) {
        slideRefWidths.push(slideRefs[i].current!.scrollWidth);
      }
    }
    const maxSlideWidth = Math.max(...slideRefWidths);
    setSlideWidth(maxSlideWidth);
~~~


### 3초마다 currentSlide + 1

~~~js
if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = window.setInterval(() => {
      setCurrentSlide(currentSlide < notices.length - 1 ? currentSlide + 1 : 0);
    }, 3000);
    return function cleanUp() {
      clearInterval(timerRef.current);
    };
~~~

### Title 리턴하기

~~~js
{notices.map((notice, i) => {
                return (
                  <Title key={i} ref={slideRefs[i]} width={slideWidth}>
                    <a href={notice.url} target="_blank">
                      {notice.title}
                    </a>
                  </Title>
                );
              })}
~~~
