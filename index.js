(function init() {
  const videoArr = [
    {
      source: "https://media.calvincieslak.com/video/20260911.mov",
      thumbnail: "https://media.calvincieslak.com/image/20260911.jpg",
      date: "2026-09-27",
    },
    {
      source:
        "https://media.calvincieslak.com/video/the_man_with_the_harmonica.mov",
      thumbnail:
        "https://media.calvincieslak.com/image/the_man_with_the_harmonica.jpg",
      title: "The Man With The Harmonica (Cover)",
      date: "2026-09-22",
    },
    {
      source: "https://media.calvincieslak.com/video/apprehension.mov",
      thumbnail: "https://media.calvincieslak.com/image/apprehension.jpg",
      title: "Apprehension",
      date: "2026-08-31",
      cta: {
        text: "Also on YouTube.",
        url: "https://youtube.com/shorts/g_ppBQ0gDoE",
      },
    },
    {
      source: "https://media.calvincieslak.com/video/fell-on-hard-times.mov",
      thumbnail: "https://media.calvincieslak.com/image/fell-on-hard-times.jpg",
      title: "Fell on Hard Times - Neal Casal (Cover)",
      date: "2026-05-25",
    },
    {
      source:
        "https://media.calvincieslak.com/video/2026-03-25-be-a-square.mov",
      thumbnail:
        "https://media.calvincieslak.com/image/2026-03-25-be-a-square.jpg",
      title: "Be A Square",
      date: "2026-03-25",
      cta: {
        text: "Also on YouTube.",
        url: "https://www.youtube.com/shorts/pLqux4JilQQ",
      },
    },
    {
      source: "https://media.calvincieslak.com/video/budos-groove.mov",
      thumbnail: "https://media.calvincieslak.com/image/budos-groove.jpg",
      date: "2025-09-23",
    },
    {
      source: "https://media.calvincieslak.com/video/2025-10-08-chiptune.mov",
      thumbnail: "https://media.calvincieslak.com/image/chiptune.jpg",
      date: "2025-10-08",
    },
    {
      source: "https://media.calvincieslak.com/video/father-and-son.mp4",
      thumbnail: "https://media.calvincieslak.com/image/father-and-son.jpg",
      title: "Father And Son - Yusuf/Cat Stevens (Cover)",
      date: "2025-11-05",
      description: "",
      cta: {
        text: "Also on YouTube.",
        url: "https://www.youtube.com/watch?v=GJ05k4dXk1g",
      },
    },
    {
      source: "https://media.calvincieslak.com/video/hopeful.mp4",
      thumbnail: "https://media.calvincieslak.com/image/hopeful.jpg",
      title: "hopeful",
      date: "2025-11-21",
      cta: {
        text: "Also on YouTube.",
        url: "https://www.youtube.com/shorts/os5wey5GIAs",
      },
    },
    {
      source: "https://media.calvincieslak.com/video/waste-it-with-you.mp4",
      thumbnail: "https://media.calvincieslak.com/image/waste-it-with-you.jpg",
      title: "Waste It With You - Tempesst (Cover)",
      date: "2026-01-01",
    },
  ].sort((a, b) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
  });

  const PAGE_SIZE = 6;
  const params = new URL(location).searchParams;
  const page = Number(params.get("page") ?? "1");
  const pageCount = Math.ceil(videoArr.length / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const pageVideoArr = videoArr.slice(start, start + PAGE_SIZE);

  // Pagination button creator
  const createPageButton = ({
    parent,
    text,
    href = "",
    active = false,
    disabled = false,
  }) => {
    const newLi = document.createElement("li");
    newLi.classList.add("page-item");
    if (active) {
      newLi.classList.add("active");
    }
    if (disabled) {
      newLi.classList.add("disabled");
    }

    const newLink = document.createElement("a");
    newLink.classList.add("page-link");
    newLink.textContent = text;
    newLink.setAttribute("href", href);

    newLi.appendChild(newLink);
    parent.appendChild(newLi);
  };

  const paginationComponents = [
    ...document.getElementsByClassName("pagination"),
  ];
  paginationComponents.forEach((c) => {
    createPageButton({
      parent: c,
      text: "Previous",
      href: `?page=${page - 1}`,
      active: false,
      disabled: page === 1,
    });

    Array.from({ length: pageCount }).forEach((_, i) => {
      createPageButton({
        parent: c,
        text: i + 1,
        href: `?page=${i + 1}`,
        active: page === i + 1,
      });
    });

    createPageButton({
      parent: c,
      text: "Next",
      href: `?page=${page + 1}`,
      active: false,
      disabled: page === pageCount,
    });
  });

  // Populate video cards
  const postContainer = document.getElementById("post-container");
  pageVideoArr.forEach((v) => {
    const newColumnWrapper = document.createElement("div");
    newColumnWrapper.classList.add("col-12");
    newColumnWrapper.classList.add("col-xl-4");
    newColumnWrapper.classList.add("col-lg-6");

    const newWrapper = document.createElement("div");
    newWrapper.classList.add("dimension-container");

    if (v.source) {
      const newVideoContainer = document.createElement("div");
      newVideoContainer.classList.add("video-container");

      const newVideoEl = document.createElement("video");
      newVideoEl.className = "video-js vjs-default-skin vjs-fill";

      // Append to DOM BEFORE initializing Video.js
      newVideoContainer.appendChild(newVideoEl);
      newWrapper.appendChild(newVideoContainer);

      // Let Video.js handle everything after the element is in the DOM
      const player = videojs(newVideoEl, {
        controls: true,
        preload: "none",
        sources: [{ src: v.source, type: "video/mp4" }],
        ...(v.thumbnail && { poster: v.thumbnail }),
      });
    }

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.classList.add("card-custom");

    if (v.title || v.description || v.date || (v.cta?.url && v.cta?.text)) {
      const newCardBody = document.createElement("div");
      newCardBody.classList.add("card-body");

      if (v.title) {
        const newCardTitle = document.createElement("h5");
        newCardTitle.classList.add("card-title");
        newCardTitle.textContent = v.title;
        newCardBody.appendChild(newCardTitle);
      }

      if (v.description) {
        const newCardDescription = document.createElement("p");
        newCardDescription.classList.add("card-text");
        newCardDescription.textContent = v.description;
        newCardBody.appendChild(newCardDescription);
      }

      if (v.cta?.url && v.cta?.text) {
        const newCardCta = document.createElement("p");
        newCardCta.classList.add("card-text");

        const newCardCtaLink = document.createElement("a");
        newCardCtaLink.setAttribute("href", v.cta.url);
        newCardCtaLink.textContent = v.cta.text;

        newCardCta.appendChild(newCardCtaLink);
        newCardBody.appendChild(newCardCta);
      }

      if (v.date) {
        const newCardDate = document.createElement("p");
        newCardDate.classList.add("card-text");
        newCardDate.classList.add("fst-italic");
        newCardDate.classList.add("post-date");
        newCardDate.textContent = v.date;
        newCardBody.appendChild(newCardDate);
      }

      newCard.appendChild(newCardBody);
      newWrapper.appendChild(newCard);
      newColumnWrapper.appendChild(newWrapper);
    }

    postContainer.appendChild(newColumnWrapper);
  });

  // Hero animation
  gsap.registerPlugin(SplitText);
  const split = SplitText.create("#hero-h1", { type: "chars" });

  gsap.to(split.chars, {
    y: 5,
    stagger: { each: 0.2, from: "start", repeat: -1, yoyo: true },
    duration: 0.5,
    ease: "sine.inOut",
  });
})();
