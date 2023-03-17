<template>
  <div v-if="commentStatus">
    <span class="comment-name">{{ commentData.user_nickname }} : </span>
    <span class="comment-text">{{ commentData.commentText }}</span>
    <br />
    <span class="comment-time">{{ commentData.commentTime }}</span>
    <button
      @click="delComment(postObjectId, commentData)"
      v-if="delCommentStatus"
    >
      삭제
    </button>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";

export default {
  name: "postComment",
  props: {
    commentData: Object,
    postObjectId: String,
    loginNickname: String,
  },
  data() {
    return {
      commentStatus: true,
      delCommentStatus: false,
    };
  },
  mounted() {
    if (this.loginNickname === this.commentData.user_nickname) {
      this.delCommentStatus = true;
    }
  },
  methods: {
    delComment(_id, comment) {
      const data = {
        _id: _id,
        user_nickname: comment.user_nickname,
        commentText: comment.commentText,
        commentTime: comment.commentTime,
      };
      axios.post("/delCommentText", data).then((res) => {
        console.log(res.data);
        this.commentStatus = false;
        // 새로고침
        // window.location.reload();
      });
    },
  },
};
</script>

<style></style>
