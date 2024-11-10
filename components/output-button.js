AFRAME.registerComponent("output-button", {
  schema: {
    setOutput: { type: "boolean", default: false },
  },

  init: function () {},

  update: function () {
    const output = this.el.parentNode;
    if (this.data.setOutput) {
      this.el.setAttribute("position", "0.016 0.041 -0.02");
    } else {
      this.el.setAttribute("position", "0.016 0.041 -0.0001");
    }
  },
  remove: function () {},
  tick: function (time, timeDelta) {},
});
