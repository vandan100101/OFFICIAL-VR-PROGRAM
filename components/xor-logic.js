AFRAME.registerComponent("xor-logic", {
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
    const input1 = inputNodes[0].getAttribute("recieve-node").value;
    const input2 = inputNodes[1].getAttribute("recieve-node").value;
    if (input1 || input2) {
      if (input1 == input2) {
        outputNodes[0].setAttribute("transmit-node", "value", false);
      } else {
        outputNodes[0].setAttribute("transmit-node", "value", true);
      }
    } else {
      outputNodes[0].setAttribute("transmit-node", "value", false);
    }
  },
});
