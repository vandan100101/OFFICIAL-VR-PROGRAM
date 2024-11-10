AFRAME.registerComponent("environment_component", {
  schema: {},

  init: function () {
    const children = this.el.children;
    for (let i = 0; i < children.length; i++) {
      // console.log(children[i]);
    }
  },

  update: function () {},

  remove: function () {},

  tick: function (time, timeDelta) {},
});
