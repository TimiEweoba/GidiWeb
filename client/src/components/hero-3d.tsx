import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // SCENE SETUP
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050510, 0.015); // Less dense fog to make it more visible

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;
        camera.position.y = 2;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
        mountRef.current.appendChild(renderer.domElement);

        // ABSTRACT GEOMETRY
        const group = new THREE.Group();
        scene.add(group);

        // Creates soft, low-poly blobs
        const createBlob = (color: number, scale: number, x: number, y: number, z: number) => {
            const geometry = new THREE.IcosahedronGeometry(scale, 1); // low poly
            const material = new THREE.MeshPhysicalMaterial({
                color: color,
                metalness: 0.1,
                roughness: 0.5,
                transmission: 0.9,
                thickness: 2.5,
                wireframe: true, // gives it a stealthy architectural vibe
                transparent: true,
                opacity: 0.5 // Higher opacity so it's visible
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            // Random rotation
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            group.add(mesh);
            return mesh;
        };

        // Add a few floating geometries
        const blobs = [
            createBlob(0x32fbc1, 2.5, -4, 0, 0),
            createBlob(0xffffff, 1.8, 3, 2, -2),
            createBlob(0x32fbc1, 3.0, 1, -3, -4),
            createBlob(0x222233, 4.0, -2, 4, -5),
        ];

        // NEON 3D NIGERIAN SERVICE DOODLES (Wireframe Abstractions)
        const createDoodle = (color: number, type: string, scale: number, x: number, y: number, z: number) => {
            let geometry;
            if (type === 'bus') { // Danfo (box)
                geometry = new THREE.BoxGeometry(scale * 2.2, scale * 1.2, scale * 1.2);
            } else if (type === 'keke') { // Keke (tetrahedron)
                geometry = new THREE.TetrahedronGeometry(scale * 1.3, 1);
            } else if (type === 'okada') { // Okada (cylinder)
                geometry = new THREE.CylinderGeometry(scale * 0.3, scale * 0.3, scale * 2.5, 8);
            } else if (type === 'generator') { // Generator (box)
                geometry = new THREE.BoxGeometry(scale * 1.6, scale * 1.2, scale * 1.2);
            } else if (type === 'pos') { // POS (tall box)
                geometry = new THREE.BoxGeometry(scale * 1.0, scale * 1.8, scale * 0.4);
            } else if (type === 'grill') { // Suya Grill (cylinder)
                geometry = new THREE.CylinderGeometry(scale * 1.4, scale * 1.4, scale * 0.6, 12);
            } else if (type === 'pole') { // NEPA Pole (thin tall box)
                geometry = new THREE.BoxGeometry(scale * 0.2, scale * 3.5, scale * 0.2);
            } else if (type === 'pot') { // Buka pot (sphere)
                geometry = new THREE.SphereGeometry(scale * 1.2, 8, 8);
            } else {
                geometry = new THREE.OctahedronGeometry(scale, 1);
            }

            const material = new THREE.MeshPhysicalMaterial({
                color: color,
                metalness: 0.1,
                roughness: 0.4,
                transmission: 0.9,
                thickness: 1.5,
                wireframe: true,
                transparent: true,
                opacity: 0.25 // Less pronounced contrast
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            group.add(mesh);
            return mesh;
        };

        const doodles = [
            createDoodle(0xffe600, 'bus', 0.8, -4.5, 3.0, -2),
            createDoodle(0x00e5ff, 'keke', 0.7, 4.5, 3.5, -4),
            createDoodle(0xff00aa, 'okada', 0.6, -5.5, -1.0, -3),
            createDoodle(0xff8c00, 'generator', 0.7, -3.5, -4.0, -2),
            createDoodle(0x00ff88, 'pos', 0.6, 5.0, 0.5, -2),
            createDoodle(0xff4400, 'grill', 0.7, 4.0, -3.5, -3),
            createDoodle(0xbb00ff, 'pole', 0.8, -1.5, 4.5, -5),
            createDoodle(0xaaff00, 'pot', 0.6, 1.5, -4.5, -4)
        ];

        // PARTICLES (Subtle drift)
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 150;
        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x32fbc1,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // LIGHTING
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x32fbc1, 8, 30);
        pointLight.position.set(2, 3, 4);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0xffffff, 3, 30);
        pointLight2.position.set(-5, -2, -4);
        scene.add(pointLight2);

        // MOUSE PARALLAX
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onDocumentMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX - windowHalfX) * 0.001;
            mouseY = (event.clientY - windowHalfY) * 0.001;
        };

        const onDocumentTouchMove = (event: TouchEvent) => {
            if (event.touches.length === 1) {
                mouseX = (event.touches[0].pageX - windowHalfX) * 0.002;
                mouseY = (event.touches[0].pageY - windowHalfY) * 0.002;
            }
        };

        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("touchmove", onDocumentTouchMove, false);

        // ANIMATION LOOP
        let animationFrameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Slow rotation for the entire group
            group.rotation.y = elapsedTime * 0.05;
            group.rotation.x = elapsedTime * 0.02;

            // Individual blob float
            blobs.forEach((blob, i) => {
                blob.position.y += Math.sin(elapsedTime * 0.5 + i) * 0.002;
                blob.rotation.x += 0.001;
                blob.rotation.y += 0.002;
            });

            // Doodles float
            doodles.forEach((doodle, i) => {
                doodle.position.y += Math.sin(elapsedTime * 0.6 + i) * 0.003;
                doodle.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1);
                doodle.rotation.y += 0.002;
                doodle.rotation.z += 0.001;
            });

            // Parallax easing
            targetX = mouseX * 2;
            targetY = mouseY * 2;
            camera.position.x += (targetX - camera.position.x) * 0.02;
            camera.position.y += (-targetY - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            // Particle drift
            particles.rotation.y = elapsedTime * 0.02;

            renderer.render(scene, camera);
        };

        animate();

        // RESIZE HANDLER
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // CLEANUP
        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousemove", onDocumentMouseMove);
            document.removeEventListener("touchmove", onDocumentTouchMove);
            mountRef.current?.removeChild(renderer.domElement);
            cancelAnimationFrame(animationFrameId);

            // Dispose materials/geometries to prevent memory leaks
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
                    if (object.geometry) object.geometry.dispose();
                    if (object.material) {
                        if (Array.isArray(object.material)) {
                            object.material.forEach(m => m.dispose());
                        } else {
                            object.material.dispose();
                        }
                    }
                }
            });
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full opacity-100 mix-blend-screen" aria-hidden="true" />;
}
