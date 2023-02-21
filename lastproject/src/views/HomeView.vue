<template>
  <hr />
  <div class="wrap_memo">
    <div class="memo_title">
      <!-- 사이드 바 출력 버튼 -->
      <button class="sidebarOnOff" @click="sidebarOnOff">사이드 바</button>
    </div>
    <div class="memo_container">
      <!-- 메모장 시작 -->
      <div class="CanvasContent" v-if="!mainStatus">
        <div class="source">
          <div class="canvas-container">
            <p>Canvas:</p>
            <!-- 캔버스 컴포넌트 시작 -->
            <vue-drawing-canvas
              ref="VueCanvasDrawing"
              v-model:image="image"
              :width="600"
              :height="400"
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
            />
            <!-- 캔버스 컴포넌트 끝 -->
          </div>
          <!-- 캔버스 툴 시작 -->
          <div class="button-container">
            <div class="stroke-button-container">
              <button
                type="button"
                @click="clickRedraw"
                @click.prevent="$refs.VueCanvasDrawing.undo()"
              >
                작업취소
              </button>
              <button
                type="button"
                @click="clickRedraw"
                @click.prevent="$refs.VueCanvasDrawing.redo()"
              >
                취소취소
              </button>
              <button
                type="button"
                @click.prevent="$refs.VueCanvasDrawing.reset()"
                @click="allClear"
              >
                모두삭제
              </button>
            </div>
            <div class="stroke-style-button-container">
              <button type="button" @click.prevent="eraser = !eraser">
                <span v-if="eraser"> Eraser </span>
                <span v-else> Draw </span>
              </button>
              <select v-model="line">
                <option v-for="n in 25" :key="'option-' + n" :value="n">
                  {{ n }}
                </option>
              </select>
              <input type="color" v-model="color" />
              <select v-model="strokeType">
                <option value="dash">그리기</option>
                <option value="line">선</option>
                <option value="circle">원</option>
                <option value="square">사각형</option>
                <option value="triangle">삼각형</option>
              </select>
              <button type="button" @click.prevent="fillShape = !fillShape">
                <span v-if="fillShape"> 채우기 </span>
                <span v-else> 선 </span>
              </button>
            </div>
            <div class="background-container">
              <div>
                <p style="margin-bottom: 0">배경색상:</p>
                <input type="color" v-model="backgroundColor" />
              </div>
              <div>
                <p style="margin-bottom: 0">이미지 업로드:</p>
                <input type="file" @change="setImage($event)" />
              </div>
            </div>
            <div class="star_tool">
              <form name="myform" id="myform" method="post" action="./save">
                <fieldset>
                  <input
                    type="radio"
                    name="rating"
                    value="5"
                    id="rate1"
                  /><label for="rate1">⭐</label>
                  <input
                    type="radio"
                    name="rating"
                    value="4"
                    id="rate2"
                  /><label for="rate2">⭐</label>
                  <input
                    type="radio"
                    name="rating"
                    value="3"
                    id="rate3"
                  /><label for="rate3">⭐</label>
                  <input
                    type="radio"
                    name="rating"
                    value="2"
                    id="rate4"
                  /><label for="rate4">⭐</label>
                  <input
                    type="radio"
                    name="rating"
                    value="1"
                    id="rate5"
                  /><label for="rate5">⭐</label>
                </fieldset>
              </form>
            </div>
            <div class="input-text-container">
              <p>
                현재 글쓰기 시작점은 {{ cx }},{{ cy }}입니다.
                <br />
                x-axis:
                <strong>{{ x }}</strong
                >, y-axis: <strong>{{ y }}</strong>
              </p>
              <select v-model="fontSize">
                <option v-for="n in 25" :key="'option-' + n" :value="n">
                  {{ n }}
                </option>
              </select>
              <input type="color" v-model="fontColor" />
              <!-- <button @click="deleteText">뒤로가기</button> -->
              <input
                class="input-text"
                ref="inputText"
                type="text"
                v-model="text"
                @keyup.enter="fillmessage()"
                autofocus
                placeholder="Enter를 입력하면 출력됩니다."
              />
              <button class="save_tool" @click="imgSave">
                <img class="save_img" src="../assets/save.png" alt="" />save
              </button>
            </div>
          </div>
          <!-- 캔버스 툴 끝 -->
        </div>
      </div>
      <!-- 메모장 끝 -->
      <!-- 메모장 확인 창 시작 -->
      <div class="DetailContent" v-if="mainStatus">
        <div class="source">
          <div>
            <img
              :src="detailBox.contentImage"
              alt=""
              style="width: 100%; height: 100%"
            />
          </div>
          <div>
            <div>
              {{ detailBox.contentText[0] }}
            </div>

            <div>{{ detailBox.writingTime }}</div>
            <span>{{ detailBox.ratingScore }}점</span>
            <span>추천 : {{ detailBox.recommendPoint }}</span>
          </div>
        </div>
      </div>
      <!-- 메모장 확인 창 끝 -->
      <!-- 사이드 바 시작 -->
      <div class="sidebar" v-if="sidebarStatus">
        <div class="box">
          <div
            class="a"
            @click="mainOnOff(data)"
            v-for="data of sideDateBox"
            v-bind:key="data"
          >
            <div style="font-size: large; margin: 10px">
              {{ data.contentText[0] }}
            </div>
            <img
              :src="data.contentImage"
              alt=""
              style="width: 60%; height: 60%"
            />
            <div style="font-size: small">{{ data.writingTime }}</div>
          </div>
        </div>
      </div>
      <!-- 사이드 바 끝 -->
    </div>
  </div>

  <hr />
  <div class="footer">Footer</div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import VueDrawingCanvas from "vue-drawing-canvas";
