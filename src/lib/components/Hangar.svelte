<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

    let container: HTMLDivElement;
    let cubes: any = [];
    let searchTerm: string = "";
    let giftData: any = [];
    let foundGift: any = null;
    let colors = [
        "#e6194b",
        "#3cb44b",
        "#ffe119",
        "#4363d8",
        "#f58231",
        "#911eb4",
        "#46f0f0",
        "#f032e6",
        "#bcf60c",
        "#fabebe",
        "#008080",
        "#e6beff",
        "#9a6324",
        "#fffac8",
        "#800000",
        "#aaffc3",
        "#808000",
        "#ffd8b1",
        "#000075",
        "#808080",
        "#ffffff",
        "#000000",
    ];

    function fetchGifts() {
        return fetch(
            "https://advent.sveltesociety.dev/data/2023/day-sixteen.json",
        )
            .then((response) => response.json())
            .then((data) => {
                // Update the gifts store with the fetched data
                giftData = data;
            })
            .catch((error) => console.error("Error:", error));
    }

    onMount(async () => {
        // Fetch the gifts from the URL
        await fetchGifts();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        const renderer = new THREE.WebGLRenderer();
        // Create the base geometry and material
        const baseGeometry = new THREE.PlaneGeometry(20, 20);
        const baseMaterial = new THREE.MeshBasicMaterial({
            color: 0x444444,
            side: THREE.DoubleSide,
        }); // Gray color

        // Create the base mesh and rotate it to be horizontal
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.rotation.x = -Math.PI / 2;
        scene.add(base);

        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Create a 20x20 grid
        const size = 20;
        const divisions = 20;
        const gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);

        // Adjust the camera position so the grid can be seen
        camera.position.z = 20;
        camera.position.y = 10;
        camera.lookAt(0, 0, 0);
        // let gift = giftData[0];
        // console.log(gift);
        let heights = {}; // Object to keep track of the height at each grid position
        let loader = new THREE.TextureLoader();

        for (let gift of giftData) {
            const geometry = new THREE.BoxGeometry(0.6, 1, 0.8);
            const color = new THREE.Color(
                colors[Math.floor(Math.random() * colors.length)],
            ); // Select a random color from the array
            const material = new THREE.MeshBasicMaterial({
                color: color,
                transparent: true,
            });

            const cube = new THREE.Mesh(geometry, material);
            cube.name = gift.name; // Store the gift name in the cube
            cubes.push(cube);
            // Get the current height at the gift's position
            const key = `${gift.x},${gift.y}`;
            const height = heights[key] || 0;

            cube.position.set(gift.x - 10, height + 0.6, gift.y-10 );

            // Increment the height at the gift's position
            heights[key] = height + 1;

            scene.add(cube);
        }

        let controls = new OrbitControls(camera, renderer.domElement);
        const animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    });

    function search() {
        for (let cube of cubes) {
            if (cube.name === searchTerm) {
                foundGift = cube;
                console.log(foundGift.position)
                cube.material.color.set(0xff0000); // Set color to red
                cube.material.transparent = false; // Make non-transparent
            } else {
                cube.material.color.set(0x808080); // Set color to gray
                cube.material.transparent = true; // Make transparent
                cube.material.opacity = 0.1; // Set transparency level
            }
        }
    }
</script>

<div bind:this={container} class="hanger-canvas"></div>
<div class="search">
    <input bind:value={searchTerm} list="names" placeholder="Search for a gift" />
   <datalist id="names">
        {#each giftData as gift (gift)}
            <option value={gift.name}>{gift.name}</option>
        {/each}
    </datalist>

    <button on:click={() => search()}>search</button>
    {#if searchTerm}
        <button on:click={() => (searchTerm = "")}>clear</button>
    {/if}
    {#if foundGift}
        <p>Found {foundGift.name} x:{foundGift.position.x+10} y:{foundGift.position.z+10}</p>
    {/if}
</div>

<style>
    .hanger-canvas {
        height: 100%;
        position: relative;
        width: 100%;
        overflow: hidden;
    }

    .search {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
        background-color: transparent;
    }

    .search p{
        display: inline-block;
        background-color: transparent;
    }
</style>
