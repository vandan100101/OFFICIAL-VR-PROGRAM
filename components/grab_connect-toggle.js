let Globaltoggle = false;
AFRAME.registerComponent("grab_connect-toggle", {
  schema: {
    toggle: { type: "boolean", default: false },
  },
  init: function () {
    this.isMouseDown = false;
    this.isMouseEnter = false;
    this.parentNode = this.el.parentNode;
    const position = this.el.getAttribute("position");
    this.originalPosition = { x: position.x, y: position.y, z: position.z };
    const newPositionZ = this.originalPosition.z - 0.1;
    this.circle = this.parentNode.querySelector("#animation-circle");
    this.el.addEventListener("mouseenter", () => {
      this.isMouseEnter = true;

      this.circle.setAttribute("visible", true);
      this.circle.setAttribute("animation", {
        enabled: true,
        property: "geometry.radius",
        from: 0.03,
        to: 0.05,
        dur: 500,
        easing: "easeOutQuad",
        loop: true,
      });
    });
    this.el.addEventListener("mouseleave", () => {
      this.isMouseEnter = false;

      this.circle.setAttribute("animation", {
        enabled: false,
      });
      this.circle.setAttribute("visible", false);
    });

    this.el.addEventListener("mousedown", (event) => {
      if (event.detail && event.detail.cursorEl) {
        return;
      }
      this.isMouseDown = true;
      this.circle.setAttribute("animation", {
        enabled: false,
      });
      this.circle.setAttribute("visible", true);
      this.circle.setAttribute("radius", "0.03");
    });

    this.el.addEventListener("mouseup", (event) => {
      if (event.detail && event.detail.cursorEl) {
        return;
      }
      if (!this.isMouseDown) return;
      if (!this.isMouseEnter) {
        this.circle.setAttribute("animation", {
          enabled: false,
        });
        this.circle.setAttribute("visible", false);
      }

      if (!this.isMouseDown) {
        return;
      }
      this.isMouseDown = false;

      this.circle.setAttribute("animation", {
        enabled: false,
      });

      if (!this.data.toggle) {
        this.circle.setAttribute("color", "#00c2cb");
        this.data.toggle = true;
        Globaltoggle = true;
      } else {
        this.circle.setAttribute("color", "#8c52ff");
        this.data.toggle = false;
        Globaltoggle = false;
      }

      this.setToggle(this.data.toggle);
      this.changeText(this.data.toggle);
    });
  },

  changeText: function (toggle) {
    const context = this.parentNode.querySelector("#connectingtext");
    const conradio = this.parentNode.querySelector("#connectingradio");
    const grabtext = this.parentNode.querySelector("#grabbingtext");
    const grabradio = this.parentNode.querySelector("#grabbingradio");
    if (toggle) {
      context.setAttribute("visible", true);
      conradio.setAttribute("visible", true);
      grabtext.setAttribute("visible", false);
      grabradio.setAttribute("visible", false);
    } else {
      context.setAttribute("visible", false);
      conradio.setAttribute("visible", false);
      grabtext.setAttribute("visible", true);
      grabradio.setAttribute("visible", true);
    }
  },
  setToggle: function (toggle) {
    this.sceneEl = document.querySelector("a-scene");
    const gates = this.sceneEl.querySelectorAll(".gates");
    const nodes = this.sceneEl.querySelectorAll(".nodes");
    const selections = this.sceneEl.querySelectorAll(".selection");
    if (toggle) {
      gates.forEach((entity) => {
        entity.setAttribute("logic-gate", { setToggle: true, active: false });
      });
      selections.forEach((entity) => {
        entity.setAttribute("add-button", { setToggle: true });
      });
      nodes.forEach((entity) => {
        entity.setAttribute("logic-node", { setToggle: true });
        if (entity.hasAttribute("transmit-node")) {
          entity.setAttribute("transmit-node", { setToggle: true });
        }
        if (entity.hasAttribute("recieve-node")) {
          entity.setAttribute("recieve-node", { setToggle: true });
        }
      });
    } else {
      gates.forEach((entity) => {
        entity.setAttribute("logic-gate", { setToggle: false });
      });
      selections.forEach((entity) => {
        entity.setAttribute("add-button", { setToggle: false });
      });
      nodes.forEach((entity) => {
        entity.setAttribute("logic-node", { setToggle: false });
        if (entity.hasAttribute("transmit-node")) {
          entity.setAttribute("transmit-node", { setToggle: false });
        }
        if (entity.hasAttribute("recieve-node")) {
          entity.setAttribute("recieve-node", { setToggle: false });
        }
      });
    }
  },
});
