// let activeEl = null;

AFRAME.registerComponent("logic-gate", {
  schema: {
    active: { type: "boolean", default: false },
    setToggle: {
      type: "boolean",
      default: false,
    },
  },
  init: function () {
    this.onHoverStart = this.onHoverStart.bind(this);
    this.onHoverEnd = this.onHoverEnd.bind(this);
  },

  update: function (oldData) {
    if (this.data.setToggle) {
      this.el.setAttribute("material", { color: "white", opacity: 0 });
      this.el.classList.remove("interactable");
      this.el.removeAttribute("grabbable");
      this.el.removeEventListener("hover-start", this.onHoverStart);
      this.el.removeEventListener("hover-end", this.onHoverEnd);
    } else {
      this.el.classList.add("interactable");
      this.el.setAttribute("grabbable", {});
      this.el.addEventListener("hover-start", this.onHoverStart);
      this.el.addEventListener("hover-end", this.onHoverEnd);
    }
  },

  remove: function () {
    this.el.removeEventListener("hover-start", this.onHoverStart);
    this.el.removeEventListener("hover-end", this.onHoverEnd);
  },

  onHoverStart: function () {
    this.el.setAttribute("material", {
      color: "white",
      opacity: 1,
      visible: true,
    });
  },
  onHoverEnd: function () {
    this.el.setAttribute("material", {
      color: "white",
      opacity: 0,
      visible: false,
    });
  },
});
