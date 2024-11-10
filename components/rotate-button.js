// Rotate Panel
// <a-entity position="0 1 0">
//   <a-text value="Rotate" position="-0.3 0.6 0.0"></a-text>
//   <a-box
//     rotate-button
//     class="interactable"
//     position="-0.5 0 0.05"
//     selection
//     mixin="xs-cube"
//     color="white"
//   >
//     <a-text value="CW" position="-0.1 0.3 0"></a-text
//   ></a-box>
//   <a-box
//     rotate-button
//     class="interactable"
//     position="0 0 0.05"
//     selection
//     mixin="xs-cube"
//     color="white"
//   >
//     <a-text value="CCW" position="-0.1 0.3 0"></a-text
//   ></a-box>

//   <a-box
//     rotate-button
//     class="interactable"
//     position="0.5 0 0.05"
//     selection
//     mixin="xs-cube"
//     color="white"
//     ><a-text value="UPRIGHT" position="-0.1 0.3 0"></a-text
//   ></a-box>
// </a-entity>

// di ko mapagana 😒
// AFRAME.registerComponent("rotate-button", {
//   init: function () {
//     function adjustRotationCW(num) {
//       let rotation = num;
//       if (rotation < 0) {
//         rotation = Math.ceil(rotation / 90) * 90;
//       } else {
//         rotation = Math.floor(rotation / 90) * 90 + 90;
//       }
//       return rotation;
//     }

//     function adjustRotationCCW(num) {
//       let rotation = num;
//       if (rotation < 0) {
//         rotation = Math.floor(rotation / 90) * 90;
//       } else {
//         rotation = Math.ceil((rotation - 90) / 90) * 90;
//       }
//       return rotation;
//     }

//     this.el.addEventListener("click", (event) => {
//       if (event.detail && event.detail.cursorEl) {
//         return;
//       }

//       const button = this.el.querySelector("a-text").getAttribute("value");
//       const sceneEl = document.querySelector("a-scene");
//       const active = sceneEl.querySelector("[active]");

//       if (!active) {
//         console.log("Error: No active element found");
//         return;
//       }

//       const activeObj3D = active.object3D;
//       const currentRotation = {
//         x: THREE.MathUtils.radToDeg(activeObj3D.rotation.x),
//         y: THREE.MathUtils.radToDeg(activeObj3D.rotation.y),
//         z: THREE.MathUtils.radToDeg(activeObj3D.rotation.z),
//       };

//       let newRotationZ;

//       switch (button) {
//         case "CW":
//           newRotationZ = adjustRotationCW(currentRotation.z);
//           break;
//         case "CCW":
//           newRotationZ = adjustRotationCCW(currentRotation.z);
//           break;
//         case "UPRIGHT":
//           activeObj3D.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
//           activeObj3D.updateMatrix();
//           return;
//         default:
//           console.log("error");
//           return;
//       }

//       const startRotZ = currentRotation.z;
//       const targetRotZ = newRotationZ;

//       active.removeAttribute("animation__rotate");

//       active.setAttribute("animation__rotate", {
//         property: "object3D.rotation.z",
//         from: THREE.MathUtils.degToRad(startRotZ),
//         to: THREE.MathUtils.degToRad(targetRotZ),
//         dur: 200,
//         easing: "easeOutQuad",
//       });

//       active.addEventListener(
//         "animationcomplete__rotate",
//         function updateRotation(e) {
//           activeObj3D.rotation.z = THREE.MathUtils.degToRad(targetRotZ);
//           activeObj3D.updateMatrix();

//           active.removeAttribute("animation__rotate");
//           active.removeEventListener(
//             "animationcomplete__rotate",
//             updateRotation
//           );
//         }
//       );
//     });
//   },
// });
