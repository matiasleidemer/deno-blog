---
title: Easy Copying File's Path Using Vim
publish_date: 2017-02-22
description: Sometimes I need to copy the current file's relative path to the main register (Cmd+C). Luckily Vim has a nice command that returns it.
---

Sometimes I need to copy the current file's relative path to the main register
(Cmd+C). Luckily Vim has a nice command that returns it:

```vim
expand("%")
" => current_project/path/to/file.rb
```

It also has a command that returns the current line your cursor is at:
`line(".")`, and of course you can use both commands at the same time:

```vim
" use . to concatenate things
expand("%") . ":" . line(".")
" => current_project/path/to/file.rb:42
```

Alright, cool, that helps, but now what?

Now you can add that output to your main register (in OSX), which can be
achieved using `@+`:

```vim
:let @+ = expand("%") . ":" . line(".")
```

It wouldn't be a vim post without creating a new shortcut, am I right? I
personally like to have both options, one with the line number at the end and
the other without it.

In my `.vimrc` file I mapped those to `leader + C` and `leader + c`.

```vim
" Copy relative path to clipboard
nnoremap <silent> <Leader>c :let @+ = expand("%")<CR>
nnoremap <silent> <Leader>C :let @+ = expand("%") . ":" . line(".")<CR>
```

That's it, I hope you enjoyed.
