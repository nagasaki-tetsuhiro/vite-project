<template>
  <main class="wrapper">
    <div class="wrapper__main">
      <ul class="list-chat">
        <li class="list-chat__item">
          <a href="/irs_chat" class="list-chat__link">
            <div class="list-chat__img"><img src="@/assets/img/img_group_sample.svg" alt="グループ画像"></div>
            <div class="list-chat__text">
              <div class="list-chat__name-time">
                <p class="list-chat__name">所属グループ名</p>
                <p class="list-chat__time">18:08</p>
              </div>
              <p class="list-chat__comment">本日のミーティングは開催場所が第１本日のミーティングは開催場所が第１本日テストテストテストテスト</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  name: "IrsChatList"
}
</script>

<style scoped>

</style>