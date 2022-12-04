const controller = new ScrollMagic.Controller()

const randomizeTargets = document.querySelectorAll("[data-randomize]")
randomizeTargets.forEach(elem => {
  // style init
  elem.style.opacity = 0

  // add ScrollEvent
  new ScrollMagic.Scene({triggerElement: elem, triggerHook: "onEnter", offset: 200, reverse: false}) // トリガー要素、終了距離（px）
  .on("enter", function() {
    elem.style.opacity = 1
    var text = new ShuffleText(elem);
    text.start()
  })
  .addTo(controller)
})

class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!@$%&()<>-\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    };
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 50);
        const end = start + Math.floor(Math.random() * 50);
        this.queue.push({ from, to, start, end });
      };
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    };
    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.2) {
            char = this.randomChar();
            this.queue[i].char = char;
          };
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        };
      };
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      };
    };
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    };
};

  const phrases = [
    'Miyakami VN Mirror',
    'Vietnamese Version',
    'Hifumi Daisuki!!',
    'Man, I love Hoshino'
  ];

  const el = document.querySelector('.under_text');
  const fx = new TextScramble(el);

  let counter = 0;
const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2500)
    })
    counter = (counter + 1) % phrases.length
};

next();