# MeiTuan007 升级计划：React 19 + TypeScript + SCSS + Vite + Jotai

> 目标：练手 + 温习 React + 系统学习 Jotai。
> 原则：先 MVP 跑通、小步提交、每阶段都能 `npm run dev` 看到页面。不追求一次到位。

---

## 1. 现状盘点

| 项 | 现状 |
|---|---|
| 构建 | Vite 3 + `@vitejs/plugin-react` 2（太旧） |
| 语言 | 纯 JS / JSX，约 2354 行 JSX + 2963 行 `style.js` |
| React | 18.2，**全部函数组件**（无 class 组件），已用 Hooks |
| 状态 | Redux + redux-thunk + redux-persist；6 个 reducer（cities / home / search / goods / comment / business），6 个组件用 `connect()`，0 处 `useSelector` |
| 样式 | styled-components，24 个文件（`style.js`），另有 `reset.css`、iconfont |
| 路由 | react-router-dom 6，`lazy` + `Suspense`，二级路由 `/homedetail/:id/*` |
| 请求 | axios 0.27，直连 fastmock URL；`src/api/config.js` 的拦截器引用了未定义的 `localToken` |
| UI 库 | antd-mobile 5、weui、swiper 4、better-scroll、react-transition-group |
| 后端 | `MeiTuan-api/`（Express + Mongoose + passport-jwt，Mongo 连接被注释）—— **本次不动** |

### 已发现的坏味道（升级时顺手修，也是很好的练习点）

1. **reducer 直接 mutate state**：`HomeOrder/store/reducer.js` 里 `state.SingleCart.push()`、`item.praise_num++`，是购物车最大的 bug 源（README 里「需要先清空一下购物车」就是它）。
2. **用 DOM API 操作样式**：`classList.add/remove`、`querySelector('.w')`、`menuBgChange`、`isFixed`、`backGroundColor`、手写 `lazyload`/`throttle` —— 应改为 state / ref / `IntersectionObserver`。
3. **`SafeRouter` 是 Router v5 写法**，在 v6 下根本不可用；`App.tsx` 里的登录重定向放在 `useEffect`，会闪屏。
4. **登录是假的**：`Login` 里直接 `setCookie('usertoken','token')`，没等接口返回。
5. **垃圾依赖**：`loadsh`（拼写错误的包）、`react-route`、`react-thunk`、`react-weui`、`font-awesome` 4、把 `vite`、`@types/*`、`gh-pages` 放进了 `dependencies`。
6. `vite.config.js` 里 `open: true` 写在了 `defineConfig` 外层（无效），`changOrigin` 拼写错误。
7. `index.html` 用 `/public/js/adapter.js`（rem 适配）—— 应改为模块引入或 `postcss-px-to-rem` / `vw`。
8. `package.json` 里 `README` 写的技术栈与现状已不一致。

---

## 2. 目标技术栈

> ⚠️ 版本号为 2026-10-06 `npm view` 查到的最新稳定版，**动手前再跑一次 `npm view <pkg> version` 核对**，不要盲目照抄。

| 类别 | 选型 | 备注 |
|---|---|---|
| React | `react` / `react-dom` **19.x**（最新稳定） | 学习点：`ref` 作为 prop、`use()`、Actions、`useActionState`、`useOptimistic`、`<title>` 原生支持 |
| 构建 | **Vite 8** + `@vitejs/plugin-react` | 要求 Node ≥ 20.19，本机 Node 24 OK |
| 语言 | **TypeScript 6.0**（strict） | TS 7 与 typescript-eslint 暂不兼容，已退回 6.0 |
| 样式 | **SCSS + CSS Modules**（`*.module.scss`） | 去掉 styled-components；全局 token 放 `styles/_variables.scss` |
| 状态 | **Jotai** | 学习重点，见第 4 节 |
| 路由 | `react-router`（v7，declarative 模式） | v7 起统一从 `react-router` 引入，`react-router-dom` 仅作兼容 |
| 请求 | axios（最新）+ 封装 | 可选：`jotai-tanstack-query` 作为进阶 |
| 滚动 | better-scroll（保留）+ 类型包装 | |
| 轮播 | `swiper`（最新，用 React 组件 `swiper/react`） | 替换旧的命令式 Swiper 4 |
| UI | 保留 `antd-mobile`；移除 `weui` / `react-weui` | |
| 规范 | ESLint flat config + `typescript-eslint` + `eslint-plugin-react-hooks` + Prettier | |
| 测试 | Vitest + Testing Library（只测 atoms 与购物车逻辑） | 最小集即可 |

