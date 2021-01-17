import React from "react";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      imgList: [
        "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png",
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg",
        "https://images.unsplash.com/photo-1473958828028-53df95f0b5ed?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=2000&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ"
      ],
      interval: 0,
      //  next++ prev--
      activeFirsrtIndex: 0,
      activeIndexs: [],
      translateIndexList: [],
      showItems: 3,
      step: 1
    };
    this.updateTranslates = this.updateTranslates.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.getTranslateX = this.getTranslateX.bind(this);
  }

  next() {
    this.updateTranslates(-this.state.step);
  }

  prev() {
    this.updateTranslates(this.state.step);
  }

  getClassName(index) {
    return "div-item";
  }

  getTranslateX(index) {
    let self = this;
    let { translateIndexList, showItems } = self.state;
    let x = translateIndexList[index] * 390 + "px";
    let v = translateIndexList[index];
    if (v < 0 || v > showItems - 1) {
      return {
        left: x,
        opacity: 0
      };
    } else {
      return {
        left: x,
        transition: "all ease-in-out 0.4s"
      };
    }
  }

  initCarousel() {
    let self = this;
    let {
      imgList,
      activeFirsrtIndex,
      activeIndexs,
      translateIndexList
    } = self.state;
    let len = imgList.length;
    imgList = imgList.concat(imgList, imgList);
    for (let i = -len; i < len + len; i++) {
      translateIndexList.push(i);
    }
    //
    self.setState({
      imgList,
      activeFirsrtIndex,
      activeIndexs,
      translateIndexList
    });
  }

  updateTranslates(step) {
    let self = this;
    let { imgList, translateIndexList } = self.state;
    // 去掉增加的一张 4
    let len = imgList.length / 3;
    //
    translateIndexList = translateIndexList.map(index => {
      let i = index + step;
      //  -4
      if (i < -len) {
        // 7
        return len + len - 1;
        // 7
      } else if (i > len + len - 1) {
        // -4
        return -len;
      } else {
        return i;
      }
    });
    console.log("debug translateIndexList sadsada", translateIndexList);
    self.setState({ translateIndexList });
  }

  componentDidMount() {
    let self = this;
    self.initCarousel();
    let interval = setInterval(() => {
      self.next();
    }, 3000);
    this.setState({ interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    let { imgList, activeIndexs, translateIndexList } = this.state;
    return (
      <div className="App">
        <h1>Hello React-pure-simple-multiple-carousel</h1>
        <p>{activeIndexs.join(";")}</p>
        <p>{translateIndexList.join(";")}</p>
        <p>{imgList.length}</p>
        <button onClick={this.next}>NEXT</button>
        <button onClick={this.prev}>prev</button>
        <div className="carousel">
          {imgList.map((img, i) => (
            <div
              className={this.getClassName(i)}
              style={this.getTranslateX(i)}
              key={i}
            >
              <img className="img-item" alt={i} src={img} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;