AFRAME.registerComponent("not-logic", {
  schema: {},

  init: function () {},

  update: function () {},

  remove: function () {},

  tick: function (time, timeDelta) {
    const inputNodes = Array.from(this.el.children).filter((child) => {
      return child.hasAttribute("recieve-node");
    });
    const outputNodes = Array.from(this.el.children).filter((child) => {
      return child.hasAttribute("transmit-node");
    });
    const input = inputNodes[0].getAttribute("recieve-node").value;
    outputNodes[0].setAttribute("transmit-node", "value", !input);
  },
});
