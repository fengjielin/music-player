<template>
  <div class="playlist-items">
    <playlist-item
      v-for="(item, index) in playlists"
      :key="index"
      :playlistItem="item"
      @click.native="playlistDetail(item.id)"
    ></playlist-item>
  </div>
</template>

<script>
import PlaylistItem from "components/playlists/PlaylistItem";

export default {
  components: {
    PlaylistItem,
  },
  props: {
    playlists: {
      type: Array,
    },
  },
  methods: {
    playlistDetail(id) {
      this.$emit("toPlaylistDetail", id);
    },
  },
};
</script>

<style>
.playlist-items {
  display: flex;
  flex-wrap: wrap;
}
</style>