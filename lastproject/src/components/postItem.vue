<template>
  <div class="post-container">
    <div class="post-item">
      <div class="post-top">
        <span>작성자 닉네임 {{ postData.writingTime }}</span>
        <i class="bi bi-plus-square"></i>
      </div>
      <hr />
      <img class="post-image" :src="postData.contentImage" alt="" />
      <hr />
      <div class="post-main">
        <div class="post-button-container">
          <div class="post-button-left">
            <i
              ref="like_button"
              class="bi bi-emoji-kiss"
              @click="likeButton($event)"
            ></i>
            <i class="bi bi-chat" @click="modalOnOff"></i>
            <i
              ref="friend_button"
              class="bi bi-person-plus"
              @click="addToFriend($event)"
            ></i>
          </div>
          <div class="post-button-right">
            <i
              ref="bookmarks_button"
              class="bi bi-bookmarks"
              @click="addBookmark($event)"
            ></i>
          </div>
        </div>
        <hr />
        <div class="post-content">
          <span class="post-title">타이틀 : {{ postData.contentText[0] }}</span>
          <span> : </span>
          <div class="post-text">{{ postData.contentText }}</div>
        </div>
      </div>
      <hr />
      <div class="post-footer">
        <i class="bi bi-chat-dots"></i>
        <input
          class="comment-text"
          ref="commentText"
          type="text"
          v-model="commentText"
          @keyup.enter="addCommentText()"
          placeholder="Enter를 입력하면 저장됩니다."
        />
      </div>
    </div>
  </div>
  <!-- 모달창 시작 -->
  <div class="post-item-modal-container" v-if="modalStatus">
    <div class="post-item-modal-background" @click="modalOnOff"></div>
    <div class="post-item-modal">
      <div class="post-item-modal-body">
        <div class="source">
          <div class="canvas-container">
            <p class="canvas-title">Canvas:</p>
            <img class="detail-image" :src="postData.contentImage" alt="" />
          </div>
          <div class="button-container">
            <p>Details :</p>
            <div>
              {{ postData.contentText[0] }}
            </div>
            <div>
              {{ postData.contentLongText }}
            </div>
            <div>{{ postData.writingTime }}</div>
            <span>{{ postData.ratingScore }}점</span>
            <span>추천 : {{ postData.likeIdList.length }}</span>
            <!-- <button @click="imgModify(postData)">수정하기</button>
          <button @click="imgDelete(postData)">삭제하기</button> -->
            <button @click="modalOnOff">모달창 닫기</button>
            <!-- 댓글 -->
            <div class="comment-box">
              <div v-for="(comment, i) in postData.commentList" :key="i">
                <span class="comment-name">{{ comment.user_nickname }} : </span>
                <span class="comment-text">{{ comment.commentText }}</span>
                <br />
                <span class="comment-time">{{ comment.commentTime }}</span>
                <button @click="delComment(comment)">삭제</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 모달창 끝 -->
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "postItem",
  props: {
    postData: Object,
    loginData: Object,
  },
  mounted() {
    if (this.postData.likeIdList) {
      for (let i = 0; i < this.postData.likeIdList.length; i++) {
        if (this.loginData.user_id === this.postData.likeIdList[i]) {
          this.$refs.like_button.style.color = "red";
        }
      }
    }
    if (this.loginData.friends_list) {
      for (let i = 0; i < this.loginData.friends_list.length; i++) {
        if (this.postData.userId === this.loginData.friends_list[i]) {
          this.$refs.friend_button.className = "bi bi-person-plus-fill";
        }
      }
    }
    if (this.loginData.bookmark_list) {
      for (let i = 0; i < this.loginData.bookmark_list.length; i++) {
        if (this.postData._id === this.loginData.bookmark_list[i]) {
          this.$refs.bookmarks_button.className = "bi bi-bookmarks-fill";
        }
      }
    }
  },
  data() {
    return {
      modalStatus: false,
      commentText: "",
    };
  },
  methods: {
    // 좋아요 버튼
    likeButton(event) {
      const data = {
        _id: this.postData._id, // 게시물 id
        userId: this.loginData.user_id, // 좋아요 버튼 누르는 사람의 id
      };
      if (event.target.style.color == "red") {
        event.target.style.color = "black"; // 빨 -> 검
        axios.post("/delToLikeList", data).then((res) => {
          console.log(res.data);
        });
      } else {
        event.target.style.color = "red"; // 검 -> 빨
        axios.post("/addToLikeList", data).then((res) => {
          console.log(res.data);
        });
      }
    },
    // 친구추가 버튼
    addToFriend(event) {
      const data = {
        memoId: this.postData.userId, // 게시물 userId
        hostId: this.loginData.user_id, // 친구추가 버튼 누르는 사람의 id
      };
      if (event.target.className == "bi bi-person-plus") {
        event.target.className = "bi bi-person-plus-fill";
        axios.post("/addToFriendsList", data).then((res) => {
          console.log(res.data);
        });
      } else {
        event.target.className = "bi bi-person-plus";
        axios.post("/delToFriendsList", data).then((res) => {
          console.log(res.data);
        });
      }
    },
    // 북마크 버튼
    addBookmark(event) {
      const data = {
        memoId: this.postData._id, // 게시물 _id
        hostId: this.loginData.user_id, // 친구추가 버튼 누르는 사람의 id
      };
      if (event.target.className == "bi bi-bookmarks") {
        event.target.className = "bi bi-bookmarks-fill";
        axios.post("/addToBookmarkList", data).then((res) => {
          console.log(res.data);
        });
      } else {
        event.target.className = "bi bi-bookmarks";
        axios.post("/delToBookmarkList", data).then((res) => {
          console.log(res.data);
        });
      }
    },
    // 모달창
    modalOnOff() {
      this.modalStatus = !this.modalStatus;
      const body = document.getElementsByTagName("body")[0];
      if (body.classList.contains("scroll-lock")) {
        body.classList.remove("scroll-lock");
      } else {
        body.classList.add("scroll-lock");
      }
    },
    // 댓글 달기
    addCommentText() {
      const data = {
        _id: this.postData._id,
        user_nickname: this.loginData.user_nickname,
        commentText: this.commentText,
        commentTime: new Date(),
      };
      axios.post("/addCommentText", data).then((res) => {
        console.log(res.data);
        // 새로고침
        window.location.reload();
      });
    },
    delComment(comment) {
      const data = {
        _id: this.postData._id,
        user_nickname: comment.user_nickname,
        commentText: comment.commentText,
        commentTime: comment.commentTime,
      };
      axios.post("/delCommentText", data).then((res) => {
        console.log(res.data);
        // 새로고침
        window.location.reload();
      });
    },
  },
};
</script>

