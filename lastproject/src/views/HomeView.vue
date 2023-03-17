<template>
  <div class="wrap-memo">
    <div class="memo-title">
      <!-- 사이드 바 출력 버튼 -->
      <button
        class="sidebar-onoff"
        v-if="sidebarButtonStatus"
        @click="sidebarOnOff"
      >
        사이드 바
      </button>
    </div>
    <div class="memo-container">
      <!-- 메모장 시작 -->
      <div class="canvas-content" v-if="!mainStatus">
        <div class="source">
          <!-- 캔버스 시작 -->
          <div class="canvas-container">
            <p class="canvas-title">Canvas:</p>
            <!-- 캔버스 컴포넌트 시작 -->
            <vue-drawing-canvas
              ref="VueCanvasDrawing"
              v-model:image="image"
              :width="canvasWidth"
              :height="canvasHeight"
              :stroke-type="strokeType"
              :line-cap="lineCap"
              :line-join="lineJoin"
              :fill-shape="fillShape"
              :eraser="eraser"
              :lineWidth="line"
              :color="color"
              :background-color="backgroundColor"
              :background-image="backgroundImage"
              :watermark="watermark"
              :initial-image="initialImage"
              saveAs="png"
              :styles="{
                border: 'solid 1px #000',
              }"
              :lock="disabled"
              @mousemove="getCoordinate($event)"
              :additional-images="additionalImages"
              @click="offsetClick"
              @touchend="clickRedraw"
            />
          </div>
          <!-- 캔버스 컴포넌트 끝 -->
          <!-- 캔버스 툴 시작 -->
          <div class="button-container">
            <p class="tool-title">Tools :</p>
            <div class="mobile-button-container">
              <!-- 선 버튼 시작 -->
              <div class="stroke-button-container">
                <!-- 취소 버튼 -->
                <button
                  class="stroke-do-button"
                  type="button"
                  @click="clickRedraw"
                  @click.prevent="$refs.VueCanvasDrawing.undo()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="stroke-button-icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                    />
                    <path
                      d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
                    />
                  </svg>
                </button>
                <!-- 취소취소 버튼 -->
                <button
                  class="stroke-do-button"
                  type="button"
                  @click="clickRedraw"
                  @click.prevent="$refs.VueCanvasDrawing.redo()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="stroke-button-icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                    />
                    <path
                      d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
                    />
                  </svg>
                </button>
                <!-- 리셋 버튼 -->
                <button
                  class="stroke-do-button"
                  type="button"
                  @click.prevent="$refs.VueCanvasDrawing.reset()"
                  @click="allClear"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="stroke-button-icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                    />
                  </svg>
                </button>
              </div>
              <!-- 선 or 지우개 -->
              <div class="stroke-style-button-container">
                <button
                  class="stroke-change-button"
                  type="button"
                  @click.prevent="eraser = !eraser"
                >
                  <span v-if="eraser">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="stroke-button-icon"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
                      />
                    </svg>
                  </span>
                  <span v-else
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="stroke-button-icon"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
                      />
                    </svg>
                  </span>
                </button>
                <select class="storke-select" v-model="line">
                  <option v-for="n in 25" :key="'option-' + n" :value="n">
                    {{ n }}
                  </option>
                </select>
                <input class="color-select" type="color" v-model="color" />
                <select class="storke-select" v-model="strokeType">
                  <option value="dash">그리기</option>
                  <option value="line">직선</option>
                  <option value="circle">원</option>
                  <option value="square">사각형</option>
                  <option value="triangle">삼각형</option>
                </select>
                <button
                  class="stroke-change-button"
                  type="button"
                  @click.prevent="fillShape = !fillShape"
                >
                  <span v-if="fillShape">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="stroke-button-icon"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6ZM6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13Z"
                      />
                    </svg>
                  </span>
                  <span v-else>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="stroke-button-icon"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <!-- 선 버튼 끝 -->
            </div>
            <div class="mobile-button-container">
              <div class="background-container">
                <div>
                  <p
                    class="backgroundcolor-text"
                    style="margin-bottom: 0px; margin-top: 0px"
                  >
                    배경색
                  </p>
                  <input type="color" v-model="backgroundColor" />
                </div>
                <div>
                  <p
                    class="backgroundimg-text"
                    style="margin-bottom: 0px; margin-top: 0px"
                  >
                    이미지 업로드:
                  </p>
                  <input
                    class="setImage-button"
                    type="file"
                    @change="setImage($event)"
                  />
                </div>
              </div>
              <!-- 별점 및 이미지 저장 -->
              <div class="star-tool">
                <form name="myform" id="myform" method="post" action="./save">
                  <fieldset>
                    <input
                      type="radio"
                      name="rating"
                      value="5"
                      id="rate1"
                      v-model="rate"
                    /><label for="rate1">⭐</label>
                    <input
                      type="radio"
                      name="rating"
                      value="4"
                      id="rate2"
                      v-model="rate"
                    /><label for="rate2">⭐</label>
                    <input
                      type="radio"
                      name="rating"
                      value="3"
                      id="rate3"
                      v-model="rate"
                    /><label for="rate3">⭐</label>
                    <input
                      type="radio"
                      name="rating"
                      value="2"
                      id="rate4"
                      v-model="rate"
                    /><label for="rate4">⭐</label>
                    <input
                      type="radio"
                      name="rating"
                      value="1"
                      id="rate5"
                      v-model="rate"
                    /><label for="rate5">⭐</label>
                    {{ rate }}
                  </fieldset>
                </form>
                <!-- 이미지 저장 -->
                <button class="save-tool" @click="imgSave">
                  <img class="save-img" src="../assets/save.png" alt="" />save
                </button>
              </div>
              <!-- 별점 끝 -->
            </div>
            <div class="input-text-container">
              <p class="input-text-text">
                현재 글쓰기 시작점은 {{ cx }},{{ cy }}입니다.
                <br />
                x-axis:
                <strong>{{ x }}</strong
                >, y-axis: <strong>{{ y }}</strong>
              </p>
              <div class="input-text-inner-container">
                <select v-model="fontSize">
                  <option v-for="n in 25" :key="'option-' + n" :value="n">
                    {{ n }}
                  </option>
                </select>
                <input type="color" v-model="fontColor" />
                <!-- <button @click="deleteText">뒤로가기</button> -->
              </div>
              <input
                class="input-text"
                ref="inputText"
                type="text"
                v-model="text"
                @keyup.enter="fillmessage()"
                autofocus
                placeholder="Enter를 입력하면 출력됩니다."
              />
            </div>
          </div>
          <!-- 캔버스 툴 끝 -->
        </div>
      </div>
      <!-- 메모장 끝 -->
      <!-- 메모장 확인 창 시작 -->
      <div class="detail-content" v-if="mainStatus">
        <div class="source">
          <div class="canvas-container">
            <p>Canvas:</p>
            <img class="detail-image" :src="detailBox.contentImage" alt="" />
          </div>
          <div class="button-container">
            <p>Details :</p>
            <div>
              {{ detailBox.contentText[0] }}
            </div>
            <div>
              {{ detailBox.contentText }}
            </div>
            <div>{{ detailBox.writingTime }}</div>
            <span>{{ detailBox.ratingScore }}점</span>
            <span>추천 : {{ detailBox.likeIdList.length }}</span>
            <button @click="imgModify(detailBox)">수정하기</button>
            <button @click="imgDelete(detailBox)">삭제하기</button>
          </div>
        </div>
      </div>
      <!-- 메모장 확인 창 끝 -->
      <!-- 사이드 바 시작 -->
      <div class="sidebar" v-if="sidebarStatus">
        <div class="sidebar-inner-container">
          <div
            class="thumbnail"
            @click="mainOnOff(data)"
            v-for="data of sideDataBox"
            v-bind:key="data"
          >
            <div class="thumbnail-title">
              {{ data.contentText[0] }}
            </div>
            <img class="thumbnail-image" :src="data.contentImage" alt="" />
            <div style="font-size: small">{{ data.writingTime }}</div>
          </div>
        </div>
      </div>
      <!-- 사이드 바 끝 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import VueDrawingCanvas from "vue-drawing-canvas";
