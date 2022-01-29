$(document).ready(function(){
    $("#jquery_jplayer_1").jPlayer({
      ready: function () {
        $(this).jPlayer("setMedia", {
          title: "Bubble",
          mp3: "audio/sion.mp3",
        });
      },
      cssSelectorAncestor: "#jp_container_1",
      swfPath: "/thirdparty",
      supplied: "mp3",
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true,
      remainingDuration: true,
      toggleDuration: true
    });
  });