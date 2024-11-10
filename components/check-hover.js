AFRAME.registerComponent("check-hover", {
  schema: {},

  init: function () {
    this.check_display = this.el.parentNode.querySelector("[check-display]");
    this.el.setAttribute("animation__rotation", {
      property: "rotation",
      from: "0 0 0",
      to: "0 360 0",
      dur: 5000,
      easing: "linear",
      loop: true,
    });

    this.el.setAttribute("animation__position", {
      property: "position",
      from: "0 4.5 0",
      to: "0 4.3 0",
      dur: 1500,
      easing: "easeInOutQuad",
      dir: "alternate",
      loop: true,
    });

    this.check_display.setAttribute("visible", false);
    this.check_display.setAttribute("animation__position", {
      property: "position",
      from: "0 3 0",
      to: "0 6.2 0",
      dur: 500,
      startEvents: ["start-animation"],
    });
    this.check_display.setAttribute("animation__size", {
      property: "scale",
      from: "0.1 0.1 0.1",
      to: "0.5 0.5 0.5",
      dur: 500,
      startEvents: ["start-animation"],
    });
    this.check_display.setAttribute("animation__opacity", {
      property: "opacity",
      from: "0",
      to: "1",
      dur: 500,
      startEvents: ["start-animation"],
    });
    this.check_display.setAttribute("animation__position_reverse", {
      property: "position",
      to: "0 3 0",
      from: "0 6.2 0",
      dur: 500,
      startEvents: ["start-animation_reverse"],
    });
    this.check_display.setAttribute("animation__size_reverse", {
      property: "scale",
      to: "0.1 0.1 0.1",
      from: "0.5 0.5 0.5",
      dur: 500,
      startEvents: ["start-animation_reverse"],
    });
    this.check_display.setAttribute("animation__opacity_reverse", {
      property: "opacity",
      to: "0",
      from: "1",
      dur: 500,
      startEvents: ["start-animation_reverse"],
    });

    this.el.addEventListener("mouseenter", () => {
      this.el.components["animation__rotation"].pause();
      this.el.components["animation__position"].pause();
      this.check_display.setAttribute("visible", true);
      this.check_display.emit("start-animation");
    });

    this.el.addEventListener("mouseleave", () => {
      this.el.components["animation__rotation"].play();
      this.el.components["animation__position"].play();
      setTimeout(() => {
        this.check_display.emit("start-animation_reverse");
        setTimeout(() => {
          this.check_display.setAttribute("visible", false);
        }, 500);
      }, 5000);
    });
  },

  update: function () {},

  remove: function () {},

  tick: function (time, timeDelta) {},
});
