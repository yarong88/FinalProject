<template>
  <div class="postContainer">
    <div class="postItem">
      <div class="postTop">
        <span>작성자 닉네임 {{ postData.writingTime }}</span>
        <i class="bi bi-plus-square"></i>
      </div>
      <hr />
      <img class="postImage" :src="postData.contentImage" alt="" />
      <hr />
      <div class="postMain">
        <div class="postButtonContainer">
          <div class="postButtonLeft">
            <i
              class="bi bi-emoji-kiss"
              @click="[likeButton($event), testMethod()]"
            ></i>
            <i class="bi bi-chat" @click="modalOnOff"></i>
            <i class="bi bi-person-plus" @click="addToFriend($event)"></i>
          </div>
          <div class="postButtonRight">
            <i class="bi bi-bookmarks" @click="addBookmark($event)"></i>
          </div>
        </div>
        <hr />
        <div class="postContent">
          <span class="postTitle">타이틀 : {{ postData.contentText[0] }}</span>
          <span> : </span>
          <div class="postText">{{ postData.contentText }}</div>
        </div>
      </div>
      <hr />
      <div class="postFooter">
        <i class="bi bi-chat-dots"></i>
        <input type="text" />
      </div>
    </div>
  </div>
  <div class="modalContainer" v-if="modalStatus">
    <div class="modal">
      <div class="modal-body">
        <div class="source">
          <div class="canvas-container">
            <p>Canvas:</p>
            <img
              class="detail-image"
              :src="postData.contentImage"
              alt=""
              style="width: 600px; height: 400px"
            />
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
            <span>추천 : {{ postData.recommendPoint }}</span>
            <!-- <button @click="imgModify(postData)">수정하기</button>
          <button @click="imgDelete(postData)">삭제하기</button> -->
            <button @click="modalOnOff">모달창 닫기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "postItem",
  props: {
    postData: Object,
  },
  data() {
    return {
      modalStatus: false,
    };
  },
  methods: {
    testMethod() {
      console.log("test");
    },
    likeButton(event) {
      if (event.target.style.color == "black") {
        event.target.style.color = "red";
      } else {
        event.target.style.color = "black";
      }
    },
    addToFriend(event) {
      if (event.target.className == "bi bi-person-plus") {
        event.target.className = "bi bi-person-plus-fill";
      } else {
        event.target.className = "bi bi-person-plus";
      }
    },
    addBookmark(event) {
      if (event.target.className == "bi bi-bookmarks") {
        event.target.className = "bi bi-bookmarks-fill";
      } else {
        event.target.className = "bi bi-bookmarks";
      }
    },
    modalOnOff() {
      this.modalStatus = !this.modalStatus;
      const body = document.getElementsByTagName("body")[0];
      if (body.classList.contains("scrollLock")) {
        body.classList.remove("scrollLock");
      } else {
        body.classList.add("scrollLock");
      }
    },
  },
};
</script>

<style>
.scrollLock {
  overflow: hidden;
}
.postContainer {
  display: flex;
  justify-content: center;
}
.postItem {
  width: 510px;
  height: 600px;
  background-color: rgb(255, 255, 255);
  margin: 10px;
}
.postTop {
  display: flex;
  margin: 5px;
  justify-content: space-between;
  align-items: center;
}
.bi-plus-square {
  font-size: 1.8rem;
  margin-top: 5px;
}
.postImage {
  width: 510px;
  height: 340px;
}
.postButtonContainer {
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
.postContent {
  display: flex;
}
.postFooter {
  display: flex;
}
.bi-chat-dots {
  font-size: 1.8rem;
  margin: 3px;
}
.modalContainer {
  position: absolute;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-body {
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
</style>