---

## 3. 分阶段计划

每个阶段 = 一个 `feat/` 分支或一组独立 commit，完成后可运行、可回退。

### 阶段 0：准备（0.5h）
- [x] 新建分支 `feat/upgrade-react19-ts-jotai`
- [x] `npm run build` 记录旧版本基线（能否构建、产物大小），旧页面截图留档
- [x] 删除垃圾依赖：`loadsh`、`react-route`、`react-thunk`、`react-weui`、`weui`
- [x] 把 `vite`、`@types/*`、`gh-pages` 移到 `devDependencies`

### 阶段 1：工具链升级 — Vite + TS + SCSS（2h）
- [x] 升级 `vite`、`@vitejs/plugin-react`，安装 `typescript`、`sass`
- [x] 新增 `tsconfig.json`（`strict: true`，临时 `noImplicitAny: false`、`paths: {"@/*": ["src/*"]}`）、`tsconfig.node.json`
- [x] `vite.config.js` → `vite.config.ts`，修正 `changeOrigin`、`open` 位置，别名保持 `@`
- [x] `index.html` 入口改 `/src/main.tsx`；`public/js/adapter.js` 改写为 `src/utils/rem.ts` 并在 `main.tsx` 引入
- [x] 补 `typecheck` 脚本；⏭ ESLint + Prettier 推迟（TS 7 与 eslint 生态需先确认兼容，放到阶段 3 前处理）
- [x] 文件批量改名：`.jsx → .tsx`、`.js → .ts`，先允许 `any` 标注 `// TODO(ts)`，**阶段 3 再收紧**
- 验收：`npm run dev` 能起、`npm run typecheck` 能跑（允许临时报错数在下降）

**阶段 0/1 实际结果（2026-10-06）**
- 基线：旧版原样**无法构建**（`search-box` 误引 `@/api/utils`，已修为 `@/utils`）；修后旧版 dist 2.2M，主 chunk 434 KiB / gzip 132 KiB。
- 新版：`vite build` 通过，dist 2.0M，主 chunk 359 KiB / gzip 104 KiB。
- `npm run typecheck` 现有 109 个错误（TS2339 居多），均为未补类型所致，阶段 3 清零。
- TS 7 已移除 `baseUrl`，`paths` 改为 `./src/*`；Vite 8 的 lightningcss 不接受 `*zoom` 等 IE hack，已从 `reset.css` 删除。
- redux-persist 的 `storage/session` 在 Vite 8 下 CJS 互操作失败，临时改为手写 sessionStorage 适配（阶段 5 随 redux 一并删除）。
- 浏览器验证：登录重定向、`/home` 渲染正常、无控制台报错；餐厅列表为空，原因是 fastmock 接口（见风险表）。

### 阶段 2：React 19 + Router 7（1.5h）
- [x] `react` / `react-dom` / `@types/react*` 升到 19；清理 `React.FC` 与 `import React`（新 JSX transform 不需要）
- [x] `forwardRef`（`Scroll` 组件）改为 `ref` 作为普通 prop
- [x] 去掉 `prop-types`，改 TS interface（符合个人规范：组件必须有 Props 类型）
- [x] 路由迁到 `react-router`（实际装到 v8.4，API 与 v7 一致）；`main.tsx` 的 `Provider` / `PersistGate` 暂时保留（Jotai 迁完再删）
- [x] 重写鉴权：`SafeRouter` → `RequireAuth` 布局路由（`<Navigate replace>` + `<Outlet/>`），删掉 `App` 里 `useEffect` 重定向
- 学习点：React 19 变更清单（`use`、Actions、ref prop、Context 作为 Provider）

**阶段 2 实际结果（2026-10-06）**
- 版本：react / react-dom 19.3、react-router 8.4、antd-mobile 5.43（旧版 5.18 不支持 React 19，必须升）、styled-components 6.5、react-redux 9、redux 5、redux-thunk 3（`import { thunk }` 改为具名导出）。已移除 `react-router-dom`、`prop-types`、`@reduxjs/toolkit`（未使用）。
- 所有 `import React` / `React.memo` 清理为具名导入；`.js` 后缀导入清理。
- `Scroll`：`forwardRef` → `ref` prop，补 `ScrollHandle` / Props 类型；**`defaultProps` 在 React 19 对函数组件已失效**，改为参数默认值；卸载时补 `scroll.destroy()`（旧版有泄漏）。
- **踩坑**：`react-transition-group` 内部用了 React 19 已删除的 `findDOMNode`，Search 页整页白屏；给 `CSSTransition` 加 `nodeRef` 修复。
- 鉴权：`SafeRouter` 删除，新增 `RequireAuth` 布局路由；`App` 里的 `useEffect` 重定向删除；`/homedetail/:id` 增加 index → `order` 重定向，子路由改相对路径。
- 浏览器验证：未登录访问 `/mine` 跳 `/login`；登录态下 `/`→`/home`、`/homedetail/1`→`/order`、`/search`、`/mine` 渲染正常；仅剩 fastmock 404 的 AxiosError（Cities 页因此为空）。
- 构建：主 chunk 437 KiB / gzip 127 KiB（比阶段 1 大，因 antd-mobile 升级；阶段 4/5 删除 styled/redux 后再对比）。
- `npm run typecheck` 当前 84 个错误（阶段 3 处理）。

