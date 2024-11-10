AFRAME.registerComponent("auto-box", {
  init: function () {
    setTimeout(() => {
      this.updateBoundingBox();
    }, 100);
  },

  updateBoundingBox: function () {
    const el = this.el;
    const children = el.querySelectorAll("*");
    let minX = Infinity,
      minY = Infinity,
      minZ = Infinity;
    let maxX = -Infinity,
      maxY = -Infinity,
      maxZ = -Infinity;

    const processVertex = (
      vertex,
      childPosition,
      childScale,
      childRotation
    ) => {
      let transformed = new THREE.Vector3(
        vertex.x * childScale.x,
        vertex.y * childScale.y,
        vertex.z * childScale.z
      );

      transformed.applyAxisAngle(
        new THREE.Vector3(1, 0, 0),
        THREE.MathUtils.degToRad(childRotation.x)
      );
      transformed.applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        THREE.MathUtils.degToRad(childRotation.y)
      );
      transformed.applyAxisAngle(
        new THREE.Vector3(0, 0, 1),
        THREE.MathUtils.degToRad(childRotation.z)
      );

      transformed.add(childPosition);

      minX = Math.min(minX, transformed.x);
      minY = Math.min(minY, transformed.y);
      minZ = Math.min(minZ, transformed.z);
      maxX = Math.max(maxX, transformed.x);
      maxY = Math.max(maxY, transformed.y);
      maxZ = Math.max(maxZ, transformed.z);
    };

    children.forEach((child) => {
      if (child.object3D) {
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        const rotation = new THREE.Vector3();

        child.object3D.getWorldPosition(position);
        child.object3D.getWorldScale(scale);

        const rotationDeg = {
          x: THREE.MathUtils.radToDeg(child.object3D.rotation.x),
          y: THREE.MathUtils.radToDeg(child.object3D.rotation.y),
          z: THREE.MathUtils.radToDeg(child.object3D.rotation.z),
        };

        let vertices = [];
        if (child.getAttribute("geometry")) {
          const geometry = child.getAttribute("geometry");
          if (geometry.primitive === "box") {
            const halfWidth = (geometry.width || 1) / 2;
            const halfHeight = (geometry.height || 1) / 2;
            const halfDepth = (geometry.depth || 1) / 2;
            vertices = [
              new THREE.Vector3(-halfWidth, -halfHeight, -halfDepth),
              new THREE.Vector3(-halfWidth, -halfHeight, halfDepth),
              new THREE.Vector3(-halfWidth, halfHeight, -halfDepth),
              new THREE.Vector3(-halfWidth, halfHeight, halfDepth),
              new THREE.Vector3(halfWidth, -halfHeight, -halfDepth),
              new THREE.Vector3(halfWidth, -halfHeight, halfDepth),
              new THREE.Vector3(halfWidth, halfHeight, -halfDepth),
              new THREE.Vector3(halfWidth, halfHeight, halfDepth),
            ];
          } else if (geometry.primitive === "cylinder") {
            const radius = geometry.radius || 0.5;
            const height = (geometry.height || 2) / 2;
            for (let i = 0; i < 8; i++) {
              const angle = (i / 8) * Math.PI * 2;
              vertices.push(
                new THREE.Vector3(
                  Math.cos(angle) * radius,
                  -height,
                  Math.sin(angle) * radius
                ),
                new THREE.Vector3(
                  Math.cos(angle) * radius,
                  height,
                  Math.sin(angle) * radius
                )
              );
            }
          }
        }

        vertices.forEach((vertex) => {
          processVertex(vertex, position, scale, rotationDeg);
        });
      }
    });

    const width = Math.abs(maxX - minX);
    const height = Math.abs(maxY - minY);
    const depth = Math.abs(maxZ - minZ);

    el.setAttribute("geometry", {
      primitive: "box",
      width: width,
      height: height,
      depth: depth,
    });

    const center = new THREE.Vector3(
      (minX + maxX) / 2,
      (minY + maxY) / 2,
      (minZ + maxZ) / 2
    );
    el.object3D.position.copy(center);
  },
});
