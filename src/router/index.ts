import { createRouter, createWebHistory } from "vue-router";
import IStaticMethods from "preline/preline";
import Index from "../pages/Index.vue";
import MoreInfo from "../pages/MoreInfo.vue";
import Donate from "../pages/Donate.vue";
import Faq from "../pages/FAQ.vue";
import Contact from "../pages/Contact.vue";
import Search from "../pages/Search.vue";
import Content from "../pages/Content.vue";
import Category from "../pages/Category.vue";

import NotFound from "../pages/NotFound.vue";

const DEFAULT_TITLE = 'しゃふすきーポータル'

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export const routes: any = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/more-info",
    name: "MoreInfo",
    component: MoreInfo,
    meta: { title: DEFAULT_TITLE+' | もっと！' }
  },
  {
    path: "/donate",
    name: "Donate",
    component: Donate,
    meta: { title: DEFAULT_TITLE+' | 支援' }
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: { title: DEFAULT_TITLE+' | お問い合わせ' }
  },
  {
    path: "/faq",
    name: "FaQ",
    component: Faq,
    meta: { title: DEFAULT_TITLE+' | FAQ' }
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: { title: DEFAULT_TITLE+' | 検索' }
  },
  {
    path: "/content/doc/:content_id",
    name: "Content",
    component: Content,
    props: true,
  },
  {
    path: "/category/:category_id",
    name: "Category",
    component: Category,
    props: true,
  },
  // 利用規約
  {
    path: "/terms",
    name: "Terms",
    redirect: "/content/doc/5qs4tuy9kh-p",
    meta: { title: DEFAULT_TITLE+' | 利用規約' }
  },
  // プライバシーポリシー
  {
    path: "/privacy-policy",
    name: "Privacy Policy",
    redirect: "/content/doc/tmynent2by4",
    meta: { title: DEFAULT_TITLE+' | プライバシーポリシー' }
  },
  // 公式discord
  {
    path: "/discord",
    name: "Discord",
    beforeEnter() {
      window.location.assign("https://discord.gg/pH2CYJQW7v");
    },
    meta: { title: DEFAULT_TITLE+' | 公式discord' }
  },
  // ブランディング・ガイドライン
  {
    path: "/assets",
    name: "Assets",
    redirect: "/content/doc/9fh_9uyaw9j",
    meta: { title: DEFAULT_TITLE+' | ブランディング・ガイドライン' }
  },
  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { title: DEFAULT_TITLE+' | 404' }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to: any) => {
  document.title = (to.meta.title as string) || DEFAULT_TITLE
  setTimeout(() => {
    window.HSStaticMethods.autoInit();
  }, 100)
})

export default router;