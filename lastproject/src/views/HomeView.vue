<template>
  <hr />
  <div class="wrap_memo">
    <div class="memo_title">메모</div>
    <div class="memo_container">
      <!-- 메모장 시작 -->
      <div class="CanvasContent" v-if="!status">
        <div class="source">
          <div class="canvas-container">
            <p>Canvas:</p>
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
          </div>
          <div class="button-container">
            <div class="stroke-button-container">
              <button type="button" @click.prevent="disabled = !disabled">
                <span v-if="!disabled">Unlock</span>
                <span v-else>Lock</span>
              </button>
              <button
                type="button"
                @click.prevent="$refs.VueCanvasDrawing.undo()"
              >
                Undo
              </button>
              <button
                type="button"
                @click.prevent="$refs.VueCanvasDrawing.redo()"
              >
                Redo
              </button>
              <button
                type="button"
                @click.prevent="$refs.VueCanvasDrawing.redraw()"
              >
                Refresh
              </button>
              <button
                type="button"
                @click.prevent="$refs.VueCanvasDrawing.reset()"
              >
                Reset
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
                <option value="dash">Dash</option>
                <option value="line">Straight Line</option>
                <option value="circle">Circle</option>
                <option value="square">Square</option>
                <option value="triangle">Triangle</option>
                <option value="half_triangle">Half Triangle</option>
              </select>
              <button type="button" @click.prevent="fillShape = !fillShape">
                <span v-if="fillShape"> Fill </span>
                <span v-else> Stroke </span>
              </button>
            </div>
            <!-- <div class="button-container">
          <button type="button" @click.prevent="getStrokes()">
            Save All Strokes
          </button>
          <button type="button" @click.prevent="removeSavedStrokes()">
            Remove Saved Strokes
          </button>
          </div> -->
            <div class="background-container">
              <div style="margin-right: 30px">
                <p style="margin-bottom: 0">Background Color:</p>
                <input type="color" v-model="backgroundColor" />
              </div>
              <div>
                <p style="margin-bottom: 0">Upload Background Image:</p>
                <input type="file" @change="setImage($event)" />
              </div>
              <!-- <div>
            <p style="margin-bottom: 0">Upload Watermark Image:</p>
            <input type="file" @change="setWatermarkImage($event)" />
            </div> -->
            </div>
            <!-- 이미지 추출은 this.image => img.src
          <div class="output">
          <p>Output:</p>
          <img
            ref="outputResult"
            :src="image"
            style="border: solid 1px #000000"
          />
          </div> -->
            <div class="input-text-container">
              <p>
                현재 글쓰기 시작점은 {{ cx }},{{ cy }}입니다.
                <br />
                x-axis:
                <strong>{{ x }}</strong
                >, y-axis: <strong>{{ y }}</strong>
              </p>
              <input
                class="input-text"
                ref="inputText"
                type="text"
                v-model="text"
                @keyup.enter="fillmessage()"
                autofocus
              />
              <button @click="imgSave">save</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 메모장 끝 -->
      <!-- 메모장 확인 창 시작 -->
      <DetailContent v-if="status" />
      <!-- 메모장 확인 창 끝 -->
      <!-- 메모장 더미 시작 -->
      <!-- <div v-if="!status" class="write_wrap">
        <div class="write_area">Main content</div>
        <div class="memo_tool">
          <div class="write_tool">
            <div>?????</div>
          </div>
          <div class="star_tool">
            <form name="myform" id="myform" method="post" action="./save">
              <fieldset>
                <input type="radio" name="rating" value="5" id="rate1" /><label
                  for="rate1"
                  >⭐</label
                >
                <input type="radio" name="rating" value="4" id="rate2" /><label
                  for="rate2"
                  >⭐</label
                >
                <input type="radio" name="rating" value="3" id="rate3" /><label
                  for="rate3"
                  >⭐</label
                >
                <input type="radio" name="rating" value="2" id="rate4" /><label
                  for="rate4"
                  >⭐</label
                >
                <input type="radio" name="rating" value="1" id="rate5" /><label
                  for="rate5"
                  >⭐</label
                >
              </fieldset>
            </form>
          </div>
          <div class="save_tool">
            <img class="save_img" src="../assets/save.png" alt="" />
          </div>
        </div>
      </div> -->
      <!-- 메모장 더미 끝 -->
      <div class="sidebar">
        <div class="box">
          <div
            class="a"
            @click="detailContent"
            v-for="data of dataBox"
            v-bind:key="data"
          >
            <div>{{ data.textbox[0] }}</div>
            <div>{{ data.src }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr />
  <div class="footer">Footer</div>
</template>

<script>
/* eslint-disable */
import VueDrawingCanvas from "vue-drawing-canvas";
import DetailContent from "@/components/DetailContent.vue";
import SearchInput from "@/components/SearchInput.vue";
import SearchResult from "@/components/SearchResult.vue";
export default {
  components: {
    DetailContent,
    SearchInput,
    SearchResult,
    VueDrawingCanvas,
  },
  data() {
    return {
      status: false,
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
      eraser: false,
      disabled: false,
      fillShape: false,
      line: 5,
      color: "#000000",
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
      loadedText: [],
      loadedImage: [],
    };
  },
  created() {
    // 임시로 로컬스토리지 사용
    const downLoad = window.localStorage.getItem("dataBox");
    this.dataBox = JSON.parse(downLoad);
    if (this.dataBox.length > 0) {
      for (let i = 0; i < this.dataBox.length; i++) {
        this.loadedText.push(this.dataBox[i].textbox);
        this.loadedImage.push(this.dataBox[i].src);
      }
    }
  },
  mounted() {
    if ("vue-drawing-canvas" in window.localStorage) {
      this.initialImage = JSON.parse(
        window.localStorage.getItem("vue-drawing-canvas")
      );
    }
  },
  methods: {
    detailContent: function () {
      this.status = !this.status;
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
    async fillmessage() {
      this.textbox.push(this.text);
      // text 기록
      const canvas_dum = document.createElement("canvas");
      canvas_dum.width = 600;
      canvas_dum.height = 400;
      const ctx = canvas_dum.getContext("2d");
      ctx.font = "20pt BM YEONSUNG OTF";
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
    async setImage(event) {
      let URL = window.URL;
      this.backgroundImage = URL.createObjectURL(event.target.files[0]);
      await this.$refs.VueCanvasDrawing.redraw();
    },
    async setWatermarkImage(event) {
      let URL = window.URL;
      this.watermark = {
        type: "Image",
        source: URL.createObjectURL(event.target.files[0]),
        x: 0,
        y: 0,
        imageStyle: {
          width: 600,
          height: 400,
        },
      };
      await this.$refs.VueCanvasDrawing.redraw();
    },
    getCoordinate(event) {
      let coordinates = this.$refs.VueCanvasDrawing.getCoordinates(event);
      this.x = coordinates.x;
      this.y = coordinates.y;
    },
    getStrokes() {
      window.localStorage.setItem(
        "vue-drawing-canvas",
        JSON.stringify(this.$refs.VueCanvasDrawing.getAllStrokes())
      );
      alert(
        "Strokes saved, reload your browser to see the canvas with previously saved image"
      );
    },
    removeSavedStrokes() {
      window.localStorage.removeItem("vue-drawing-canvas");
      alert("Strokes cleared from local storage");
    },
    imgSave() {
      const memoDate = {
        textbox: this.textbox,
        src: this.image,
      };
      this.dataBox.push(memoDate);
      // 임시로 로컬스토리지에 저장
      const upLoad = JSON.stringify(this.dataBox);
      window.localStorage.setItem("dataBox", upLoad);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,700&display=swap");
body {
  font-family: "Roboto", sans-serif;
}
.source {
  display: flex;
  flex-direction: row;
}
.canvas-container {
  margin: 15px;
}
.button-container > * {
  margin: 15px;
}
.input-text {
  width: 300px;
  height: 150px;
}
.wrap_memo {
  padding: 20px;
  margin: 10px;
}
.memo_container {
  display: flex;
  /* //--> 레이아웃 지정 */
  overflow: auto;
  height: 600px;
  /* 스크롤바 없애기 */
  -ms-overflow-style: none;
}
.memo_title {
  background-color: rgb(190, 236, 236);
  height: 50px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 4px 4px 4px rgb(192, 192, 192);
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
  width: 70%;
  height: 600px;
  padding: 5px;
  border-radius: 15px;
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
  width: 29%;
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
  background-color: rgb(172, 148, 118);
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
  position: absolute;
  right: 2.5em;
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
  width: 30px;
  padding: 10px;
  height: 30px;
  position: absolute;
  right: 0;
  cursor: pointer;
}
.save_img {
  width: 100%;
  height: 100%;
  background-color: #cccccc;
  border-radius: 8px;
}
.footer {
  background: #777777;
  height: 80px;
}
</style>
