//import { createElement } from "react";

class Accordion {
  #$wrap;
  #data = [];
  constructor(selector, data) {
    this.#$wrap = document.querySelector(selector);
    this.#data = data;

    this.#render();
  }

  #render() {
    // 아코디언을 화면에 그려야 합니다.
    // this.#$wrap.innerHTML = ""; //초기화

    const boxAccordion = document.createElement("div");
    boxAccordion.classList.add("box-accordion");
    
    this.#data.forEach((item, index) => {
      const boxItem = document.createElement("div");
      const boxTitle = document.createElement("div");

      const title = document.createElement("h3");
      const btn = document.createElement("button");
      const content = document.createElement("div");

      boxTitle.classList.add("box-title");
      title.classList.add("title");
      btn.classList.add("btn");
      content.classList.add("content");
      content.classList.remove("open");

      title.textContent = item.title;
      content.textContent = item.content;
      btn.textContent = "▽";
      btn.addEventListener("click", () => {
        this.#btnEvent(btn, content);
      });
      btn.type = "button";

      boxTitle.append(title, btn);
      boxItem.append(boxTitle, content);
      boxAccordion.appendChild(boxItem);
    })

    this.#$wrap.appendChild(boxAccordion);
  }

  #btnEvent(btn, content) {
    const isOpen = content.classList.contains("open");

    if (isOpen === true) {
      content.classList.remove("open");
      btn.textContent = "▽";
    } else {
      content.classList.add("open");
      btn.textContent = "▲";
    }
  }
}