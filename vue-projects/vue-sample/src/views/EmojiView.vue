<template>
  <div>
    <EmojiPicker :native="true" @select="onSelectEmoji" />
    <br>
    <EmojiPicker theme="dark" :native="true" @select="onSelectEmoji" />
  </div>
</template>
<script setup>
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

// event callback
function onSelectEmoji(emoji) {
  console.log(emoji)
  /*
    // result
    {
        i: "😚",
        n: ["kissing face"],
        r: "1f61a", // with skin tone
        t: "neutral", // skin tone
        u: "1f61a" // without tone
    }
    */
}
</script>
