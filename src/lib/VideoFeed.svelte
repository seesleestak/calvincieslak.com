<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { SplitText } from "gsap/SplitText";
  import VideoPlayer from "../VideoPlayer.svelte";
  import { videos } from "../videos.js";

  const pageSize = 6;
  const pageCount = Math.ceil(videos.length / pageSize);
  let { page } = $props();
  const pageVideos = $derived(videos.slice((page - 1) * pageSize, page * pageSize));
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  let heroHeading;

  onMount(() => {
    gsap.registerPlugin(SplitText);
    const split = SplitText.create(heroHeading, { type: "chars" });
    const animation = gsap.to(split.chars, {
      y: 5,
      stagger: { each: 0.2, from: "start", repeat: -1, yoyo: true },
      duration: 0.5,
      ease: "sine.inOut",
    });

    return () => {
      animation.kill();
      split.revert();
    };
  });
</script>

{#snippet pagination()}
  <div class="container py-3">
    <nav class="d-flex flex-column align-items-center" aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" class:disabled={page === 1}>
          <a
            class="page-link"
            href={`/music/${Math.max(page - 1, 1)}/`}
            aria-disabled={page === 1}
            tabindex={page === 1 ? -1 : undefined}>Previous</a
          >
        </li>
        {#each pages as pageNumber}
          <li class="page-item" class:active={page === pageNumber}>
            <a
              class="page-link"
              href={`/music/${pageNumber}/`}
              aria-current={page === pageNumber ? "page" : undefined}>{pageNumber}</a
            >
          </li>
        {/each}
        <li class="page-item" class:disabled={page === pageCount}>
          <a
            class="page-link"
            href={page < pageCount ? `/music/${page + 1}/` : `/music/${page}/`}
            aria-disabled={page === pageCount}
            tabindex={page === pageCount ? -1 : undefined}>Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
{/snippet}

{@render pagination()}

<div class="container py-3">
  <div class="row g-3">
    {#each pageVideos as video (video.source)}
      <div class="col-12 col-lg-6 col-xl-4">
        <div class="dimension-container">
          <VideoPlayer source={video.source} poster={video.thumbnail} />
          <div class="card card-custom">
            {#if video.title || video.description || video.date || (video.cta?.url && video.cta?.text)}
              <div class="card-body">
                {#if video.title}
                  <h5 class="card-title">{video.title}</h5>
                {/if}
                {#if video.description}
                  <p class="card-text">{video.description}</p>
                {/if}
                {#if video.cta?.url && video.cta?.text}
                  <p class="card-text">
                    <a href={video.cta.url}>{video.cta.text}</a>
                  </p>
                {/if}
                {#if video.date}
                  <p class="card-text fst-italic post-date">{video.date}</p>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

{@render pagination()}
