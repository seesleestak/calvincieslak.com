<script>
  import { onMount } from "svelte";
  import videojs from "video.js";

  let { source, poster } = $props();
  let videoElement;

  onMount(() => {
    const player = videojs(videoElement, {
      controls: true,
      preload: "none",
      sources: [{ src: source, type: "video/mp4" }],
      ...(poster && { poster }),
    });

    return () => player.dispose();
  });
</script>

<div class="video-container">
  <video bind:this={videoElement} class="video-js vjs-default-skin vjs-fill" playsinline></video>
</div>
