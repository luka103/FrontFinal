window.addEventListener('DOMContentLoaded', (event) => {
    const audioPlayer = document.getElementById('audio-player');
  
    // Autoplay the audio
    audioPlayer.autoplay = true;
  
    // Pause the audio when it ends
    audioPlayer.addEventListener('ended', () => {
      audioPlayer.pause();
    });
  });
  