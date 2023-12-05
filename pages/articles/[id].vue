<template>
  <SharedNavBar></SharedNavBar>
  <div class="bg-black md:px-20 min-h-screen h-full pb-4 pt-10">
    <div class="grid md:grid-cols-12 gap-6">
      <div class="md:col-span-8">
        <div className="   px-2">
          <div className="overflow-hidden h-fit rounded-md">
            <img
              className=" h-44 md:h-64 w-full hover:scale-105 duration-500 transition-all"
              :src="article.image"
              alt=""
            />
          </div>
          <div
            class="bg-[#121318] px-2 rounded-md mt-4 h-fit w-full flex flex-col"
          >
            <div className="font-semibold text-lg pt-4 pb-10  ">
              {{ article.title }}
            </div>
            <div
              className=" prose  prose-a:text-blue-600 pb-20 lg:prose-xl  text-white w-full "
              v-html="article.content"
            ></div>
          </div>
        </div>
      </div>
      <div class="w-full md:col-span-4 md:flex flex-col gap-y-4 px-2">
        <div class="text-3xl font-semibold pb-4">New Articles</div>
        <div class="h-screen overflow-y-scroll">
          <NuxtLink
            v-for="(item, index) in news.data"
            :to="`/articles/${item.id}`"
          >
            <SharedContainer
              className=" rounded-md overflow-hidden w-full text-xs bg-[#121318]"
            >
              <div className="overflow-hidden h-fit rounded-md">
                <img
                  className=" h-44 w-full hover:scale-105 duration-500 transition-all"
                  :src="item.image"
                  alt=""
                />
              </div>
              <div className=" flex  justify-between px-2 pt-2  pb-4">
                <div className=" font-semibold">{{ item.title }}</div>
                <div>
                  <div>{{ item.author }}</div>
                  <div className=" text-blue-600">{{ item.time }}</div>
                </div>
              </div>
            </SharedContainer>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { routeLocationKey } from "vue-router";
const route = useRoute();
const { data: article } = await useFetch(
  "https://api.stockbull.live/api/article/" + route.params.id
);

const { data: news } = await useFetch(
  "https://api.stockbull.live/api/articles"
);
</script>
