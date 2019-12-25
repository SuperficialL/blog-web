<template>
  <div class="wrap">
    <div class="message">
      <ul>
        <li v-for="message in messages" :key="message._id">
          <p>{{ message.author }}</p>
          <div class="content">
            {{ message.content }}
          </div>
          <div class="meta">
            <i class="iconfont icon-date"></i>
            {{ message.created_time }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messages: [],
      query: {
        page: 1,
        per_page: 15
      }
    };
  }
};
</script>

<style scoped></style>
