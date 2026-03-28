---
title: Purusha Suktam
---
# Shiva Pooja
## Purusha Suktam

<div id="player"></div>

<div style="margin-top: 12px;">
  <button onclick="playOnce()">Play Once</button>
  <button onclick="playLoop()">Loop</button>
</div>

<script>
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  document.getElementsByTagName('script')[0].parentNode.insertBefore(tag, document.getElementsByTagName('script')[0]);

  var player;
  var looping = false;
  var START = 1829;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '315',
      width: '560',
      videoId: '0tE7v_dwZR8',
      playerVars: { start: START, end: 2240, autoplay: 0 },
      events: { onStateChange: onStateChange }
    });
  }

  function onStateChange(event) {
    if (event.data === YT.PlayerState.ENDED && looping) {
      player.seekTo(START, true);
      player.playVideo();
    }
  }

  function playOnce() {
    looping = false;
    player.seekTo(START, true);
    player.playVideo();
  }

  function playLoop() {
    looping = true;
    player.seekTo(START, true);
    player.playVideo();
  }
</script>
