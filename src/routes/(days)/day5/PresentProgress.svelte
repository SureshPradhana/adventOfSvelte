<script lang="ts">
    import { onMount } from "svelte";
    type TaskType = "CREATED_TOY" | "WRAPPED_PRESENT";

    interface Task {
        elf: string;
        task: TaskType;
        minutesTaken: number;
        date: string;
    }
    let tasks: Task[] = [];
    let total_created_toys: number = 0;
    let total_wrapped_toys: number = 0;
    let currentPage: number = 1;
    let itemsPerPage: number = 18;
    let fastest_wrapper: [string, number] = ["", 0];
    let fastest_creator: [string, number] = ["", 0];
    let mostwrappedelf: [string, number] = ["", 0];
    let mostwrappedelf2: any = {};
    let mostcreatedelf2: any = {};
    let mostcreatedelf: [string, number] = ["", 0];
    let total_elfs: number = 0;
    let total_elfs_wrapping: number = 0;
    let total_elfs_creating: number = 0;
    let total_time_taken_wrapping: number = 0;
    let total_time_taken_creating: number = 0;
    let average_time_taken_wrapping: number = 0;
    let average_time_taken_creating: number = 0;
    let total_left_toys_to_be_wrapped: number = 0;
    const fetchData = async () => {
        const response = await fetch(
            "https://advent.sveltesociety.dev/data/2023/day-five.json",
        );
        tasks = await response.json();
        tasks = tasks.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        total_created_toys = tasks.filter(
            (task) => task.task === "CREATED_TOY",
        ).length;
        total_wrapped_toys = tasks.filter(
            (task) => task.task === "WRAPPED_PRESENT",
        ).length;
    };

    onMount(() => {
        fetchData();
        setInterval(fetchData, 120000); // 2 minutes
    });

    $: fastest_wrapper = tasks.reduce(
        (acc, curr) => {
            if (curr.task === "WRAPPED_PRESENT") {
                if (acc[0] === "") {
                    return [curr.elf, curr.minutesTaken];
                } else {
                    return curr.minutesTaken < acc[1]
                        ? [curr.elf, curr.minutesTaken]
                        : acc;
                }
            } else {
                return acc;
            }
        },
        ["", Infinity],
    );

    $: fastest_creator = tasks.reduce(
        (acc, curr) => {
            if (curr.task === "CREATED_TOY") {
                if (acc[0] === "") {
                    return [curr.elf, curr.minutesTaken];
                } else {
                    return curr.minutesTaken < acc[1]
                        ? [curr.elf, curr.minutesTaken]
                        : acc;
                }
            } else {
                return acc;
            }
        },
        ["", Infinity],
    );

    //most wrapped elf is who has most WRAPPED_PRESENT
    $: mostwrappedelf2 = tasks.reduce((acc, curr) => {
        if (curr.task === "WRAPPED_PRESENT") {
            acc[curr.elf] = (acc[curr.elf] || 0) + 1;
        }
        return acc;
    }, {});

    $: mostwrappedelf = Object.keys(mostwrappedelf2).reduce(
        (a, b) =>
            mostwrappedelf2[a] > mostwrappedelf2[b]
                ? [a, mostwrappedelf2[a]]
                : [b, mostwrappedelf2[b]],
        ["", 0], // Initial value
    );
    $: mostwrappedelf = mostwrappedelf ? mostwrappedelf : ["", 0];

    //most created elf is who has most CREATED_TOY
    $: mostcreatedelf2 = tasks.reduce((acc, curr) => {
        if (curr.task === "CREATED_TOY") {
            acc[curr.elf] = (acc[curr.elf] || 0) + 1;
        }
        return acc;
    }, {});

    $: mostcreatedelf = Object.keys(mostcreatedelf2).reduce(
        (a, b) =>
            mostcreatedelf2[a] > mostcreatedelf2[b]
                ? [a, mostcreatedelf2[a]]
                : [b, mostcreatedelf2[b]],
        ["", 0], // Initial value
    );

    $: mostcreatedelf = mostcreatedelf ? mostcreatedelf : ["", 0];

    $: total_elfs = tasks.reduce((acc, curr) => {
        if (acc.indexOf(curr.elf) === -1) {
            acc.push(curr.elf);
        }
        return acc;
    }, []).length;

    $: total_elfs_wrapping = tasks.reduce((acc, curr) => {
        if (curr.task === "WRAPPED_PRESENT") {
            if (acc.indexOf(curr.elf) === -1) {
                acc.push(curr.elf);
            }
        }
        return acc;
    }, []).length;

    $: total_elfs_creating = tasks.reduce((acc, curr) => {
        if (curr.task === "CREATED_TOY") {
            if (acc.indexOf(curr.elf) === -1) {
                acc.push(curr.elf);
            }
        }
        return acc;
    }, []).length;

    $: total_time_taken_wrapping = tasks.reduce((acc, curr) => {
        if (curr.task === "WRAPPED_PRESENT") {
            acc += curr.minutesTaken;
        }
        return acc;
    }, 0);

    $: total_time_taken_creating = tasks.reduce((acc, curr) => {
        if (curr.task === "CREATED_TOY") {
            acc += curr.minutesTaken;
        }
        return acc;
    }, 0);

    $: average_time_taken_wrapping = Math.ceil(
        total_time_taken_wrapping / total_wrapped_toys,
    );
    $: average_time_taken_creating = Math.ceil(
        total_time_taken_creating / total_created_toys,
    );

    $: total_wrapped_toys = tasks.reduce((acc, curr) => {
        if (curr.task === "WRAPPED_PRESENT") {
            acc++;
        }
        return acc;
    }, 0);

    $: total_created_toys = tasks.reduce((acc, curr) => {
        if (curr.task === "CREATED_TOY") {
            acc++;
        }
        return acc;
    }, 0);

    $: total_left_toys_to_be_wrapped = tasks.reduce((acc, curr) => {
        if (curr.task === "WRAPPED_PRESENT") {
            acc--;
        }
        return acc;
    }, total_created_toys);

    // $: total_left_toys_to_be_created = tasks.reduce((acc, curr) => {
    //     if (curr.task === "CREATED_TOY") {
    //         acc--;
    //     }
    //     return acc;
    // }, total_wrapped_toys);

    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function nextPage() {
        if (currentPage < Math.ceil(tasks.length / itemsPerPage)) {
            currentPage++;
        }
    }

    function formatDate(dateString) {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleString(undefined, options);
    }
