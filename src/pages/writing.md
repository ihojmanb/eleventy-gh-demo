---
title: Writing
permalink: /writing/
eleventyNavigation:
  key: Writing
  order: 2
---
1. [Thoughts](#thoughts)
2. [Programming languages notes](#programming-languages-notes)
3. [Today I Learned](#today-i-learned)


### Thoughts

{% set postslist = collections.posts %}
{% include "components/postslist.njk" %}

### Programming languages notes

This is a set of notes that I took while learning fundamental concepts
on the design of programming languages. Originally in spanish, I'm translating 
this notes to english, and polishing its quality.

The language used is Racket.
<hr>
{% set postslist = collections.pl %}
{% include "components/postslist.njk" %}

### Today I learned
TODO