export default {
  components: {
    VueDrawingCanvas,
  },
  data() {
    return {
      mainStatus: false,
      sidebarStatus: false,
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
      textbox: [],
      dataBox: [],
      sideDateBox: [],
      detailBox: [],
      loadedText: [],
      loadedImage: [],
    };
  },
  mounted() {
    if ("vue-drawing-canvas" in window.localStorage) {
      this.initialImage = JSON.parse(
        window.localStorage.getItem("vue-drawing-canvas")
      );
    }
    // DB에서 데이터 받아오기
    const data = [];
    axios
      .post("/memoLoad", {
        userId: "testId",
      })
      .then(function (response) {
        data.push(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.dataBox = data;
  },
  methods: {
    mainOnOff: function (data) {
      if (this.sidebarStatus && this.mainStatus) {
        this.sidebarStatus = !this.sidebarStatus;
        this.mainStatus = !this.mainStatus;
        this.detailBox = data;
      }
      if (this.sidebarStatus && !this.mainStatus) {
        this.sidebarStatus = !this.sidebarStatus;
        this.detailBox = data;
      }
    },
    sidebarOnOff: function () {
      this.sidebarStatus = !this.sidebarStatus;
      // DB에서 받은 데이터를 최신순으로 10개까지 정렬
      if (this.dataBox[0].length >= 10) {
        this.sideDateBox = [...this.dataBox[0]].slice(-10).reverse();
      } else {
        this.sideDateBox = [...this.dataBox[0]].reverse();
      }
    },
    offsetClick(event) {
      this.cx = event.offsetX;
      this.cy = event.offsetY;
      // 글쓰기 시작 지점 정하기
      const image_dum = document.createElement("img");
      image_dum.src = this.imageText;
      const canvas = document.getElementById("VueDrawingCanvas");
      const context = canvas.getContext("2d");
      image_dum.onload = () => {
        context.drawImage(image_dum, 0, 0, 600, 400);
        this.image = canvas.toDataURL();
      };
      // canvas에 text가 삽입된 img를 매번 로딩하기 위해서 최신 text 이미지를 덮어씌워준다.
    },
    clickRedraw() {
      // 되돌리기 하는 경우 텍스트가 사라져보이는 것을 방지
      const image_dum = document.createElement("img");
      image_dum.src = this.imageText;
      const canvas = document.getElementById("VueDrawingCanvas");
      const context = canvas.getContext("2d");
      image_dum.onload = () => {
        context.drawImage(image_dum, 0, 0, 600, 400);
        this.image = canvas.toDataURL();
      };
    },
    fillmessage() {
      this.textbox.push(this.text);
      // text 기록
      const canvas_dum = document.createElement("canvas");
      canvas_dum.width = 600;
      canvas_dum.height = 400;
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
      canvasText.width = 600;
      canvasText.height = 400;
      const textContext = canvasText.getContext("2d");
      imageText.onload = () => {
        textContext.drawImage(imageTextLast, 0, 0, 600, 400);
        textContext.drawImage(imageText, 0, 0, 600, 400);
        // 기존 text 이미지와 새로운 text 이미지를 저장한다.
        this.imageText = canvasText.toDataURL();
        // 합쳐진 이미지들을 저장한다.
        this.imageTextBox.push(this.imageText);
        // 되돌리기용
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
        context.drawImage(image_dum, 0, 0, 600, 400);
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
    },
    // 텍스트 되돌리기는 보류
    // deleteText() {
    //   console.log(this.imageTextBox);
    //   if (this.imageTextBox.length > 0) {
    //     const last = this.imageTextBox.pop();
    //     if (this.imageTextBox.length > 0) {
    //       this.imageText = this.imageTextBox[this.imageTextBox.length - 1];
    //       const image_dum = document.createElement("img");
    //       image_dum.src = this.imageText;
    //       const canvas = document.getElementById("VueDrawingCanvas");
    //       const context = canvas.getContext("2d");
    //       image_dum.onload = () => {
    //         context.drawImage(image_dum, 0, 0, 600, 400);
    //         this.image = canvas.toDataURL();
    //       };
    //     } else {
    //       const image_dum = document.createElement("img");
    //       image_dum.src = "";
    //       const canvas = document.getElementById("VueDrawingCanvas");
    //       const context = canvas.getContext("2d");
    //       image_dum.onload = () => {
    //         context.drawImage(image_dum, 0, 0, 600, 400);
    //         this.image = canvas.toDataURL();
    //       };
    //     }
    //   }
    // },
    async setImage(event) {
      let URL = window.URL;
      this.backgroundImage = URL.createObjectURL(event.target.files[0]);
      await this.$refs.VueCanvasDrawing.redraw();
    },
    getCoordinate(event) {
      let coordinates = this.$refs.VueCanvasDrawing.getCoordinates(event);
      this.x = coordinates.x;
      this.y = coordinates.y;
    },
    imgSave() {
      if (window.confirm("저장하시겠습니까?")) {
        // 저장할 데이터 폼
        const data = {
          userId: "testId", // 아이디
          userPassword: "testPassword", // 비번
          contentText: this.textbox, // 텍스트
          contentImage: this.image, // 이미지
          writingTime: new Date(), // 작성시각
          ratingScore: 3, // 별점
          recommendPoint: 10, // 추천수
        };
        // axios post로 저장할 데이터 서버로 전송
        axios
          .post("/userData", data)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        window.location.reload();
        // this.$refs.VueCanvasDrawing.reset();
        // this.image = "";
        // this.imageText = "";
        // this.cx = 50;
        // this.cy = 50;
        // this.fontSize = 20;
        // this.fontColor = "#000000";
      }
    },
    allClear() {
      this.image = "";
      this.imageText = "";
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,700&display=swap");
body {
  font-family: "Roboto", sans-serif;
  background-color: #f8f8f8;
}
.memo_title {
  /* background-color: rgb(190, 236, 236);
  height: 50px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 4px 4px 4px rgb(192, 192, 192); */
  position: relative;
}
.sidebarOnOff {
  position: absolute;
  left: 70%;
  bottom: 50px;
}
.source {
  width: 1000px;
  display: flex;
  flex-direction: row;
}
.canvas-container {
  margin: 15px;
}
.button-container {
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
.wrap_memo {
  padding: 20px;
  margin: 10px;
}
.memo_container {
  display: flex;
  justify-content: center;
  /* //--> 레이아웃 지정 */
  overflow: auto;
  height: 600px;
  /* 스크롤바 없애기 */
  -ms-overflow-style: none;
  position: relative;
}
.write_wrap {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  width: 70%;
  height: 600px;
  padding: 5px;
  border-radius: 15px;
}
.CanvasContent {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  width: 1000px;
  height: 500px;
  padding: 5px;
}
.source {
  background-color: #fcfcfc;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgb(192, 192, 192);
}
.DetailContent {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  width: 1000px;
  height: 500px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px rgb(192, 192, 192);
  background-color: azure;
}
.write_area {
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
.box {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  padding: 5px;
}
.memo_container::-webkit-scrollbar {
  display: none;
}
.a {
  height: 200px;
  background-color: rgb(255, 239, 219);
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px 3px rgb(192, 192, 192);
  word-break: break-all;
  overflow: hidden;
}
.a:first-child {
  position: sticky;
  position: -webkit-sticky;
}
.memo_tool {
  /* background-color: rgb(160, 160, 255); */
  height: 50px;
  width: 100%;
  display: flex;
}
/* .memo_tool > div {
      border: 1px solid #000;
    } */
.write_tool {
  position: absolute;
  right: 5em;
}
.star_tool {
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
.save_tool {
  width: 100px;
  /* padding: 10px; */
  height: 30px;
  /* position: absolute;
  right: 0; */
  cursor: pointer;
}
.save_img {
  width: 20px;
  height: 20px;
  background-color: #cccccc;
  border-radius: 8px;
}
.footer {
  background: #777777;
  height: 80px;
}
</style>