### 阶段 3：TypeScript 类型补全（2h）
**分工：架子由 Claude 搭好（下面标 ✅），具体类型修复和写法升级由 Ever 完成，Claude 负责 review。**
- [x] ✅ 数据建模，放 `src/types/`：`Restaurant`、`Banner`、`City`、`GoodsCategory/Spu`、`RatingData`、`Seller`、`LoginPayload`、`ApiResponse<T>`（带 `TODO(ts)` 的字段按需补）
- [x] ✅ `src/api/` 重组：`http.ts`（axios 实例 + 拦截器 + `get/post`）、`endpoints.ts`（mock/真实地址表 + `VITE_USE_MOCK` 开关）、`modules/{home,detail,user}.ts`（带类型的 `fetchXxx`）、`request.ts`（**旧 redux 用的兼容层**，阶段 5 删除）
- [x] ✅ mock 数据脱离 fastmock：`public/data/` 补全 `cities.json`、`banners.json`；删除重复的 `src/assets/data/`
- [x] ✅ 环境变量：`.env.development` / `.env.production` / `.env.example`，`vite-env.d.ts` 里有类型声明
- [x] ✅ ESLint（flat config + typescript-eslint + react-hooks）+ Prettier，脚本 `lint` / `format`
- [ ] 🧑 Ever：把页面里的 `props`、`useState`、事件参数补上类型，改用 `@/api` 的 `fetchXxx`（旧 `request.ts` 不再被引用后即可删）
- [ ] 🧑 Ever：删除 tsconfig 里的 `"noImplicitAny": false`，清零 `npm run typecheck`
- [ ] 🧑 Ever：清零 `npm run lint` 的 error（`prefer-const`、`no-unused-vars` 可 `eslint --fix` 部分自动修）
- [ ] 🧑 Ever：`Login` / `Register` 改用 `@/api` 的 `login` / `register`，并补响应类型
- 验收：`npm run typecheck` 0 错误，`npm run lint` 0 error

**阶段 3 架子的决策记录**
- **TypeScript 从 7.0 退回 6.0.3**：`typescript-eslint` 的 peer 要求 `typescript <6.1`，TS 7（原生版）没有稳定的 JS API，装不上。等 typescript-eslint 支持 TS 7 后再升（风险表里已预判）。
- mock 开关：`VITE_USE_MOCK=true` 读 `${BASE_URL}data/*.json`（兼容 GitHub Pages 的 `/MeiTuan007/` 前缀）；`false` 走 `VITE_API_BASE_URL`。
- 响应形态保持与旧数据一致：restaurants/banners/cities 是裸数组；goods/ratings/seller 是 `{code,msg,data}`。
- 已知旧 bug（未改）：`HomeDetail` 在 `useEffect` 里无条件 `navigate('/homedetail/:id/order')`，导致直接访问 `/comment`、`/business` 会被弹回点餐页。

### 阶段 4：styled-components → SCSS Modules（4~5h，量最大）
- [ ] 建 `src/styles/`：`_variables.scss`（颜色、字号、rem 函数）、`_mixins.scss`、`global.scss`（吃掉 `reset.css`）
- [ ] 逐模块迁移：`style.js` → `index.module.scss`，`Wrapper` 组件 → 根节点 `className={styles.wrapper}`
- [ ] styled 里的 `${props => ...}` 动态样式改成 `classnames` 条件类或 CSS 变量
- [ ] 迁移顺序（由简到繁）：`Footer` → `Header` → `Login/Register` → `Cities` → `Home/*` → `HomeDetail/*`
- [ ] 全部完成后卸载 `styled-components`
- 学习点：CSS Modules 的 `camelCase` 约定（`vite.config` 已有配置）、SCSS 嵌套/变量/mixin、`:global` 的使用场景

