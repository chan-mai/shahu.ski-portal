<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import PostList from '../components/PostList.vue';
    import { client } from '../main.js';

    let categories: any = ref([]);
    let search_input = ref("");

    onMounted(() => {
        // データの取得
        client.get({
        endpoint: 'categories',
        queries: { limit: 50, orders: '-createdAt' }
      })
      .then((res) => {
        res.contents.forEach((category: any) => {
            categories.value.push(category);
        });
      });
    });
</script>

<template>
    <!-- へっだー-->
    <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')]">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
            <!-- Announcement Banner -->
            <div class="flex justify-center">
            <router-link to="/donate" class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                支援のご案内
                <span class="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </span>
            </router-link>
            </div>
            <!-- End Announcement Banner -->

            <!-- Title -->
            <div class="mt-5 max-w-2xl text-center mx-auto">
            <h1 class="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
                ようこそ
                <span class="bg-clip-text bg-gradient-to-tl from-rose-500 to-purple-400 text-transparent">しゃふすきー</span>
                へ
            </h1>
            </div>
            <!-- End Title -->

            <div class="mt-5 max-w-3xl text-center mx-auto">
            <p class="text-lg text-gray-600 dark:text-gray-400">ここには、しゃふすきーに関する規約やポリシー、その他の情報など様々なものがごちゃまぜで詰め込まれています。</p>
            </div>

            <!-- Buttons -->
            <div class="mt-8 gap-3 flex justify-center">
            <router-link class="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-rose-500 to-purple-400 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800" to="/terms">
                利用規約
                <svg class="flex-shrink-0 w-4 h-4" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </router-link>
            <router-link class="inline-flex justify-center items-center gap-x-3 text-center bg-white border border-gray-200 text-gray-800 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 py-3 px-4 rounded-md font-medium text-sm" to="/privacy-policy">
                プライバシーポリシー
                <svg class="flex-shrink-0 w-4 h-4" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </router-link>
            </div>
            <!-- End Buttons -->

            <div class="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
            <span class="text-sm text-gray-600 dark:text-gray-400">公式Discordがお目当て？</span>
            <svg class="h-5 w-5 text-gray-300 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M6 13L10 3" stroke="currentColor" stroke-linecap="round"/>
            </svg>
            <router-link class="inline-flex items-center gap-x-1.5 text-sm text-rose-400 decoration-2 hover:underline font-medium" to="/discord">
                Discordへ参加する
                <svg class="flex-shrink-0 w-4 h-4" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </router-link>
            </div>
        </div>
    </div>

    <!-- Post List -->
    <section id="posts">
        <div class="flex flex-col items-center justify-center pt-24 mx-auto rounded-lg px-4 sm:px-6 lg:px-8 max-w-7xl">
            <PostList />
        </div>
    </section>

    

    <!-- 検索 -->
    <section>
        <div class="relative overflow-hidden">
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
                <div class="text-center">
                <h1 class="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200">
                    探す、みつける
                </h1>

                <p class="mt-3 text-gray-600 dark:text-gray-400">
                    カテゴリーやタイトル、本文などで検索できます
                </p>

                <div class="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                    <form action="/search" method="get">
                    <div class="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                        <div class="flex-[1_0_0%]">
                        <label for="q" class="block text-sm text-gray-700 font-medium dark:text-white"><span class="sr-only">検索する</span></label>
                        <input v-model="search_input" type="search" name="q" id="q" class="focus:outline-none py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-rose-500 focus:ring-rose-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="検索する">
                        </div>
                        <div class="flex-[0_0_auto]">
                        <router-link class="w-[46px] h-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" :to="'/search?q='+search_input">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </router-link>
                        </div>
                    </div>
                    </form>
                    
                    <div class="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                    <svg class="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                        <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                        <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                    </svg>
                    </div>
                    
                    <div class="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                    <svg class="w-40 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" stroke-width="7" stroke-linecap="round"/>
                    </svg>
                    </div>
                </div>

                <div class="mt-10 sm:mt-20">
                    <router-link v-for="( category, index ) in categories" :key="index" :to="'/category/'+category.id" class="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                    {{ category.name }}
                    </router-link>
                </div>
                </div>
            </div>
        </div>
    </section>
</template>