---
author: Ahmet Topal
pubDatetime: 2026-02-26T15:00:00.000Z
title: How a Lobster changed AI
slug: "how-a-lobster-changed-ai"
featured: false
tags:
  - ai
  - agents
  - openclaw
description: "AI Agents are changing everything. What they are, how they work, why OpenClaw blew up in 2026 and why you should still be careful."
---

AI is no longer just a text chat in your browser. What's happening right now is a shift that most people haven't even noticed yet. We're no longer talking about `"write me a text"` or `"summarize this for me"`. We're talking about Agents: Software that autonomously executes tasks on your computer, operates your browser, manages your files, sorts your emails. And yes, sometimes [deletes them too](#treat-the-agent-like-an-employee).

In this post I want to explain what AI Agents are, why [OpenClaw](https://openclaw.ai/) blew up this year, which players are in the game right now and why you should still use your brain despite all the excitement.

## What are AI Agents?

Most people think of ChatGPT when they hear AI:
You write a question, you get an answer.
Done. That's a chatbot.
An Agent is something different.

An AI Agent is a system that doesn't just respond, it acts _(or at least, it tries)_. It receives a goal, figures out a plan, executes steps, checks the results and corrects itself. The whole thing runs in a loop, the so-called **Agent Loop**. Think of an intern who gets a task: They read the assignment, think about it, execute something, check if it's right, and if not, they try again.

![OpenClaw Agent Loop](/assets/blog/2026/how-a-lobster-changed-ai/agent-loop.png)

At the core is Reasoning, the model's "thinking." Modern AI models like Claude, ChatGPT or Gemini have a so-called "Thinker" that reasons step by step before acting. But here's the crucial point that many people don't understand: **The model doesn't understand anything.** It's a probability machine. It calculates the most likely next word (token) based on its training. That works impressively well but it's not understanding in the human sense.

That's why [hallucinations](https://openai.com/index/why-language-models-hallucinate/) exist. The model sometimes invents things because they sound statistically plausible, not because they're true. When you let an Agent handle a task, it can happen that it makes decisions along the way that look logical but are completely wrong. Or it claims to have done something that it didn't.

Agents extend these models with Tools: file system access, browser control, API calls, shell commands. An Agent can also spawn Sub-Agents, smaller specialized Agents that handle subtasks while the main Agent keeps the big picture. And with Skills, Agents can learn new capabilities, similar to plugins.

## OpenClaw, the Gamechanger of 2026

There's one topic you can't escape this year: the Lobster. 🦞

[OpenClaw](https://openclaw.ai/) by [Peter Steinberger](https://x.com/steipete) became one of the fastest-growing open-source projects in history within just a few weeks. As of today: over **230k GitHub Stars**!

What made OpenClaw so special? It showed what an AI Agent can really do, visible and accessible to everyone. No abstract research paper, no enterprise demo behind a paywall. An open-source project that you can install on a Mac Mini, and that then autonomously accepts tasks via WhatsApp, Telegram, Slack or Discord.

OpenClaw is not a chatbot. It's a local gateway that runs on your machine and connects AI models (Claude, GPT, Gemini, Ollama) with your tools and services. It can:

- Manage emails
- Control your browser
- Create, edit, delete files
- Execute shell commands
- Control calendar, smart home and more
- Teach itself new skills

And most importantly: It has a [SOUL.md](https://soul.md), runs 24/7 and remembers everything in its memory. An Agent that accompanies you across all platforms instead of starting from zero every time.

Providers like [Cloudflare](https://blog.cloudflare.com/moltworker-self-hosted-ai-agent/), [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-run-openclaw) and [Hostinger](https://www.hostinger.com/de/vps/docker/openclaw) now offer one-click deployments. [ClawHub](https://clawhub.ai/), the skill marketplace, has over 11,000 skills.

The fact that Peter Steinberger has since [joined OpenAI](https://steipete.me/posts/2026/openclaw) and the project will be transferred to an independent foundation shows how seriously the industry takes this.

## The other Players

OpenClaw kicked off a wave, but the big players are moving too. Anthropic has built one of the most successful coding agents with [Claude Code](https://code.claude.com/docs) and just brought that same agentic framework to the desktop for everyone with [Cowork](https://claude.com/blog/cowork-research-preview). OpenAI is expanding [Codex](https://openai.com/codex/) from a coding agent into a full knowledge work platform. And just yesterday, Perplexity announced [Computer](https://www.perplexity.ai/hub/blog/introducing-perplexity-computer), a multi-agent system that orchestrates multiple AI models entirely in the cloud.

The direction is clear: AI is moving from `"I'm chatting with a bot"` to `"I have a digital coworker."`

## The Risks

With all the excitement, I also have to show the other side from an engineering perspective. Because the risks are real!

### Your local machine

OpenClaw and similar agents run with the same permissions as your user account. Everything you can do, the agent can do too. Delete files, send emails, write messages, install software. One mistake in reasoning or a prompt injection (hidden instructions on a website or in an email that trick the agent into doing something else), and your system is compromised.

### VPS without know-how

Many people deploy OpenClaw on a VPS and make the gateway publicly accessible without authentication, without a firewall. Security researchers have found over [30,000 publicly accessible instances](https://www.bitsight.com/blog/openclaw-ai-security-risks-exposed-instances), many with plaintext API keys. On ClawHub, [hundreds of malicious skills](https://blog.virustotal.com/2026/02/from-automation-to-infection-how.html) were identified that distribute infostealers and malware.

If you don't know what you're doing, a publicly accessible agent with access to your file system and accounts is an open door for any attacker.

### Tokens and costs

Agents burn through tokens fast. Every reasoning step, every tool call, every loop iteration costs tokens. Depending on your model and provider, that adds up quickly. Before you let an agent run 24/7, make sure you understand what that means for your bill.

### Treat the Agent like an employee

My most important advice: **Never give the agent your own credentials.** Treat it like a new employee on their first day. You give them their own accounts, their own API keys, their own email address, restricted permissions. That way you can work collaboratively without a single mistake destroying everything.

Because that's exactly what happened just a few days ago: [Summer Yue](https://x.com/summeryue0), Director of Alignment at Meta Superintelligence Labs (yes, the person responsible for making sure AI works safely!), gave OpenClaw access to her real inbox. The agent was only supposed to suggest what could be archived or deleted and then speedran [deleting her entire inbox](https://x.com/summeryue0/status/2025774069124399363). She couldn't [stop](https://x.com/openclaw/status/2026503611514069173) it from her phone.

> Rookie mistake tbh. Turns out alignment researchers aren’t immune to misalignment. - Summer Yue

Almost 10 million views. And here's the takeaway: **You should think twice before giving an agent full control.** The tech is brilliant, but still too fresh for blind trust. Context windows have limits, instructions get lost during long sessions, and an agent that no longer knows it should ask before acting just acts.

## Conclusion

I'm grateful to OpenClaw and Peter Steinberger. Not just for the tool itself, but for the inspiration. OpenClaw showed the entire AI industry what's possible when you take agents out of abstract research papers and put them into real hands. The big players, Anthropic with Code & Cowork, OpenAI with Codex, Perplexity with Computer, are turning their models into real agents. The future isn't chat, it's execution.

And it's not just the big companies. There's ZeroClaw, IronClaw, PicoClaw, NanoClaw and dozens of other projects inspired by this wave. The open-source community is proving right now that you don't need a billion-dollar company to build a personal AI assistant.

I'm also playing around with my own agent setup, trying to shape something that fits my workflow instead of adapting to a one-size-fits-all tool.

Let's see where it goes.

Let me know what you think on [X](https://x.com/ahmettopal).