### 阶段 5：Redux → Jotai（5~6h，**核心**）
详见第 4 节的 atom 设计。迁移顺序（风险由低到高）：

1. [ ] 安装 `jotai`（+ `jotai/utils`），`main.tsx` 加 `<Provider>` 可选（默认 store 也行，学习阶段建议显式用 `createStore` 做一次对比）
2. [ ] `search` 模块（仅一个 `enterLoading` 布尔）→ 第一个原始 atom
3. [ ] `cities` → 异步只读 atom
4. [ ] `home`（banners + restaurants + loading）→ 异步 atom + `loadable`/`unwrap`
5. [ ] `comment`、`business`（HomeDetail 二级页）→ 同上，加 `atomFamily`（按商家 id）
6. [ ] `goods`（HomeOrder 购物车）→ **重写**：派生 atom + `atomWithStorage` 持久化，顺手修掉 mutate bug
7. [ ] 登录态 → `atomWithStorage`（cookie 兼容层或直接迁 localStorage）
8. [ ] 删除 `src/store/`、各 `pages/*/store/`，卸载 `redux`、`react-redux`、`redux-thunk`、`redux-persist`、`@reduxjs/toolkit`

### 阶段 6：去 DOM 操作 + 组件质量（3h）
- [ ] `isFixed` / `backGroundColor` / `menuBgChange` / `lazyload` / `throttle` / `isPathPartlyExisted`（`src/utils/index.js`）→ 自定义 Hook，放 `src/hooks/`：
  - `useSticky(ref)`（吸顶）、`useTimeTheme()`（按时间变背景）、`useScrollTop()`、`useInView`（`IntersectionObserver` 图片懒加载）
- [ ] `Home` 里的 `document.querySelector('.w').classList...` 全部改为 state 驱动
- [ ] `Scroll`（better-scroll 封装）：保留，用 `useEffect` 清理 `destroy()`，补类型
- [x] `SetMeal`：Swiper 4 命令式 → `swiper/react`（提前在阶段 2 后完成，随 swiper 升到 14）
- [ ] `Search` 的 `react-transition-group` 保留或换 CSS 过渡
- [ ] Login 表单改用 `useActionState`（React 19 Actions）+ 真正等待接口返回
- [ ] 写 `utils/storage` 对应 TS 版本；常量 `Cookie.Token: 'dptoken'` 与实际 `'usertoken'` 不一致，统一

### 阶段 7：验证 & 收尾（1.5h）
- [ ] 手动走查清单：首页 → 选城市 → 进商家 → 加购/减购/清空 → 刷新（购物车仍在）→ 评价筛选 → 商家详情 → 登录/注册 → 退出
- [ ] Vitest：购物车 atoms（加、减、清空、总价、总数）单测
- [ ] `npm run build` 对比阶段 0 基线产物大小；检查 `base: '/MeiTuan007/'` 与 gh-pages 部署
- [ ] 更新 `README.md`（英文，技术栈与已实现功能）

**预估总工时：约 19~22 小时**，按每晚 1.5~2h 约 2 周。

---

## 4. Jotai 学习路线与 atom 设计

### 4.1 概念 ↔ 本项目场景对照（边做边学）

| Jotai 概念 | 在本项目里练 | 阶段 |
|---|---|---|
| 原始 atom `atom(0)`、`useAtom` / `useAtomValue` / `useSetAtom` | `search.enterLoading`、弹窗 `visible` | 5.2 |
| 只读派生 atom `atom(get => ...)` | 购物车总价、总件数、每个分类的角标数 | 5.6 |
| 可写派生 atom `atom(get, set)` | `addToCartAtom` / `reduceFromCartAtom` / `clearCartAtom`（取代 reducer 的 action） | 5.6 |
| 异步 atom（`atom(async () => ...)`）+ `Suspense` | cities、banners、restaurants | 5.3~5.4 |
| `loadable` / `unwrap` | 首页要显示 loading 骨架而不是整页 Suspense | 5.4 |
| `atomFamily` | 按商家 `id` 缓存评价/商家详情 | 5.5 |
| `atomWithStorage` | 购物车持久化（取代 redux-persist）、登录态 | 5.6~5.7 |
| `atomWithReset` / `RESET` | 清空购物车 | 5.6 |
| `selectAtom` / `splitAtom` | 商品列表按条目拆分，减少重渲染 | 5.6 进阶 |
| `createStore` / `Provider` / 在 React 外读写 | axios 拦截器读 token（`store.get(tokenAtom)`） | 5.7 / 3 |
| `jotai-devtools` | 调试 atom 变化 | 全程 |
| `jotai-tanstack-query`（可选） | 用 `atomWithQuery` 重写 restaurants，对比手写异步 atom | 进阶 |

