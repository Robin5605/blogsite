---
title: "DevBlog: Filtering"
description: "I talk about the first update to the site"
tags: "DevBlog"
---

So, this is the first blog post and the first actual code update to the site.
Here's to hoping everything goes well.

## Changes

The star of the show for this update is the new "filter" feature. If you go back to the main site,
you'll be able to see a new "filter" button at the top right hand corner.
Pressing it will bring up a popup of all unique tags currently in the system.
As of the time of writing this post, that will be just "Update" and "Development", since
those are the only two tags that this post has.
The popup menu lets you select multiple tags as well, so selecting multiple tags
will filter all posts that have at least one of those selected tags.

Interestingly enough, the actual logic for this new functionality was relatively
short compared to the HTML structure and styling required.
The dropdown/popup menu component is powered by [Headless UI](https://headlessui.com/),
which integrates nicely with TailwindCSS (which is already being used), to provide
nice components that would otherwise be tricky to implement by one self.
For instance, the "ListBox (Select)" component from Headless UI
provides a clean API, many accessibility features, keyboard navigation, and a lot more features, straight
out of the box with little manual configuration required on the developer's part!

Try it out! Click on the "Filter" dropdown, and use your up and down arrow keys to navigate
the choices, and press enter to select one.
It also uses the "Transition" component to provide fine-grained animation control
(it may be hard to notice, but the popup fades out when you click off of it)

Aside from that, a minor change to mobile styling was made where extra spacing and padding was
sheared off the sides so the post components could use more of the horizontal space (which is
limited on mobile).

## Future Plans

I currently don't have many future plans with respect to features for the blogsite. I meant for
it to be a tool for me to blog in, and it's serving that purpose quite well (if I do say so myself)
Perhaps I can add a "Projects" tab that outlines some of the projects I have going,
and a more detailed write up on each (such as future plans, challenges, development updates, that sort of thing)

A detailed writeup of the development of the actual blogsite is in the works as well, expect that within the next few weeks.

If you discover any bugs or issues with the new feature or site in general, please don't hesistate to reach
out to me via one of the contact methods in the [About me](https://www.robinj.xyz/about) section of the page.
I'd love to hear your feedback. That's it for this one, thanks for reading!
