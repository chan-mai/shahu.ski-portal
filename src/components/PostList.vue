<script setup lang="ts">
    import { ref, onMounted, defineProps } from 'vue';
    import { client } from '../main.js';
    import moment from 'moment';

    // props
    let props = defineProps({
        category_id: String,
        search_text: String,
    });

    // limitの設定
    let limit: number;
    if (navigator.userAgent.match(/Android.+Mobile|iPhone|iPod/i)) {
        limit = 10;
    } else {
        limit = 50;
    }

    // offsetの設定
    let page = ref(1);
    let maxPage = ref(1);
    let offset: number = (page.value - 1) * limit;

    // queries錬成
    let queries: any = {
            limit: limit,
            offset: offset,
            orders: '-createdAt',
        };
    // category_idがある場合
    if(props.category_id !== undefined){
        // filters: 'category[contains]'+props.category_id,を追加
        queries.filters = 'category[contains]'+props.category_id;
    }
    // search_textがある場合
    if(props.search_text !== undefined){
        // search_text: を追加
        queries.search_text = props.search_text;
    }

    //console.log(queries);

    let isLoaded = ref(false);
    let contents: any = ref([]);

    // mounted
    onMounted(() => {
        client.get({
            endpoint: 'contents',
            queries: queries
        })
        .then((res) => {
            // 順次contentsへpush
            res.contents.forEach((content: any) => {
                //console.log(content);
                //console.log(content["eyecatch"]);
                // content["eyecatch"]["url"]があるか
                if(!content["eyecatch"]){
                    // ["eyecatch"]["url"]を追加
                    content["eyecatch"] = {
                        url: ogImageUrlGenerate(content.title)
                    };
                }
                contents.value.push(content);
            });
            // totalCountからmaxPageを算出
            maxPage.value = Math.ceil(res.totalCount / limit);
            isLoaded.value = true;
        })
        .catch((err) => console.log(err));
    });

    function base64urlEncode(source: string){
        const textEncoder = new TextEncoder();
        const encodeString = (string: string | undefined) => textEncoder.encode(string);

        const decodeBinaryString = (uint8Array: any) => uint8Array.reduce(
            (binaryString: string, uint8: number) => binaryString + String.fromCharCode(uint8),
            '',
        );
        const uint8Array = encodeString(source);
        const binaryString = decodeBinaryString(uint8Array);
        const base64 = btoa(binaryString);

        return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }

    function ogImageUrlGenerate(title: string){
        const baseImageURL: string = 'https://images.microcms-assets.io/assets/08218e9018194c48a74b726b50d18abf/9b24459a33d74a58b2e132d3ee34b9e6/portal%20OG%E7%B4%A0%E6%9D%90.png/?blend-mode=normal&w=1200&mark-align=center%2Cmiddle&blend64=';
        let titleImageURL: string = 'https://images.microcms-assets.io/~text?txtsize=48&txt-x=43&txt-y=100&w=1100&h=590&txt-color=FFABBF&txt-align=left,middle&txtfont=Hiragino%20Sans%20W6&txt64='+base64urlEncode(title);

        const url = baseImageURL + base64urlEncode(titleImageURL);
        return url;
    }

    function timeFormat(date: string | undefined) {
        return moment(date).format('YYYY/MM/DD HH:mm');
    }

</script>
<template>
    <!-- Loading -->
    <div v-if="!isLoaded" class="min-h-[15rem] flex flex-col">
        <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
            <div class="flex justify-center">
            <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-rose-400 rounded-full dark:text-rose-500" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
            </div>
        </div>
    </div>
    <!-- Post List -->
    <div v-if="isLoaded">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            <div v-for="content in contents" :key="content.id">
                <router-link :to="'/content/doc/'+content.id">
                    <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                        <img v-if="content.eyecatch!==undefined" class="w-full h-auto rounded-t-xl" :src="content.eyecatch.url" :alt="content.title">
                        <img v-if="content.eyecatch===undefined" class="w-full h-auto rounded-t-xl" src="/noimage.png" :alt="content.title">
                        <div class="p-4 md:p-5">
                            <span v-for="category in content.category" :key="category.id">
                                <router-link :to="'/category/'+category.id" class="mr=1">
                                    <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-800/30 dark:text-rose-500">
                                        <span class="w-1.5 h-1.5 inline-block rounded-full bg-rose-800 dark:bg-rose-500"></span>
                                        {{ category.name }}
                                    </span>
                                </router-link>
                            </span>
                            <h3 class="mt-2 text-lg font-bold text-gray-800 dark:text-white">
                            {{ content.title }}
                            </h3>
                            <p class="mt-1 text-gray-500 dark:text-gray-400">
                            {{ timeFormat(content.createdAt) }}
                            </p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    <nav class="mb-10 flex items-center gap-x-1" v-if="maxPage!=0">
        <!-- Previous -->
        <button v-if="page==1" type="button" class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" disabled>
            <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>Previous</span>
        </button>
        
        <button v-if="page!=1" type="button" class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>Previous</span>
        </button>

        <!-- Page Number -->
        <div class="flex items-center gap-x-1">
            <button v-if="page!=1" type="button" class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">{{ page-1 }}</button>
            <button type="button" class="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-600 dark:text-white dark:focus:bg-gray-500" aria-current="page">{{ page }}</button>
            <button v-if="maxPage<page" type="button" class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">{{ page+1 }}</button>
        </div>

        <!-- Next -->
        <button v-if="maxPage<=page" type="button" class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" disabled>
            <span>Next</span>
            <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <button v-if="maxPage>page" type="button" class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
            <span>Next</span>
            <svg class="flex-shrink-0 w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
    </nav>
    <div v-if="maxPage==0" class="mb-10">
        <p class="text-center text-gray-500 dark:text-gray-400">一致する投稿が見つかりませんでした。</p>
    </div>
</template>(: string | undefined)(: any[] | Uint8Array)