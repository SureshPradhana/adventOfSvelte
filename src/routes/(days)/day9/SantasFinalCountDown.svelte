<script lang="ts">
    import { onMount } from "svelte";
    let days: Number = 0;
    let hours: Number = 0;
    let minutes: Number = 0;
    let seconds: Number = 0;
    let theme = '';
    const toggleTheme = (newTheme) => {
        theme = theme === newTheme ? theme : newTheme;
    };
    onMount(() => {
        setInterval(() => {
            let now = new Date();
            // if christmas goes by it shuould countdown to next year christmas
            let christmas = new Date(now.getFullYear(), 11, 25);
            if (now.getMonth() == 11 && now.getDate() > 25) {
                christmas.setFullYear(christmas.getFullYear() + 1);
            }
            let diff = christmas.getTime() - now.getTime();
            days = Math.floor(diff / (1000 * 60 * 60 * 24));
            hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((diff % (1000 * 60)) / 1000);
        }, 1000);
    });
    let show=false;
    function showthemes() {
        show = !show;
    }
</script>

<div class="countdown">
    <div class="theme">
        <button class="theme-button" on:click={() => showthemes()}>🎄</button>
        <div  class="theme-list-show {show ? 'show':''}">
            <div class="theme-list">
                <button
                    class="theme-button theme-dark"
                    on:click={() => toggleTheme("theme-dark")}>monospace</button
                >
                <button
                    class="theme-button theme-light"
                    on:click={() => toggleTheme("theme-light")}>Digital</button
                >
                <button
                    class="theme-button theme-snow"
                    on:click={() => toggleTheme("theme-snow")}>Crotah</button
                >
            </div>
        </div>
    </div>
    <div class="countdown-box {theme}">
        <div class="days">
            {days}
        </div>
        <div class="hours">
            {hours}
        </div>
        <div class="minutes">
            {minutes}
        </div>
        <div class="seconds">
            {seconds}
        </div>
    </div>
</div>

<style>
    @font-face {
    font-family: 'Digital-7';
    src: url('./Digital7Italic-BW658.ttf');;
}
@font-face {
    font-family: 'Crotah';
    src: url('CrotahFreeVersionItalic-z8Ev3.ttf');
}

    .countdown {
        display: grid;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .countdown-box {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        font-family: 'Digital-7', monospace;
    }
    .countdown-box > div {
        display: grid;
        position: relative;
        
        font-size: 3rem;
        font-weight: bold;
        color: #b5acac;
        text-align: center;
        /* margin: 0.5rem; */
        padding: 0.8rem;
        text-align: right;
    }
    .countdown-box > div::before {
        content: "D";
        font-size: 0.7rem;
        position: absolute;
        top: 0;
        right: 1rem;
    }
    .countdown-box > div:nth-child(2)::before {
        content: "H";
    }
    .countdown-box > div:nth-child(3)::before {
        content: "M";
    }
    .countdown-box > div:nth-child(4)::before {
        content: "S";
    }
    @media (max-width: 768px) {
        .countdown-box > div {
            font-size: 2rem;
        }
    }
    .theme {
        background-color: transparent;
    
        position: absolute;
        top: 0;
        right: 0;
        z-index: 100;
    }
  
    .theme-list-show {
        display: none;
        background-color: transparent;

    }
    .theme-list{
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        justify-items: end;
        background-color: transparent;
    }
    .theme-list-show button{
        background-color: transparent;
    }
   .show {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        position: absolute;
    
        right: 0;
        z-index: 100;
    }
    .theme-button {
        font-size: 1rem;
        padding: 0.5rem;
        font-weight: lighter;
        border: none;
        background: transparent;
        cursor: pointer;
        color: #ffffff;
    }
    .theme-button:hover {
        background: var(--stroke);
    }
    .theme-dark {
        font-family:  monospace;
    }
    .theme-light {
        font-family: 'Digital-7', monospace;
    }
    .theme-snow {
        
        font-family: 'Crotah', monospace;
    }
</style>