### 4.2 目录约定

```
src/
├── atoms/
│   ├── auth.ts        # tokenAtom（atomWithStorage）、isLoggedInAtom
│   ├── cities.ts      # citiesAtom（异步）
│   ├── home.ts        # bannersAtom、restaurantsAtom
│   ├── business.ts    # businessFamily(id)
│   ├── comment.ts     # commentFamily(id)、commentFilterAtom
│   ├── cart.ts        # ★ 购物车（见下）
│   └── index.ts
```

规则：一个领域一个文件；atom 名以 `Atom` 结尾；写操作用「可写派生 atom」封装，组件里不直接拼复杂 `set` 逻辑。

### 4.3 购物车重新设计（解决 mutate bug 的关键）

旧：在商品数据里塞 `praise_num` 并 mutate。
新：**商品数据只读，购物车只存 `{ [spuId]: count }`**。

```ts
// atoms/cart.ts —— 示意代码，实现时再细化
import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'

// sessionStorage 持久化，等价于原 redux-persist 的 storageSession
const storage = createJSONStorage<Record<number, number>>(() => sessionStorage)
export const cartCountsAtom = atomWithStorage<Record<number, number>>('cart', {}, storage)

// 商品目录（只读，异步）
export const goodsAtom = atom<Promise<GoodsCategory[]>>(() => getGoods())

// 派生：购物车条目（含商品信息）、总数、总价
export const cartItemsAtom = atom(async (get) => { /* 合并 goods + counts */ })
export const cartTotalCountAtom = atom((get) => Object.values(get(cartCountsAtom)).reduce((a, b) => a + b, 0))

// 写：加 / 减 / 清空
export const addToCartAtom = atom(null, (get, set, id: number) => {
  set(cartCountsAtom, (prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
})
export const reduceFromCartAtom = atom(null, (get, set, id: number) => { /* 减到 0 删除 key */ })
export const clearCartAtom = atom(null, (_get, set) => set(cartCountsAtom, {}))
```

> 注：「热销」分类里的商品与其他分类重复（旧 `cartNumber` 里有 `麦乐鸡5块` 的特判），用 `spuId` 做 key 后天然去重，特判可以删。

### 4.4 Redux → Jotai 对照速查

| Redux | Jotai |
|---|---|
| `createStore` + `combineReducers` | 无需；atom 自己就是状态单元 |
| `connect(mapState, mapDispatch)` | `useAtomValue` / `useSetAtom` |
| `actionCreators` + `redux-thunk` | 异步 atom 或可写派生 atom |
| `constants.js` | 删除 |
| `redux-persist` | `atomWithStorage` |
| `Provider store` | `Provider`（可选） |
| `PersistGate` | 不需要（`atomWithStorage` 同步读取，可设 `getOnInit: true`） |

---

## 5. 风险与应对

| 风险 | 应对 |
|---|---|
| fastmock 接口失效（第三方 mock 平台，随时可能下线） | 阶段 3 把数据放 `public/data/*.json` 兜底（项目已有该目录），`api/` 层加开关，或用 MSW |
| 最新版本 TS 7 / Vite 8 与插件兼容问题 | 出现问题先退回上一个大版本，**不要在工具链上耗时间**，目标是学 Jotai |
| `antd-mobile` 5 对 React 19 的兼容 | 升级后若有警告，升到最新小版本；仍有问题再决定替换 |
| styled → SCSS 工作量大 | 机械化，按页面拆分；每迁一页就看一眼，不批量改完才验证 |
| 一次改太多难以定位 | 每阶段独立 commit（Conventional Commits，英文），出问题可 `git bisect` |

---

## 6. 范围外（本次不做）

- `MeiTuan-api` 后端改造（Express + Mongo + JWT）—— 以后单独做，可作为 Go 后端重写的对照
- 订单页、我的页、搜索数据（README 里标注的未实现功能）—— 升级完成后作为 Jotai 的新增练习
- SSR / Next.js

## 7. 完成定义（DoD）

- [ ] `npm run typecheck`、`npm run lint`、`npm run build`、`npm test` 全部通过
- [ ] 项目中不再有 `redux*`、`styled-components`、`prop-types`、`weui` 依赖
- [ ] 所有组件有 Props 类型，无 `any`
- [ ] 购物车刷新后保留，加减/清空/总价正确，无 mutate
- [ ] 可部署到 gh-pages，行为与旧版一致或更好
