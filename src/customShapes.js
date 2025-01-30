import * as THREE from 'three';

// Class for making a Rectangle with soft corners
export function roundedRectangle(imagePath, width, height, opacity) { 
        let imageTexture = new THREE.TextureLoader().load(imagePath);
        let shape = new THREE.Shape();
        const x = -5, y = -2.5, radius = 1;

        // draw the shape, like a 3 year old
        shape.moveTo(x + radius, y);
        shape.lineTo(x + width - radius, y);
        shape.quadraticCurveTo(x + width, y, x + width, y + radius);
        shape.lineTo(x + width, y + height - radius);
        shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        shape.lineTo(x + radius, y + height);
        shape.quadraticCurveTo(x, y + height, x, y + height - radius);
        shape.lineTo(x, y + radius);
        shape.quadraticCurveTo(x, y, x + radius, y);

        // Create a geometry from the shape
        let roundedCorner = new THREE.ShapeGeometry(shape);

        // Manually set UV mapping so the image maps correctly because we wanted a custom shape, so we have to do it manually
        roundedCorner.computeBoundingBox();
        const max = roundedCorner.boundingBox.max;
        const min = roundedCorner.boundingBox.min;

        // Create an array to store the UV coordinates. This is so that when we take an image to map to the geometry, it maps correctly, and doesn't
        // stretch or distort the image like a 3 year old
        const uvArray = [];
        for (let i = 0; i < roundedCorner.attributes.position.count; i++) {
            const x = roundedCorner.attributes.position.getX(i);
            const y = roundedCorner.attributes.position.getY(i);

            // Map x and y to UV coordinates between 0 and 1
            const u = (x - min.x) / (max.x - min.x);
            const v = (y - min.y) / (max.y - min.y);
            uvArray.push(u, v);
        }

        // Set the UV map attribute for the geometry
        roundedCorner.setAttribute('uv', new THREE.Float32BufferAttribute(uvArray, 2));

        // Create a material with the image texture
        let roundedMaterial = new THREE.MeshBasicMaterial({ 
            map: imageTexture, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: opacity });
        
        // Create a mesh with the geometry and material
        let roundedMesh = new THREE.Mesh(roundedCorner, roundedMaterial);    
        return roundedMesh;
}

