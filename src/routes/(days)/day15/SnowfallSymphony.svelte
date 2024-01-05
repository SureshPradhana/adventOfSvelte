<script>
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { generate } from "$lib/utils/myUtilities";
    import { GUI } from "three/addons/libs/lil-gui.module.min.js";
    import { Canvg } from "canvg";

    let info;
    let windowHalfX = 0;
    let windowHalfY = 0;
    let canvasinfo;
    let svginfo;

    let camera, scene, renderer, parameters,scene2;
    let mouseX = 0,
        mouseY = 0;
    let value = ["snowflake", "maya", "symphony", "christmas", "winter"];
    let snowflakesarray = [];
    const textureLoader = new THREE.TextureLoader();

    const materials = [];
    onMount(async () => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        for (let i = 0; i <= 4; i++) {
            let data = `<svg
                width="50px"
                height="50px"
                viewBox="0 0 100 100"
                role="img"
                ><title>A Snowflake</title><g class="js-canvas"
                    >${generate(value[i])}</g></svg>`;
            svginfo.innerHTML += data;

            const pngDataUrl = await convertSvgToPng(data);
             const assignSRGB = (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
        };
            console.log(pngDataUrl);
            const texture = textureLoader.load(pngDataUrl, assignSRGB);
            
            canvasinfo.innerHTML += `<img src="${pngDataUrl}" />`;
            snowflakesarray.push(texture);
        }
        snowflakesarray = [...snowflakesarray];
        init();
        animate();
    });
    async function convertSvgToPng(svg) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const v = Canvg.fromString(ctx, svg);
        v.start();

        return canvas.toDataURL("image/png");
    }

    function init() {
        //sphere
        scene2 = new THREE.Scene();

        const geometry2 = new THREE.SphereGeometry(500, 60, 40);
        geometry2.scale(-1, 1, 1);
        
        scene2.add();






        //snowfall
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.0009);

        camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            2000,
        );
        camera.position.z = 1000;

        const geometry = new THREE.BufferGeometry();
        const vertices = [];

       
        const sprite1 = snowflakesarray[0];
        const sprite2 = snowflakesarray[1];
        const sprite3 = snowflakesarray[2];
        const sprite4 = snowflakesarray[3];
        const sprite5 = snowflakesarray[4];

        for (let i = 0; i < 10000; i++) {
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;

            vertices.push(x, y, z);
        }

        geometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(vertices, 3),
        );

        parameters = [
            [[1.0, 0.2, 0.5], sprite2, 20],
            [[0.95, 0.1, 0.5], sprite3, 15],
            [[0.9, 0.05, 0.5], sprite1, 10],
            [[0.85, 0, 0.5], sprite5, 8],
            [[0.8, 0, 0.5], sprite4, 5],
        ];

        for (let i = 0; i < parameters.length; i++) {
            const color = parameters[i][0];
            const sprite = parameters[i][1];
            const size = parameters[i][2];

            materials[i] = new THREE.PointsMaterial({
                size: size,
                map: sprite,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                transparent: true,
            });
            materials[i].color.setHSL(
                color[0],
                color[1],
                color[2],
                THREE.SRGBColorSpace,
            );

            const particles = new THREE.Points(geometry, materials[i]);

            particles.rotation.x = Math.random() * 6;
            particles.rotation.y = Math.random() * 6;
            particles.rotation.z = Math.random() * 6;

            scene.add(particles);
        }

        //

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        info.appendChild(renderer.domElement);

        //

        //

        const gui = new GUI();

        const params = {
            texture: true,
        };

        gui.add(params, "texture").onChange(function (value) {
            for (let i = 0; i < materials.length; i++) {
                materials[i].map = value === true ? parameters[i][1] : null;
                materials[i].needsUpdate = true;
            }
        });

        gui.open();

        info.style.touchAction = "none";
        info.addEventListener("pointermove", onPointerMove);
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onPointerMove(event) {
        if (event.isPrimary === false) return;

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    //

    function animate() {
        requestAnimationFrame(animate);

        render();
        // stats.update();
    }

    function render() {
        const time = Date.now() * 0.00005;

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;

        camera.lookAt(scene.position);

        for (let i = 0; i < scene.children.length; i++) {
            const object = scene.children[i];

            if (object instanceof THREE.Points) {
                object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
            }
        }

        for (let i = 0; i < materials.length; i++) {
            const color = parameters[i][0];

            const h = ((360 * (color[0] + time)) % 360) / 360;
            materials[i].color.setHSL(
                h,
                color[1],
                color[2],
                THREE.SRGBColorSpace,
            );
        }

        renderer.render(scene, camera);
    }
</script>

<div>
    <div id="info" bind:this={info}>
        <a href="https://threejs.org" target="_blank" rel="noopener">three.js</a
        >
        - webgl particle sprites example<br />
        snowflakes by
        <a
            href="http://en.wikipedia.org/wiki/File:Sketch_of_snow_crystal_by_Ren%C3%A9_Descartes.jpg"
            >Ren&eacute; Descartes</a
        >
    </div>
    <div>
        <div bind:this={canvasinfo}></div>
        <div bind:this={svginfo}></div>
    </div>
</div>
