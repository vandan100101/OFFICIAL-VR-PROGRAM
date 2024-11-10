AFRAME.registerComponent("or-logic", {
  schema: {},

  init: function () {},

  update: function () {},

  remove: function () {
    // Do something the component or its entity is detached.
  },

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
      outputNodes[0].setAttribute("transmit-node", "value", true);
    }
    // Do something on every scene tick or frame.
  },
});
