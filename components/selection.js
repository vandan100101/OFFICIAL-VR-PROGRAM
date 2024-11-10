AFRAME.registerComponent("selection", {
  init: function () {
    this.isMouseDown = false;
    this.isMouseEnter = false;

    this.circle = this.el.querySelector("a-circle");
    this.el.addEventListener("mouseenter", () => {
      this.isMouseEnter = true;
      if (!this.isMouseDown) {
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
        this.circle.setAttribute("color", "#8c52ff");
      }
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
      this.circle.setAttribute("radius", "0.05");
      this.circle.setAttribute("color", "red");
    });

    this.el.addEventListener("mouseup", () => {
      if (this.isMouseDown) {
        this.isMouseDown = false;
      } else {
        return;
      }
      if (this.isMouseEnter) {
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
        this.circle.setAttribute("color", "#8c52ff");
      }
    });
  },
});
