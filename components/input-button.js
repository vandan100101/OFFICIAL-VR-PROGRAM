AFRAME.registerComponent("input-button", {
  schema: {
    setOutput: { type: "boolean", default: true },
  },

  init: function () {
    this.el.addEventListener("click", this.onClick.bind(this));
  },

  onClick: function (event) {
    if (event.detail && event.detail.cursorEl) {
      return;
    }
    const output = this.el.parentNode;
    if (this.data.setOutput) {
      this.el.setAttribute("position", "-0.086 0.041 -0.001");
      this.data.setOutput = false;
      output.setAttribute("input-logic", "setOutput", false);
    } else {
      this.el.setAttribute("position", "-0.086 0.041 -0.02");
      this.data.setOutput = true;
      output.setAttribute("input-logic", "setOutput", true);
    }
  },

  onHoverStart: function () {
    this.el.setAttribute("material", "opacity", "0.3");
  },

  onHoverEnd: function () {
    this.el.setAttribute("material", "opacity", "1");
  },

  update: function () {},
  remove: function () {},
  tick: function (time, timeDelta) {},
});
