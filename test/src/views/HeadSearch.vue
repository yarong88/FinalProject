<template>
  <hr />
  <div class="search_group">
    <div class="search_wrap">
      <span class="icon"
        ><i
          class="fa fa-search"
          style="
            font-size: 20px;
            background-color: rgb(128, 128, 128);
            color: #fff;
            padding: 5px 20px;
            border-radius: 10px;
          "
          ><input
            type="text"
            id="search"
            placeholder="검색어를 입력해주세요" /></i
      ></span>
    </div>
    <button class="bt1">이게 뭐노....</button>
  </div>
  <br />
  <SearchResult />
  <div class="wrap_memo">
    <div class="memo_title">메모</div>
    <div class="memo_container">
      <DetailContent v-if="status" />
      <div v-if="!status" class="write_wrap">
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
      </div>
      <div class="sidebar">
        <div class="box">
          <div @click="detailContent" class="a">1</div>
          <div class="a">2</div>
          <div class="a">3</div>
          <div class="a">4</div>
          <div class="a">5</div>
          <div class="a">6</div>
          <div class="a">7</div>
          <div class="a">8</div>
          <div class="a">9</div>
          <div class="a">10</div>
        </div>
      </div>
    </div>
  </div>

  <hr />
  <div class="footer">Footer</div>
</template>

<script>
/* eslint-disable */
import DetailContent from "@/components/DetailContent.vue";
import SearchResult from "@/components/SearchResult.vue";
export default {
  components: {
    DetailContent,
    SearchResult,
  },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    detailContent: function () {
      this.status = !this.status;
    },
    search: function () {},
  },
};
</script>

<style>
#search {
  background-color: rgb(128, 128, 128);
  width: 400px;
  height: 50px;
  border: 0;
  margin-left: 15px;
  font-size: 15px;
}
#search::placeholder {
  color: #fff;
}
.search_wrap {
  margin: 20px;
}
.icon {
  width: 20px;
  height: 20px;
}
.search_img {
  height: 30px;
  widows: 30px;
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
