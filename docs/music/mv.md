---
title: MV
---

# MV

大视频文件直接上传到 OSS 或 CDN，不进入 Git 仓库。

示例引用：

```html
<video controls preload="metadata" playsinline poster="https://assets.shellworkspace.cn/media/covers/song-001-cover.webp">
  <source src="https://assets.shellworkspace.cn/media/mv/song-001-master-4k60.mp4" type="video/mp4" />
</video>
```

当前本地已生成适合网页播放的 MP4：

```text
source/祝愿你能有个美好的未来-ABUxxinl-master-4k60.mp4
```

TODO: 上传资源到 OSS 后，把示例链接替换为真实对象路径。
