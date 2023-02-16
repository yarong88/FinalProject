<template>
  <div id="app">
    <div class="flex-row">
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
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import VueDrawingCanvas from "vue-drawing-canvas";

export default {
  name: "ServeDev",
  components: {
    VueDrawingCanvas,
  },
  data() {
    return {
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
    };
  },
  mounted() {
    if ("vue-drawing-canvas" in window.localStorage) {
      this.initialImage = JSON.parse(
        window.localStorage.getItem("vue-drawing-canvas")
      );
    }
  },
  methods: {
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
  },
};
</script>

<style scoped>
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
  height: 200px;
}
</style>
