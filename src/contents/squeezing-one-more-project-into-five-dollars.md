---
author: Joca Pereyra
datetime: 2026-10-03T12:00:00Z
title: Squeezing one more project into $5
slug: squeezing-one-more-project-into-five-dollars
featured: false
tags:
  - post
  - go
  - side-projects
draft: false
ogImage: "/images/blog/cotizalupa/go-gopher-hosting-box.png"
description: Why I moved CotizaLupa's backend to Go before launch, mostly to make room on my $5 Railway plan.
---

![A Go gopher squeezing one more tiny app into a hosting box, with a bill beside it](/images/blog/cotizalupa/go-gopher-hosting-box.png)

CotizaLupa started with TanStack Start and TypeScript. Before launching it, I found myself doing the least exciting side-project math: Railway charges for RAM and CPU, and I'm trying to keep my Railway usage within the $5 included in the Hobby plan. I wanted to squeeze one more project in there, lol.

So I moved the backend to Go while CotizaLupa was still an MVP. I've played with Go and used it at work, but this will be my first personal Go project built and deployed from scratch. It feels approachable to me. Rust feels like a bigger jump right now, and I wanted a small memory footprint without making the project harder to finish.

Having two AI subscriptions made the switch easier to attempt. A stack change used to feel like the sort of thing I'd postpone. This time, with the project still small, it felt manageable enough to try.

The Go server used about 4 MiB at idle locally and 23 MiB after an upload. Those are early local measurements, not production benchmarks. I didn't measure the old server, so I can't say how much this changes the bill. For now, I'm just hoping it leaves room for one more little project on that $5 plan.
