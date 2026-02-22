---
author: Ahmet Topal
pubDatetime: 2026-02-22T00:00:00.000Z
title: Project management in Terminal (Mac, Bash)
slug: "project-management-in-terminal"
featured: false
tags:
  - bash
  - terminal
description: "How I organize and jump between project paths in my terminal on mac"
---

As a developer I have a lot of projects on my mac in different locations. I never had a single `~/projects/` folder because I like to keep branding files, docs and marketing stuff together in one directory per project.

## Why not zoxide or z?

I looked at [zoxide](https://github.com/ajeetdsouza/zoxide) and [autojump](https://github.com/wting/autojump) but they all track your cd history and use [frecency](https://en.wikipedia.org/wiki/Frecency) to guess where you want to go. That doesn't fit my workflow. I want to explicitly say `"this project is called X and it lives here"` without any magic. So I wrote my own thing.

## How I manage my project paths

Generally I am using [ForkLift](https://binarynights.com/) instead of the default Mac Finder. I love the Sidebar and being able to add groups and folders, rename them without renaming the actual project folder.

It has an integrated **open in Terminal** button where you can select your desired Terminal (mine is currently [Ghostty](https://ghostty.org/)) which is nice, but I needed something faster.

Yeah I am **still using bash** instead of zsh, so I wrote a small shell script in my `~/.bash_profile`:

```bash
# proj manager
export PROJ_DB="$HOME/.proj_paths"

proj__init_db() {
  [ -f "$PROJ_DB" ] || : > "$PROJ_DB"
}

proj_new() {
  proj__init_db
  local name="$1"
  local path="$2"

  if [ -z "$name" ] || [ -z "$path" ]; then
    echo "Usage: proj_new <name> <path>"
    return 1
  fi

  # ~ expand
  case "$path" in
    "~") path="$HOME" ;;
    "~/"*) path="$HOME/${path#~/}" ;;
  esac

  # normalize to absolute
  if [ ! -d "$path" ]; then
    echo "Path not found: $path"
    return 1
  fi
  path="$(cd "$path" && pwd)"

  # forbid '=' in name (simplifies parsing)
  case "$name" in
    *"="*) echo "Project name cannot contain '='"; return 1 ;;
  esac

  # remove old entry, append new
  grep -v -E "^${name}=" "$PROJ_DB" > "${PROJ_DB}.tmp" 2>/dev/null || true
  mv "${PROJ_DB}.tmp" "$PROJ_DB"
  printf "%s=%s\n" "$name" "$path" >> "$PROJ_DB"

  echo "Saved: $name -> $path"
}

proj() {
  proj__init_db
  local name="$1"
  if [ -z "$name" ]; then
    echo "Usage: proj <name>"
    echo "Try: proj_list"
    return 1
  fi

  local line path
  line="$(grep -E "^${name}=" "$PROJ_DB" | tail -n 1)"
  path="${line#*=}"

  if [ -z "$path" ] || [ "$path" = "$line" ]; then
    echo "Unknown project: $name"
    echo "Try: proj_list"
    return 1
  fi

  if [ ! -d "$path" ]; then
    echo "Project path no longer exists: $path"
    echo "Fix with: proj_new $name <new-path>  OR  remove with: proj_finish $name"
    return 1
  fi

  cd "$path" || return 1
}

proj_finish() {
  proj__init_db
  local name="$1"
  if [ -z "$name" ]; then
    echo "Usage: proj_finish <name>"
    return 1
  fi

  if grep -q -E "^${name}=" "$PROJ_DB"; then
    grep -v -E "^${name}=" "$PROJ_DB" > "${PROJ_DB}.tmp"
    mv "${PROJ_DB}.tmp" "$PROJ_DB"
    echo "Removed: $name"
  else
    echo "Not found: $name"
  fi
}

proj_list() {
  proj__init_db
  if [ ! -s "$PROJ_DB" ]; then
    echo "No projects saved."
    return 0
  fi
  cat "$PROJ_DB"
}
```

Working in every Terminal after setting up once:

```bash
# add new project named blog in current dir
proj_new blog .
# add new project named blog with path ~/Documents/Blog/live/
proj_new blog ~/Documents/Blog/live/
# cd to project blog
proj blog
# list all projects and their paths
proj_list
# removes project blog from list
proj_finish blog
```

### Aliases

I added following aliases below the script for shorter use _(you can also change the function name, I was a bit too lazy)_

```bash
alias p='proj'
alias p_new='proj_new'
alias p_add='proj_new'
alias p_list='proj_list'
alias p_finish='proj_finish'
```

and the aliases (feel free to overwrite them):

```bash
# aliases for proj_new
p_new blog .
p_add blog .
# alias for proj
p blog
# alias for proj_list
p_list
# alias for proj_finish
p_finish blog
```

### Preview

![ghostty](/assets/blog/2026/project-management-in-terminal/ghostty.gif)

and yeah I love it!

> PS: Don't forget to restart your terminal or run `source ~/.bash_profile` once after adding the script. You can also ask AI to rewrite it in zsh if you need that.

Maybe there are better approaches out there. Let me know on [X](https://x.com/ahmettopal) what you think about it or if you have a better solution.