<style>
.scroll-lock {
  overflow: hidden;
}
.post-container {
  display: flex;
  justify-content: center;
}
.post-item {
  width: 510px;
  height: 600px;
  background-color: rgb(255, 255, 255);
  margin: 10px;
}
.post-top {
  display: flex;
  margin: 5px;
  justify-content: space-between;
  align-items: center;
}
.bi-plus-square {
  font-size: 1.8rem;
  margin-top: 5px;
}
.post-image {
  width: 510px;
  height: 340px;
}
.post-button-container {
  display: flex;
  justify-content: space-between;
}
.bi-emoji-kiss {
  font-size: 1.8rem;
  margin: 3px;
}
.bi-chat {
  font-size: 1.8rem;
  margin: 3px;
}
.bi-person-plus {
  font-size: 1.8rem;
  margin: 3px;
}
.bi-person-plus-fill {
  font-size: 1.8rem;
  margin: 3px;
}
.bi-bookmarks {
  font-size: 1.8rem;
  margin: 3px;
}
.bi-bookmarks-fill {
  font-size: 1.8rem;
  margin: 3px;
}
.post-content {
  display: flex;
}
.post-footer {
  display: flex;
}
.bi-chat-dots {
  font-size: 1.8rem;
  margin: 3px;
}
.post-item-modal-container {
  position: absolute;
}
.post-item-modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.post-item-modal-body {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 1000px;
  height: 500px;
  text-align: start;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
}
@media screen and (max-width: 500px) {
  .post-container {
    margin-bottom: 10px;
  }
  .post-item-modal-body {
    width: 360px;
    height: 680px;
    bottom: 0px;
  }
  .post-item {
    width: 370px;
  }
  .post-item {
    height: 550px;
  }
  .post-image {
    width: 360px;
    height: 240px;
    margin: auto;
  }
}
</style>
