<template>
  <div class="wrap">
    <div class="content">
      <section class="article-wrapper">
        <ul>
          <li v-for="timeline in timelines" :key="timeline._id">
            <img :src="timeline.avatar" />
            <div class="content">
              <div class="message">{{ timeline.content }}</div>
              <div class="meta">
                <i class="iconfont icon-date"></i>
                {{ timeline.created_time }}
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
import { getTimeLines } from "@/api/timelines";
import SideBar from "@/components/SideBar";
export default {
  name: "TimeLine",
  components: {
    Sidebar
  },
  data() {
    return {
      timelines: []
    };
  },
  methods: {
    async fetch() {
      const res = await getTimeLines();
      console.log(res, "res");
      if (res.code === 200) {
        this.timelines = res.data.timelines;
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped></style>
