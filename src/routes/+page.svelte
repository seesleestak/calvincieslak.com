<script>
  import VideoFeed from "../lib/VideoFeed.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>Calvin Cieslak</title>
</svelte:head>

<VideoFeed page={data.page} />
