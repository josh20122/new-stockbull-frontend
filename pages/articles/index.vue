<template>
  <SharedNavBar></SharedNavBar>
  <!-- {{ news }} -->
  <div class="bg-black min-h-screen">
    <div class="grid sm:grid-cols-2 md:grid-cols-3 md:px-20 pt-10 gap-4 px-2">
      <NuxtLink v-for="(item, index) in news.data" :to="`/articles/${item.id}`">
        <SharedContainer className=" rounded-md overflow-hidden w-full text-xs bg-[#121318]">
          <div className="overflow-hidden h-fit rounded-md">
            <img className=" h-44 w-full hover:scale-105 duration-500 transition-all" :src="item.image" alt="" />
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
</template>
<script setup>
const { data: news } = await useFetch(
  "https://api.stockbull.live/api/articles"
);
</script>
