AFRAME.registerComponent("logic-node", {
  schema: {
    setToggle: {
      type: "boolean",
      default: false,
    },
  },
  init: function () {
    const uuid = THREE.MathUtils.generateUUID();
    this.el.setAttribute("uuid", uuid);
  },

  update: function (oldData) {
    if (this.data.setToggle) {
      this.el.classList.add("interactable");
    } else {
      this.el.classList.remove("interactable");
    }
  },
  remove: function () {
    this.el.classList.remove("interactable");
    this.el.removeAttribute("uuid");
  },
});
