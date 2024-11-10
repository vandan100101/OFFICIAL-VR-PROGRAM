AFRAME.registerComponent("input-logic", {
  schema: {
    setOutput: { type: "boolean", default: false },
  },

  init: function () {},

  update: function () {
    // const inputNodes = Array.from(this.el.children).filter((child) => {
    //   return child.hasAttribute("recieve-node");
    // });
    const outputNodes = Array.from(this.el.children).filter((child) => {
      return child.hasAttribute("transmit-node");
    });

    // Generate a random boolean value
    const randomValue = Math.random() < 0.5; // 50% chance of true or false

    // If setOutput is true, set transmit-node to true; otherwise, use the random value
    const valueToSet = this.data.setOutput ? true : randomValue;

    // Set the transmit-node attribute with the determined value
    outputNodes[0].setAttribute("transmit-node", "value", valueToSet);

    // const input = inputNodes[0].getAttribute("recieve-node").value;
    // outputNodes[0].setAttribute("transmit-node", "value", false);
  },

  remove: function () {},

  tick: function (time, timeDelta) {},
});