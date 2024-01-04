<script lang="ts">
    import { onMount } from "svelte";
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import Popup from "$lib/components/Popup.svelte";

    let container: HTMLDivElement;
    let cubes: any = [];
    let searchTerm: string = "";
    let giftData: any = [];
    let foundGift: any = null;
    let renderer: any = null;
    let lids: any = [];
    let cubeTexture: any = null;

    let mesh = null;

    function fetchGifts() {
        return fetch(
            "https://advent.sveltesociety.dev/data/2023/day-sixteen.json",
        )
            .then((response) => response.json())
            .then((data) => {
                giftData = data;
            })
            .catch((error) => console.error("Error:", error));
    }

    onMount(async () => {
        await fetchGifts();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            100,
        );

        const baseGeometry = new THREE.PlaneGeometry(21, 21);
        const baseMaterial = new THREE.MeshBasicMaterial({
            color: 0x444444,
            side: THREE.DoubleSide,
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.rotation.x = -Math.PI / 2;
        scene.add(base);

        let texture = new THREE.TextureLoader().load("./red-background-2.jpeg");
        texture.colorSpace = THREE.SRGBColorSpace;
        cubeTexture = texture;

       

        const lidGeometry = new THREE.BoxGeometry(0.9, 0.2, 0.9); // Smaller width and depth, greater height
        const lidMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
        });
        const lid = new THREE.Mesh(lidGeometry, lidMaterial);
        lid.position.y = 0.6; 
       

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Create a 20x20 grid
        const size = 21;
        const divisions = 21;
        const gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);

        
        camera.position.z = 20;
        camera.position.y = 10;
        camera.lookAt(0, 0, 0);
        

        let heights = {}; 

        for (let gift of giftData) {
            const boxGeometry = new THREE.BoxGeometry(0.8, 1, 0.8);
            const boxMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
            });
            const cube = new THREE.Mesh(boxGeometry, boxMaterial);
            const lid = new THREE.Mesh(lidGeometry, lidMaterial);
            cube.name = gift.name;
            cubes.push(cube);

            lids.push(lid);

            const key = `${gift.x},${gift.y}`;
            const height = heights[key] || 0;
            let x = gift.x;
            let y = gift.y;
            if (gift.x <= 10) {
                let remainderx = gift.x;
                let remaindery = gift.y;
                x = remainderx - 10;
                y = 10 - remaindery;
            } else {
                x = gift.x - 10;
                y = 10 - gift.y;
            }

            cube.position.set(x, height + 0.6, y);
            lid.position.set(x, height + 1.1, y);

            heights[key] = height + 1;

            scene.add(cube);
            scene.add(lid);
        }

        let controls = new OrbitControls(camera, renderer.domElement);
        const animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    });
    let showModal = false;
    let modalMessage = "";
    function search() {
        if (!searchTerm) {
            showModal = true;
            modalMessage = "Please enter a search term";
            return;
        }
        foundGift = null; // Reset foundGift

        for (let cube of cubes) {
            if (cube.name === searchTerm) {
                foundGift = cube;
                cube.material.transparent = false;
                cube.material.needsUpdate = true;
                cube.material.map=cubeTexture;
                cube.material.opacity = 1;
                console.log(cube);
                modalMessage = `Found ${cube.name} at x:${cube.position.x + 10} y:${cube.position.z + 10}`;
            } else {
                cube.material.transparent = true;
                cube.material.opacity = 0.1;
                cube.material.map = null;
                cube.material.needsUpdate = true;
            }
        }
        if(!foundGift){
            showModal = true;
            modalMessage = `Could not find ${searchTerm}`;
        }

        lids[0].material.transparent = true;
        lids[0].material.map = null;
        lids[0].material.opacity = 0.1;
        lids[0].material.needsUpdate = true;
    }

    function closeModal() {
        showModal = false;
    }

    function refresh() {
        for (let cube of cubes) {
            cube.material.transparent = true;
            cube.material.opacity = 1;
            cube.material.map = cubeTexture;
            cube.material.needsUpdate = true;
        }
        lids[0].material.transparent = true;
        lids[0].material.map = cubeTexture;
        lids[0].material.opacity = 1;
        lids[0].material.needsUpdate = true;
    }
</script>

<Popup show={showModal} message={modalMessage} close={() => closeModal()} />
<div bind:this={container} class="hanger-canvas"></div>
<div class="search">
    <input
        bind:value={searchTerm}
        list="names"
        placeholder="Search for a gift"
    />
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
        <p>
            Found {foundGift.name} x:{foundGift.position.x + 10} y:{foundGift
                .position.z + 10}
        </p>
    {/if}
</div>
<div>
    <button on:click={() => refresh()} class="refresh">refresh</button>
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

    .search p {
        display: inline-block;
        background-color: transparent;
    }
    
    .refresh {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;
    }

     .search input {
        padding: 0.2rem 0.5rem;
        font-size: 0.8rem;
        border: none;
        box-shadow: 0 0 15px 4px rgba(0,0,0,0.06);
    }

    .search input:focus {
        outline: none;
        box-shadow: 0 0 10px 2px rgba(0,0,0,0.1);
    }
</style>
