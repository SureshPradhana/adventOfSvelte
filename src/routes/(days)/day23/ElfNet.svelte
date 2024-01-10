<script>
    import { onMount } from "svelte";
    import { icons } from "feather-icons";

    let posts = [];

    onMount(async () => {
        const response = await fetch(
            "https://advent.sveltesociety.dev/data/2023/day-twenty-three.json",
        );
        let data = await response.json();
        posts = data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
    });

    function refreshPage() {
        window.location.reload();
    }

    async function fetchPosts() {
        const response = await fetch(
            "https://advent.sveltesociety.dev/data/2023/day-twenty-three.json",
        );
        let data = await response.json();
        posts = data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
    }

    let visibleComments = posts.map(() => 2);

    function showMoreComments(postIndex) {
        visibleComments[postIndex] += 2;
    }

    function formatDate(dateStr) {
        let date = new Date(dateStr);
        let options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return date.toLocaleDateString(undefined, options);
    }
</script>

<div class="elfnet">
    <div class="left">
        <div class="elfheader">
            <div class="elfheader-title">
                <a
                    href="#"
                    on:click|preventDefault={refreshPage}
                    class="home-wrapper"
                >
                    {@html icons.home.toSvg({
                        class: "feather home",
                        width: "18px",
                        height: "18px",
                    })}Home
                </a>
            </div>
            <button on:click={fetchPosts}
                >{@html icons["refresh-ccw"].toSvg({
                    class: "feather refresh",
                    width: "18px",
                    height: "18px",
                })}</button
            >
        </div>
        <div class="elfbody">
            {#each posts as post, postIndex (post.id)}
                <div class="post">
                    <div class="post-header">
                        <div class="author-info">
                            <div>
                                <img
                                    class="author-image"
                                    src="./elf{Math.floor(
                                        Math.random() * 9 + 1,
                                    )}.png"
                                />
                                <p class="author">{post.author}</p>
                            </div>
                            <div class="timestamp">
                                <p>{formatDate(post.timestamp)}</p>
                            </div>
                        </div>
                        <p class="content">{post.content}</p>
                        <div>
                            <button
                                ><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                <svg
                                    fill="#000000"
                                    class="cookie"
                                    width="18px"
                                    height="18px"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    ><path
                                        d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 22.628906 9.371094 28 16 28 C 22.628906 28 28 22.628906 28 16 C 28 15.515625 27.964844 15.039063 27.90625 14.566406 C 27.507813 14.839844 27.023438 15 26.5 15 C 25.421875 15 24.511719 14.3125 24.160156 13.359375 C 23.535156 13.757813 22.796875 14 22 14 C 19.789063 14 18 12.210938 18 10 C 18 9.265625 18.210938 8.585938 18.558594 7.992188 C 18.539063 7.996094 18.519531 8 18.5 8 C 17.117188 8 16 6.882813 16 5.5 C 16 4.941406 16.1875 4.433594 16.496094 4.019531 C 16.332031 4.011719 16.167969 4 16 4 Z M 23.5 4 C 22.671875 4 22 4.671875 22 5.5 C 22 6.328125 22.671875 7 23.5 7 C 24.328125 7 25 6.328125 25 5.5 C 25 4.671875 24.328125 4 23.5 4 Z M 14.050781 6.1875 C 14.25 7.476563 15 8.585938 16.046875 9.273438 C 16.015625 9.511719 16 9.757813 16 10 C 16 13.308594 18.691406 16 22 16 C 22.496094 16 22.992188 15.9375 23.46875 15.8125 C 24.152344 16.4375 25.015625 16.851563 25.953125 16.96875 C 25.464844 22.03125 21.1875 26 16 26 C 10.484375 26 6 21.515625 6 16 C 6 11.152344 9.46875 7.097656 14.050781 6.1875 Z M 22 9 C 21.449219 9 21 9.449219 21 10 C 21 10.550781 21.449219 11 22 11 C 22.550781 11 23 10.550781 23 10 C 23 9.449219 22.550781 9 22 9 Z M 14 10 C 13.449219 10 13 10.449219 13 11 C 13 11.550781 13.449219 12 14 12 C 14.550781 12 15 11.550781 15 11 C 15 10.449219 14.550781 10 14 10 Z M 27 10 C 26.449219 10 26 10.449219 26 11 C 26 11.550781 26.449219 12 27 12 C 27.550781 12 28 11.550781 28 11 C 28 10.449219 27.550781 10 27 10 Z M 11 13 C 9.894531 13 9 13.894531 9 15 C 9 16.105469 9.894531 17 11 17 C 12.105469 17 13 16.105469 13 15 C 13 13.894531 12.105469 13 11 13 Z M 16 15 C 15.449219 15 15 15.449219 15 16 C 15 16.550781 15.449219 17 16 17 C 16.550781 17 17 16.550781 17 16 C 17 15.449219 16.550781 15 16 15 Z M 12.5 19 C 11.671875 19 11 19.671875 11 20.5 C 11 21.328125 11.671875 22 12.5 22 C 13.328125 22 14 21.328125 14 20.5 C 14 19.671875 13.328125 19 12.5 19 Z M 19.5 20 C 18.671875 20 18 20.671875 18 21.5 C 18 22.328125 18.671875 23 19.5 23 C 20.328125 23 21 22.328125 21 21.5 C 21 20.671875 20.328125 20 19.5 20 Z"
                                    /></svg
                                >
                                {post.likes}</button
                            >
                            <button>
                                {@html icons["message-square"].toSvg({
                                    class: "feather message-square",
                                    width: "18px",
                                    height: "18px",
                                })}{post.comments.length}</button
                            >
                        </div>
                    </div>
                    {#if post.comments.length > 0}
                        <div class="comments">
                            {#each post.comments.slice(0, visibleComments[postIndex]) as comment (comment.id)}
                                <div class="comment-header">
                                    <div class="comment">
                                        <div>
                                            <img
                                                class="author-image"
                                                src="./elf{Math.floor(
                                                    Math.random() * 9 + 1,
                                                )}.png"
                                            />
                                            <p class="author">
                                                {comment.author}
                                            </p>
                                        </div>
                                        <div class="timestamp">
                                            <p>
                                                {formatDate(comment.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                    <p class="content">{comment.content}</p>
                                    <div>
                                        <button
                                            ><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                            <svg
                                                fill="#000000"
                                                class="cookie"
                                                width="18px"
                                                height="18px"
                                                viewBox="0 0 32 32"
                                                xmlns="http://www.w3.org/2000/svg"
                                                ><path
                                                    d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 22.628906 9.371094 28 16 28 C 22.628906 28 28 22.628906 28 16 C 28 15.515625 27.964844 15.039063 27.90625 14.566406 C 27.507813 14.839844 27.023438 15 26.5 15 C 25.421875 15 24.511719 14.3125 24.160156 13.359375 C 23.535156 13.757813 22.796875 14 22 14 C 19.789063 14 18 12.210938 18 10 C 18 9.265625 18.210938 8.585938 18.558594 7.992188 C 18.539063 7.996094 18.519531 8 18.5 8 C 17.117188 8 16 6.882813 16 5.5 C 16 4.941406 16.1875 4.433594 16.496094 4.019531 C 16.332031 4.011719 16.167969 4 16 4 Z M 23.5 4 C 22.671875 4 22 4.671875 22 5.5 C 22 6.328125 22.671875 7 23.5 7 C 24.328125 7 25 6.328125 25 5.5 C 25 4.671875 24.328125 4 23.5 4 Z M 14.050781 6.1875 C 14.25 7.476563 15 8.585938 16.046875 9.273438 C 16.015625 9.511719 16 9.757813 16 10 C 16 13.308594 18.691406 16 22 16 C 22.496094 16 22.992188 15.9375 23.46875 15.8125 C 24.152344 16.4375 25.015625 16.851563 25.953125 16.96875 C 25.464844 22.03125 21.1875 26 16 26 C 10.484375 26 6 21.515625 6 16 C 6 11.152344 9.46875 7.097656 14.050781 6.1875 Z M 22 9 C 21.449219 9 21 9.449219 21 10 C 21 10.550781 21.449219 11 22 11 C 22.550781 11 23 10.550781 23 10 C 23 9.449219 22.550781 9 22 9 Z M 14 10 C 13.449219 10 13 10.449219 13 11 C 13 11.550781 13.449219 12 14 12 C 14.550781 12 15 11.550781 15 11 C 15 10.449219 14.550781 10 14 10 Z M 27 10 C 26.449219 10 26 10.449219 26 11 C 26 11.550781 26.449219 12 27 12 C 27.550781 12 28 11.550781 28 11 C 28 10.449219 27.550781 10 27 10 Z M 11 13 C 9.894531 13 9 13.894531 9 15 C 9 16.105469 9.894531 17 11 17 C 12.105469 17 13 16.105469 13 15 C 13 13.894531 12.105469 13 11 13 Z M 16 15 C 15.449219 15 15 15.449219 15 16 C 15 16.550781 15.449219 17 16 17 C 16.550781 17 17 16.550781 17 16 C 17 15.449219 16.550781 15 16 15 Z M 12.5 19 C 11.671875 19 11 19.671875 11 20.5 C 11 21.328125 11.671875 22 12.5 22 C 13.328125 22 14 21.328125 14 20.5 C 14 19.671875 13.328125 19 12.5 19 Z M 19.5 20 C 18.671875 20 18 20.671875 18 21.5 C 18 22.328125 18.671875 23 19.5 23 C 20.328125 23 21 22.328125 21 21.5 C 21 20.671875 20.328125 20 19.5 20 Z"
                                                /></svg
                                            >
                                            {comment.likes}</button
                                        >
                                        
                                    </div>
                                </div>
                            {/each}
                            {#if post.comments.length > visibleComments[postIndex]}
                                <button
                                    on:click={() => showMoreComments(postIndex)}
                                    >Show more</button
                                >
                            {/if}
                        </div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    
</div>

<style>
    * {
        background-color: transparent;
        color: var(--black);
    }
    html,
    body {
        height: 100%;
        overflow: hidden;
    }

    .elfnet {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        color: white;
    }
    .elfnet * {
        color: white;
    }
    .elfheader {
        height: 40px;
        background-color: var(--stroke);
    }
    .elfbody {
        height: 100vh;
        overflow-y: auto;
    }
    .home-wrapper {
        display: flex;
        align-items: center;
        color: white;
        text-decoration: none;
    }
    .home-wrapper:hover {
        color: #d57235;
    }
    :global(.home, .refresh) {
        background-color: transparent;
    }
    :global(.refresh) {
        margin-right: 0.5rem;
        color: white;
        text-decoration: none;
    }
    :global(.home:hover, .refresh:hover) {
        color: #d57235;
    }
    .elfheader {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .elfheader-title {
        display: flex;
        margin-left: 0.8rem;
        color: white;
        line-height: 1.5;
        cursor: pointer;
    }
    :global(.elfheader-title > a > svg) {
        margin-right: 0.5rem;
    }
    :global(.elfheader-title > a) {
        color: white;
        text-decoration: none;
    }
    .right {
        display: flex;
        flex-direction: column;
        justify-content: start;
    }
    .right > div {
        height: 50px;
        background-color: #d31010;
        border: 1px solid var(--stroke);
    }
    button {
        cursor: pointer;
    }
    .author-info {
        display: flex;
        align-items: center;
    }

    .author-image {
        width: 30px;
        height: 30px;
        margin-right: 10px;
    }
    .post {
        /* border: 1px solid var(--stroke); */
        margin: 5px;
        padding: 5px;
    }
    .comments {
        border: 1px solid var(--stroke);
        padding: 10px;
        margin-left: 20px;
    }
    :global(.cookie) {
        width: 18px;
        height: 18px;
        margin-right: 5px;
    }
    :global(.message-square) {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        background-color: transparent;
    }
    :global(.message-square:hover) {
        color: #d57235;
    }
    .post-header {
        border: 1px solid var(--stroke);
        margin: 0.4rem;
        padding: 0.4rem;
        display: flex;
        flex-direction: column;
        background-color: var(--stroke);
    }
    .comments {
        background-color: #3e3e3ec3;
    }

    .author-info,
    .comment {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
    }
    .author-info > div,
    .comment > div {
        display: flex;
        align-items: center;
    }
    .author-info > .timestamp,
    .comment > .timestamp {
        font-size: 0.6rem;
        color: var(--stroke);
        justify-content: end;
    }
    h4 {
        font-weight: 400;
    }
    .content {
        font-size: 0.8rem;
    }
    .cookie {
        fill: white;
    }
    .cookie:hover {
        fill: #d57235;
    }
    .author {
        font-size: 0.8rem;
    }
    .comment-header {
        border-bottom: 1px solid var(--stroke);
    }
</style>