export default {
  // 라우터 이동시 경고창
  beforeRouteLeave(to, from, next) {
    if (this.certification) next();
    else if (confirm("변경사항이 저장되지 않을 수 있습니다.")) {
      next();
    }
  },
  components: {
    VueDrawingCanvas,
  },
  data() {
    return {
      mainStatus: false,
      sidebarStatus: false,
      sidebarButtonStatus: false,
      mobileStatus: false,
      rate: "",
      initialImage: [
        {
          type: "dash",
          from: {
            x: 262,
            y: 154,
          },
          coordinates: [],
          color: "#000000",
          width: 5,
          fill: false,
        },
      ],
      canvasWidth: 600,
      canvasHeight: 400,
      x: 0,
      y: 0,
      cx: 50,
      cy: 70,
      image: "",
      imageText: "",
      imageTextBox: [],
      eraser: false,
      disabled: false,
      fillShape: false,
      line: 5,
      color: "#000000",
      fontSize: 20,
      fontColor: "#000000",
      strokeType: "dash",
      lineCap: "round",
      lineJoin: "round",
      backgroundColor: "#FFFFFF",
      backgroundImage: null,
      watermark: null,
      additionalImages: [],
      text: "",
      textBox: [],
      finalText: "",
      dataBox: [],
      sideDataBox: [],
      detailBox: [],
      idModify: "",
      loadedText: [],
      loadedImage: [],
      certification: true,
      loginId: "",
    };
  },
  mounted() {
    if (screen.width <= 500) {
      this.canvasWidth = 350;
      this.canvasHeight = 400;
      this.mobileStatus = true;
    }
    // 로그인 상태
    if ("login-data" in window.localStorage) {
      const logindData = JSON.parse(window.localStorage.getItem("login-data"));
      console.log(logindData);
      // DB에서 데이터 받아오기
      this.loginId = logindData.user_id;
      axios
        .post("/memoLoad", {
          userId: logindData.user_id,
        })
        .then((response) => {
          // 화살표 함수를 사용하면 this.를 사용할 수 있다.
          this.dataBox = response.data;
          // DB에서 받은 데이터를 최신순으로 10개까지 정렬
          if (this.dataBox.length >= 10) {
            this.sideDataBox = [...this.dataBox].slice(-10).reverse();
          } else {
            this.sideDataBox = [...this.dataBox].reverse();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.sidebarButtonStatus = true;
    }
    // 임시 저장한 데이터 불러오기
    if (
      "temporary-text-storage" in window.localStorage ||
      "temporary-image-storage" in window.localStorage
    ) {
      const temporaryTextBox = JSON.parse(
        window.localStorage.getItem("temporary-text-storage")
      );
      if (typeof temporaryTextBox === "string") {
        this.textBox.push(temporaryTextBox);
      } else {
        this.textBox = temporaryTextBox;
      }
      this.backgroundImage = window.localStorage.getItem(
        "temporary-image-storage"
      );
      this.$refs.VueCanvasDrawing.redraw();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    // 페이지 이동시 경고창
    window.addEventListener("beforeunload", this.unLoadEvent);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.unLoadEvent);
  },
  methods: {
    stateChange(event) {
      var selected = event.target.value;
      console.log("selected : ", selected);
    },
    // 페이지 이동시 경고창
    unLoadEvent: function (event) {
      if (this.certification) return;

      event.preventDefault();
      event.returnValue = "";
    },
    // 페이지 이동시 경고
    toCertify() {
      this.certification = false;
    },
    // 메모 창과 수정 창 OnOff
    mainOnOff: function (data) {
      if (this.sidebarStatus && !this.mainStatus) {
        this.sidebarStatus = !this.sidebarStatus;
        this.mainStatus = !this.mainStatus;
        this.detailBox = data;
      }
      if (this.sidebarStatus && this.mainStatus) {
        this.sidebarStatus = !this.sidebarStatus;
        this.detailBox = data;
      }
    },
    // 사이드바 OnOff
    sidebarOnOff: function () {
      this.sidebarStatus = !this.sidebarStatus;
    },
    // 글쓰기 시작할 포인트 잡기
    offsetClick(event) {
      this.cx = event.offsetX;
      this.cy = event.offsetY;
      // 글쓰기 시작 지점 정하기
      this.clickRedraw();
      // canvas에 text가 삽입된 img를 매번 로딩하기 위해서 최신 text 이미지를 덮어씌워준다.
      this.toCertify();
    },
    // 텍스트 이미지 계속 유지하기 위해
    clickRedraw() {
      // 되돌리기 하는 경우 텍스트가 사라져보이는 것을 방지
      const image_dum = document.createElement("img");
      image_dum.src = this.imageText;
      const canvas = document.getElementById("VueDrawingCanvas");
      const context = canvas.getContext("2d");
      image_dum.onload = () => {
        context.drawImage(image_dum, 0, 0, this.canvasWidth, this.canvasHeight);
        this.image = canvas.toDataURL();
      };
    },
    // Canvas에 글쓰기
    fillmessage() {
      this.textBox.push(this.text);
      // text 기록
      const canvas_dum = document.createElement("canvas");
      canvas_dum.width = this.canvasWidth;
      canvas_dum.height = this.canvasHeight;
      const ctx = canvas_dum.getContext("2d");
      ctx.font = this.fontSize + "pt BM";
      ctx.fillStyle = this.fontColor;
      ctx.fillText(this.text, this.cx, this.cy);
      // 새로 DOM canvas 생성 후 fillText를 통해 text를 삽입한다.
      const loadedImage = canvas_dum.toDataURL();
      // 최신 text가 삽입된 canvas의 이미지.src를 뽑아낸다.

      // text를 담은 img를 겹겹이 저장하기 위해
      const imageTextLast = document.createElement("img");
      imageTextLast.src = this.imageText;
      // 기존 text 이미지
      const imageText = document.createElement("img");
      imageText.src = loadedImage;
      // 새로 생성된 text 이미지
      const canvasText = document.createElement("canvas");
      canvasText.width = this.canvasWidth;
      canvasText.height = this.canvasHeight;
      const textContext = canvasText.getContext("2d");
      imageText.onload = () => {
        textContext.drawImage(
          imageTextLast,
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        );
        textContext.drawImage(
          imageText,
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        );
        // 기존 text 이미지와 새로운 text 이미지를 저장한다.
        this.imageText = canvasText.toDataURL();
        // 합쳐진 이미지들을 저장한다.
        this.imageTextBox.push(this.imageText);
        // 되돌리기용
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      // 이미지 덮어씌우는 방법.
      const image_dum = document.createElement("img");
      image_dum.src = loadedImage;
      // 뽑아낸 이미지.src를 새로 생성한 DOM img에 담는다.
      const canvas = document.getElementById("VueDrawingCanvas");
      const context = canvas.getContext("2d");
      // DOM의 VueDrawingCanvas id를 가진 canvas를 가져온다.
      // getContext("2d")를 통해 이미지를 덮어씌울 형태로 전환한다.
      image_dum.onload = () => {
        context.drawImage(image_dum, 0, 0, this.canvasWidth, this.canvasHeight);
        // DOM에 위치한 기존 canvas에 생성한 글자 이미지 덮어씌운다.
        this.image = canvas.toDataURL();
        // image = 최신이미지, DOM canvas에 걸려있는 v-model로 이미지를 갱신한다.
        // output에 이미지 출력
        // 하지만 출력은 1회용으로 그림그리기와 별개로 저장해야 한다.
      };

      this.$refs.inputText.value = null;
      this.text = "";
      // input 초기화
      this.cy += 30;
      // enter 입력 이후 줄바꿈 느낌으로

      this.toCertify();
      // 페이지 이동 경고
    },
    // 이미지 불러오기 (배경화면으로)
    async setImage(event) {
      this.textBox = [];
      let URL = window.URL;
      this.backgroundImage = URL.createObjectURL(event.target.files[0]);
      await this.$refs.VueCanvasDrawing.redraw();
    },
    // Canvas 내에 마우스 위치 기억하기
    getCoordinate(event) {
      let coordinates = this.$refs.VueCanvasDrawing.getCoordinates(event);
      this.x = coordinates.x;
      this.y = coordinates.y;
    },
    // 텍스트 합치기
    mergeText() {
      if (this.textBox.length) {
        for (let i = 0; i < this.textBox.length; i++) {
          this.finalText += this.textBox[i] + " ";
        }
      }
    },
    // 저장
    imgSave() {
      if (this.loginId) {
        // 로그인 되어 있으면 저장 진행
        if (window.confirm("저장하시겠습니까?")) {
          this.mergeText(); // 텍스트 합치기
          if (this.idModify) {
            // update할 데이터 폼
            const data = {
              _id: this.idModify, // 업데이트 하기 위한 키
              userId: this.loginId, // 아이디
              contentText: this.textBox, // 텍스트
              contentLongText: this.finalText, // 합친 텍스트
              contentImage: this.image, // 이미지
              writingTime: new Date(), // 작성시각
              ratingScore: 3, // 별점
            };
            // axios post로 저장할 데이터 서버로 전송
            axios
              .post("/memoUpdate", data)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            // 저장할 데이터 폼
            const data = {
              userId: this.loginId, // 아이디
              contentText: this.textBox, // 텍스트
              contentLongText: this.finalText, // 합친 텍스트
              contentImage: this.image, // 이미지
              writingTime: new Date(), // 작성시각
              ratingScore: 0, // 별점
              recommendPoint: 0,
              likeIdList: [],
              commentList: [],
            };
            // axios post로 서버 속 데이터 업데이트
            axios
              .post("/memoSave", data)
              .then((response) => {
                console.log(response.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          window.localStorage.removeItem("temporary-text-storage");
          window.localStorage.removeItem("temporary-image-storage");
          window.location.reload(); // 리셋할 방법이 뭐 있을까?
        }
      } else {
        if (window.confirm("로그아웃 상태입니다. 로그인하시겠습니까?")) {
          const storageText = JSON.stringify(this.textBox);
          window.localStorage.setItem("temporary-text-storage", storageText);
          window.localStorage.setItem("temporary-image-storage", this.image);
          this.$router.push("/LogIn");
        }
      }
    },
    // 삭제
    imgDelete(data) {
      if (window.confirm("삭제하시겠습니까?")) {
        this.mainStatus = !this.mainStatus;
        axios
          .get("/memoDelete/" + data._id)
          .then((res) => console.log(res.data));
        window.location.reload(); // 리셋
      }
    },
    // 수정하기 위해 불러오기
    async imgModify(data) {
      this.mainStatus = !this.mainStatus;
      this.idModify = data._id;
      this.backgroundImage = data.contentImage;
      await this.$refs.VueCanvasDrawing.redraw();
    },
    // reset에 기능 추가
    allClear() {
      this.image = "";
      this.imageText = "";
      this.finalText = "";
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,700&display=swap");
body {
  font-family: "Roboto", sans-serif;
  background-color: #fafcff;
}
.memo-title {
  /* background-color: rgb(190, 236, 236);
  height: 50px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 4px 4px 4px rgb(192, 192, 192); */
  position: relative;
}
.sidebar-onoff {
  position: absolute;
  left: 80%;
  bottom: 0px;
}
.button-container {
  margin: 15px;
  width: 350px;
}
.button-container > * {
  margin: 15px;
}
.background-container {
  display: flex;
}
.input-text {
  width: 300px;
  height: 100px;
  text-align: center;
  font-size: 20px;
}
.wrap-memo {
  padding: 0px;
  margin: 0px;
}
.memo-container {
  display: flex;
  justify-content: center;
  /* //--> 레이아웃 지정 */
  overflow: auto;
  height: 600px;
  /* 스크롤바 없애기 */
  -ms-overflow-style: none;
  position: relative;
}
.write-wrap {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  width: 70%;
  height: 600px;
  padding: 5px;
  border-radius: 15px;
}
.canvas-content {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  width: 1000px;
  height: 500px;
  padding: 5px;
}
.source {
  width: 1000px;
  height: 500px;
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgb(192, 192, 192);
}
.canvas-container {
  margin: 15px;
}
.detail-content {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  width: 1000px;
  height: 500px;
  padding: 5px;
}
.detail-image {
  box-shadow: 5px 5px 5px rgb(192, 192, 192);
}
.stroke-do-button {
  width: 50px;
  margin: 1px;
  background-color: rgb(118, 235, 231);
  color: #000000;
  border: #7e7e7e 1px solid;
  border-radius: 10px;
}
.stroke-button-icon {
  margin-top: 3px;
}
.stroke-style-button-container {
  display: flex;
  justify-content: center;
}
.stroke-change-button {
  width: 50px;
  margin: 1px;
  background-color: rgb(149, 255, 251);
  color: #000000;
  border: #7e7e7e 1px solid;
  border-radius: 10px;
}
.storke-select {
  height: 26px;
  margin: 1px;
}
.color-select {
  width: 50px;
  background-color: rgb(231, 231, 231);
  border: #7e7e7e 1px solid;
  border-radius: 10px;
}
.detail-image {
  width: 600px;
  height: 400px;
}
.write-area {
  width: 99%;
  height: 550px;
  background-color: beige;
  border-radius: 20px;
  box-shadow: 5px 5px 5px rgb(192, 192, 192);
}
.sidebar {
  margin-left: 1%;
  width: 300px;
  position: absolute;
  left: 65%;
  /* height: 3000px; */
  /* overflow: auto; */
}
.sidebar-inner-container {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  padding: 5px;
}
.memo-container::-webkit-scrollbar {
  display: none;
}
.thumbnail {
  /* height: 200px;
  background-color: rgb(255, 239, 219);
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgb(192, 192, 192); */
  width: 300px;
  height: 250px;
  margin: auto;
  background-image: url("../assets/memo_background.png");
  background-size: 100% 120%;
  word-break: break-all;
  overflow: hidden;
}
.thumbnail-title {
  width: 150px;
  font-size: large;
  margin-top: 65px;
  margin-left: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.thumbnail-image {
  width: 180px;
  height: 120px;
}
.a:first-child {
  position: sticky;
  position: -webkit-sticky;
}
.memo-tool {
  /* background-color: rgb(160, 160, 255); */
  height: 50px;
  width: 100%;
  display: flex;
}
/* .memo_tool > div {
      border: 1px solid #000;
    } */
.write-tool {
  position: absolute;
  right: 5em;
}
.star-tool {
  display: flex;
  padding: 8px;
  height: 30px;
  width: 150px;
  text-align: center;
  /* position: absolute; */
  /* right: 2.5em; */
  /* background-color: #777777; */
}
#myform fieldset {
  display: inline-block; /* 하위 별점 이미지들이 있는 영역만 자리를 차지함.*/
  direction: rtl; /* 이모지 순서 반전 */
  border: 0; /* 필드셋 테두리 제거 */
  padding: 0;
  margin: 5px;
  height: 26px;
  background-color: #7e7e7e;
}
#myform input[type="radio"] {
  display: none; /* 라디오박스 감춤 */
}
#myform label {
  font-size: 0.9em; /* 이모지 크기 */
  color: transparent; /* 기존 이모지 컬러 제거 */
  text-shadow: 0 0 0 #cccccc; /* 새 이모지 색상 부여 */
}
#myform label:hover {
  text-shadow: 0 0 0 black; /* 마우스 호버 */
  cursor: pointer;
}
#myform label:hover ~ label {
  text-shadow: 0 0 0 black; /* 마우스 호버 뒤에오는 이모지들 */
}
#myform input[type="radio"]:checked ~ label {
  text-shadow: 0 0 0 black; /* 마우스 클릭 체크 */
}
.save-tool {
  width: 100px;
  /* padding: 10px; */
  height: 30px;
  /* position: absolute;
  right: 0; */
  cursor: pointer;
}
.save-img {
  width: 20px;
  height: 20px;
  background-color: #cccccc;
  border-radius: 8px;
}
@media screen and (max-width: 500px) {
  .wrap-memo {
    width: 360px;
    height: 700px;
    margin: auto;
  }
  .memo-container {
    height: 700px;
  }
  .canvas-content {
    width: 360px;
    height: 680px;
  }
  .source {
    width: 360px;
    height: 680px;
    /* display: flex; */
    flex-direction: column;
    background-color: #fcfcfc;
    border-radius: 15px;
    box-shadow: 5px 5px 5px rgb(192, 192, 192);
  }
  .canvas-container {
    display: flex;
    width: 360px;
    height: 500px;
    margin: 4px;
  }
  .canvas-title {
    display: none;
  }
  #VueDrawingCanvas {
    position: absolute;
    bottom: 190px;
  }
  .tool-title {
    display: none;
  }
  .button-container {
    margin: 0px;
    width: 350px;
    display: flex;
    flex-direction: column-reverse;
  }
  .mobile-button-container {
    display: flex;
    margin: 10px;
  }
  .stroke-style-button-container {
    display: block;
  }
  .backgroundcolor-text {
    display: none;
  }
  .backgroundimg-text {
    display: none;
  }
  .setImage-button {
    width: 75px;
  }
  .star-tool {
    padding: 0;
  }
  .input-text-container {
    position: absolute;
    display: flex;
    bottom: 590px;
  }
  .input-text-text {
    display: none;
  }
  .input-text-inner-container {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
  }
  .input-text {
    width: 270px;
    height: 60px;
  }
  .detail-image {
    width: 350px;
    height: 400px;
  }
  .sidebar-onoff {
    left: 170px;
    bottom: 25px;
  }
  .sidebar {
    margin-left: 0;
    width: 300px;
    position: absolute;
    left: 65px;
  }
}
</style>
