AFRAME.registerComponent("output-logic", {
  schema: {},

  init: function () {},

  update: function () {},

  remove: function () {},

  tick: function (time, timeDelta) {
    const inputNodes = Array.from(this.el.children).filter((child) => {
      return child.hasAttribute("recieve-node");
    });
    //   const outputNodes = Array.from(this.el.children).filter((child) => {
    //     return child.hasAttribute("transmit-node");
    //   });
    const input = inputNodes[0].getAttribute("recieve-node").value;
    inputNodes[0].setAttribute("transmit-node", "value", input);
    const output = this.el.querySelector("[output-button]");

    output.setAttribute("output-button", "setOutput", input);
    const inputSphere = inputNodes[0].querySelector("#output_node");
    if (input) {
      inputSphere.setAttribute("material", {
        color: "yellow",
        emissive: "yellow",
        emissiveIntensity: 1,
      });
    } else {
      inputSphere.setAttribute("material", {
        color: "white",
        emissive: "white",
        emissiveIntensity: 0,
      });
    }
  },
});
