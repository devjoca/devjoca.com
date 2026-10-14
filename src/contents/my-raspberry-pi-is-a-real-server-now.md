---
author: Joca Pereyra
datetime: 2026-10-13T12:00:00Z
title: I stopped clicking around my Raspberry Pi
slug: my-raspberry-pi-is-a-real-server-now
featured: false
tags:
  - post
  - raspberry-pi
  - home-assistant
  - homelab
  - AI-Agents
draft: false
ogImage: "/images/blog/raspberry-pi/pikachu-pi-workbench.png"
description: My Pi only runs Home Assistant, so I turned it into an SSH-only server and let agents handle the boring parts. Things I used to put off for months took one day.
---

![Pikachu in safety goggles tweaking a Raspberry Pi while two small robot agents run SSH and inspect a Bluetooth bulb, with a Home Assistant dashboard in the background](/images/blog/raspberry-pi/pikachu-pi-workbench.png)

My Raspberry Pi 4 has one job. It runs Home Assistant in Docker. It still booted into a full desktop with Chromium, LibreOffice leftovers, and a printer service, because that's what the default image came with.

I always managed it the slow way. Plug in a monitor, click through menus, open a terminal, google a command, paste it, hope. Updating Home Assistant meant digging up the `docker run` flags I used the first time. Usually I just didn't do it.

This time I just enabled SSH on the Pi. From then on, the agent on my Mac could connect and run the commands itself. I decided what to do, and I stopped copying commands back and forth.

## The cleanup

I asked it to look at what was heavy before touching anything. In a couple of minutes it had the full picture. The systemd journal was 2.2GB. An old Home Assistant image was sitting in Docker taking 2.25GB. CUPS and Scratch were still installed.

It ran every purge as a dry run first, checked that Docker and HA weren't in the list, and then did the real thing:

- Disk went from 14GB used to 6.6GB.
- The journal is capped at 200MB, and Docker logs at 10MB × 3 files.
- The Pi boots to `multi-user.target` with no desktop.
- Bluetooth, audio, and ModemManager are off, and `gpu_mem=16` gives that memory back to the system.

RAM use went from about 1.5GB to 330MB. HA came back on its own after each reboot in a few seconds.

Doing this by hand, I would have needed an evening of reading forum posts. And I would have skipped the dry runs.

## Moving to the right OS

Next I wanted to update Home Assistant from 2026.8.2 to 2026.10.1. The pull failed. The agent checked and found that my card ran Raspbian 11 with a 32-bit userspace on a 64-bit kernel, and new HA images only ship for arm64. It got the update working with `--platform linux/arm64`, but that workaround would be needed for every future update.

I asked if it could convert the OS to 64-bit in place over SSH. It said no, because replacing every system library under a running Docker host can leave the Pi unable to boot. I liked that answer more than I expected.

So we did a clean migration:

1. The agent copied my HA config (17MB) to my Mac.
2. I flashed Raspberry Pi OS Lite 64-bit (Debian 13) onto a spare microSD with Raspberry Pi Imager, with SSH already turned on.
3. I swapped cards and plugged in Ethernet. The old card is my rollback.
4. The agent installed Docker, restored the config, pulled HA natively, and reapplied all the trims.

My part was the physical stuff: flashing the card, swapping it, and plugging in the cable.

The new system is Debian 13 arm64 with HA 2026.10.1, Ethernet only, and 384MB of RAM used after boot.

## When something broke, a second agent helped

My living room Hue bulb talks to HA over Bluetooth, and it stopped working after the move. We tried the usual things for a while. Then I started a clean agent (Droid with Opus 5.5) and gave it only the problem.

It found the cause quickly. The reflash wiped the Bluetooth pairing keys. BlueZ stores them in `/var/lib/bluetooth`, outside the HA config folder, so my backup didn't include them. We re-paired the bulb and it worked.

I wouldn't have figured that out by clicking around the HA UI. The error said "Device found but unable to connect", which tells you nothing. Add `/var/lib/bluetooth` to your backup if you ever migrate a Pi like this.

## The rest of the clicking, gone too

With the server fixed, I switched to Codex for the Home Assistant housekeeping, all the stuff I normally do by clicking through UIs:

- My Tuya diffuser showed up as a light. The agent found the hidden mist control, and now it's two separate controls.
- I described how we use the lights at home, and it built four manual presets: Trabajo, Descanso, Habitación roja, and Buenas noches.
- It exposed those presets to Apple Home and edited my existing Home scenes on my Mac to use them, so Siri still uses the same names.
- It installed a theme (Frosted Glass Lite), [Bubble Card](https://github.com/Clooos/Bubble-Card), and [Lucide icons](https://github.com/karlis-vagalis/hass-lucide-icons), so the dashboard doesn't look like an old Android app anymore.

Not everything went smoothly. The Home app on my Mac kept failing on one room picker, so I moved that accessory myself. But that was one click out of hundreds.

## The Govee backlight

The last thing was my Govee H6099 TV backlight. It matches the screen colors in Video mode, and I wanted HA to turn it on and off without breaking that.

HA's local Govee integration doesn't support the H6099. Codex checked the alternatives and went with Govee's official cloud API through HA's built-in REST controls. No MQTT, no extra container. It needs internet, but it only sends power commands, so the backlight stays in Video mode.

The API key was the slow part. I requested it in the Govee app and waited for it to arrive. Codex created a private file on my Mac for the key so I never had to paste it into the chat. Once I saved it, Codex set up the switch, tested it, and asked me to look at the TV and confirm the colors still matched. They did.

Now there's a TV backlight switch in the Living room controls, and Buenas noches turns it off with everything else. Thanks, Codex.

Then we made the backlight follow the TV. HA's LG integration needed me to accept a pairing prompt on the TV. The first attempts timed out because the Apple TV screensaver was on and I wasn't looking, lol. So Codex waited until I said "ready" with a menu on screen, sent the request, and I accepted it.

Now HA watches the TV's power. TV on, backlight on. TV off, backlight off a few seconds later. Menus, the screensaver, and paused movies don't count as off, so it stays on. Codex tested both directions before calling it done.

## What changed

I was driving the whole time. I decided what to clean, when to reflash, which theme to try, and how our lights should work. The agents took the boring parts, the stuff I had been avoiding for months. Reading logs, hunting for `docker run` flags, clicking through menus.

And I could run them in parallel. One agent was digging into the Bluetooth bulb while I kept going on something else. When one got stuck, I started a fresh one and gave it only the problem.

Debloating, a full OS migration, a Bluetooth bug, Apple Home, a new dashboard, and the Govee backlight all happened in one day. Every small win felt like a little dopamine hit, and there were a lot of them. It's awesome that we can work like this now :)