</script>

<div class="present_progress">
    <div>
        <div><h1>Elf Productivity Dashboard</h1></div>
        <div><h2>Stats</h2></div>
        <div class="boxgrid">
            <div class="box">
                <p>fastest wrapper</p>
                {#if fastest_wrapper}
                    <p>{fastest_wrapper[0]}, {fastest_wrapper[1]} M</p>
                {:else}
                    <p>no fastest wrapper</p>
                {/if}
            </div>
            <div class="box">
                <p>fastest creator</p>
                {#if fastest_creator}
                    <p>{fastest_creator[0]}, {fastest_creator[1]} M</p>
                {:else}
                    <p>no fastest creator</p>
                {/if}
            </div>
            <div class="box">
                <p>elf who most wrapped</p>
                {#if mostwrappedelf}
                    <p>{mostwrappedelf}</p>
                {:else}
                    <p>no elf who most wrapped</p>
                {/if}
            </div>
            <div class="box">
                <p>elf who most created toys</p>
                {#if mostcreatedelf}
                    <p>{mostcreatedelf}</p>
                {:else}
                    <p>no elf who most created toys</p>
                {/if}
            </div>
            <div class="box">
                <p>total no of elfs</p>
                {#if total_elfs}
                    <p>{total_elfs}</p>
                {:else}
                    <p>no elfs</p>
                {/if}
            </div>
            <div class="box">
                <p>total elfs for wrapping</p>
                {#if total_elfs_wrapping}
                    <p>{total_elfs_wrapping}</p>
                {:else}
                    <p>no elfs for wrapping</p>
                {/if}
            </div>
            <div class="box">
                <p>total elfs for creating toys</p>
                {#if total_elfs_creating}
                    <p>{total_elfs_creating}</p>
                {:else}
                    <p>no elfs for creating toys</p>
                {/if}
            </div>
            <div class="box">
                <p>total time taken for wrapping</p>
                {#if total_time_taken_wrapping}
                    <p>{total_time_taken_wrapping} M</p>
                {:else}
                    <p>no time taken for wrapping</p>
                {/if}
            </div>
            <div class="box">
                <p>total time taken for creating toys</p>
                {#if total_time_taken_creating}
                    <p>{total_time_taken_creating} M</p>
                {:else}
                    <p>no time taken for creating toys</p>
                {/if}
            </div>
            <div class="box">
                <p>Average time taken for wrapping</p>
                {#if average_time_taken_wrapping}
                    <p>{average_time_taken_wrapping} M</p>
                {:else}
                    <p>no average time taken for wrapping</p>
                {/if}
            </div>
            <div class="box">
                <p>Average time taken for creating toys</p>
                {#if average_time_taken_creating}
                    <p>{average_time_taken_creating} M</p>
                {:else}
                    <p>no average time taken for creating toys</p>
                {/if}
            </div>
            <div class="box">
                <p>total wrapped toys</p>
                {#if total_wrapped_toys}
                    <p>{total_wrapped_toys}</p>
                {:else}
                    <p>no total wrapped toys</p>
                {/if}
            </div>
            <div class="box">
                <p>total created toys</p>
                {#if total_created_toys}
                    <p>{total_created_toys}</p>
                {:else}
                    <p>no total created toys</p>
                {/if}
            </div>
            <div class="box">
                <p>total left toys to be wrapped</p>
                {#if total_left_toys_to_be_wrapped}
                    <p>{total_left_toys_to_be_wrapped}</p>
                {:else}
                    <p>no total left toys to be wrapped</p>
                {/if}
            </div>
            <!-- <div class="box">
                <p>total left toys to be created</p>
                {#if total_left_toys_to_be_created}
                {:else}
                    <p>no total left toys to be created</p>
                {/if}
            </div> -->
        </div>
        <div><h2>Events</h2></div>
        <div class="child-wrapper">
            {#each tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as task, i (task)}
                {@const index = i + 1 + (currentPage - 1) * itemsPerPage - 1}
                <div class="box2">
                    <p>{formatDate(task["date"])}</p>
                    <p>
                        {`${task["elf"]} took ${task["minutesTaken"]} minutes to ${task["task"]}.`}
                    </p>
                </div>
            {/each}
        </div>
        <div class=" control details">
            <button on:click={previousPage}>Newer</button>
            <p>{currentPage}</p>
            <button on:click={nextPage}>Older</button>
        </div>
    </div>

    <!-- performance-->
    <div></div>
</div>

<style>
    @import "$lib/assets/day3.css";
    .present_progress {
        /* width:100%; */
        height:100vh;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .child {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .boxgrid {
        display: grid;
        grid-gap: 1rem;
        margin: 1rem;
        grid-template-columns: repeat(4, 1fr);
    }
    .box {
        display: grid;
        grid-template-rows: repeat(2, 1fr);
        justify-content: center;
        align-items: center;
    }
    .boxgrid > div {
        border: 1px solid var(--stroke);
    }
    .boxgrid > div > p {
        font-size: 0.8rem;
        padding: 0.2rem;
        margin: 0.2rem;
        text-align: center;
    }
    .boxgrid > div > p:nth-child(2) {
        /* border: 2px solid var(--green); */
        font-size: 1rem;
        font-weight: bold;
        color: #b5acac;
        text-align: center;
    }
    .child:nth-child(1) {
        border-top: 1px solid var(--stroke);
    }
    .child {
        border-left: 1px solid var(--stroke);
    }
    h2,
    .child-wrapper {
        margin-left: 1rem;
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        font-size: var(--h5);
    }

    .child-wrapper > div {
        border: 1px solid var(--stroke);
        grid-template-columns: 1fr 1fr;
    }
    .child-wrapper > div > p {
        font-size: 0.8rem;
        padding: 0.3rem;
        margin: 0.2rem;
        text-align: center;
    }
    .child-wrapper > div {
        padding: 0.1rem;
        /* margin: 0.1rem; */
    }
    h1 {
        text-align: center;
        font-size: var(--h5);
        margin: 1rem;
    }
    .child-wrapper{
        width: inherit;
    }
</style>
