---
title: "DevBlog: Infrastructure"
description: "I go over the DevOps & infrastructure side of things"
tags: "DevBlog, TestTag"
---

So, originally all the infrastructure was hosted on AWS.
The registrar for this domain is AWS Route 53. I got it for the standard price of $12 billed annually.

The site itself was a statically-generated site hosted on a Docker container, inside of an AWS EC2 t3.micro instance. The actual articles were stored on AWS S3. SSL/TLS worked with [Let's Encrypt](https://letsencrypt.org/) and Nginx (primarily for HTTPS and reverse-proxy functionality)

The process for _writing_ a blog post was simplified by my [CLI Blog manager](https://github.com/Robin5605/cli-blog-manager), written in Rust. This program uses the [AWS Rust SDK](https://aws.amazon.com/sdk-for-rust/) to interact with S3. I found this tool quite helpful because the `.md` files had some metadata as frontmatter that I didn't want to remember, so I had the tool set up the post template for me and handle pushing it to S3.

Making blogs wasn't too difficult. The hard part comes when dealing with deployment. I would have to manually SSH into the EC2 instance, stop the Docker container, pull my commits from GitHub, re-build the container, and run the newly built container. Major pain.

Then I went down the rabbit hole of AWS Elastic Container Service & AWS Elastic Container Registry. I set up GitHub workflows to build and push to both GHCR (GitHub container repository) _and_ AWS ECR. This worked pretty well, actually. I had automated deployment via GitHub actions. I also had to put an Application Load Balancer in front of my container (really, there was no "load balancing" considering there was no horizontal scaling yet). But at least now the containers were publicly accessible.
I ran it like this for a week or so - before I realized I had racked up insane bills on AWS. I also felt like I learned quite a bit on AWS and wanted to try something new, so I went for [Vercel](https://vercel.com/) after hearing good things about them.

I have to say my experience with the Vercel platform so far has been very pleasant. All they had me do was integrate with GitHub, and select my GitHub repository. They took everything from there. I had some trouble with AWS tokens during build time, so I decided to just check in the articles themselves into version control for now.
Vercel provided me with automatic deployments and previews, which was awesome. It would automatically build and deploy my site to production, and provide previews on all PRs so I can use it to make sure the site is actually working like intended.

I also have the site behind Cloudflare, simply because of all the neat features CF provides like caching, SSL/TLS, DNS, DDoS protection, etc.

I then had the idea of building a sort of admin UI panel, from which I can manage all my posts. The issue here was that I can't keep my posts checked in with version control. Well, technically I _could_ but the admin panel would have to programatically create PRs which doesn't seem all that idiomatic. So, the articles have to be stored in some external datasource. I was originally using S3, yes, but again I wanted to try something different.

So now, all my blog posts are stored in [Contentful](https://www.contentful.com/), in a data model that stores all the metadata (previously frontmatter) and the content itself. Posts are now fetched via the Contentful Delivery SDK. For managing posts, they have the Contentful Management SDK that I plan to use.

On the overall, I learned a lot from all the different tools, APIs, and platforms. I'm excited to keep trying out different platforms and learning more about DevOps and building robust, scalable infrastructure.
