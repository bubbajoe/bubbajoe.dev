---
title: 'RKX - API Gateway (WIP)'
date: '2023-04-02'
---

# RKX Introduction

RKX is a dynamic module based API Gateway built in Go. It is designed to be a facile, fast, and flexible.

Namespaces - usually represents 1 or more domains.
Routes - which are paths that are triggered when they hit the proxy
Services - represents 1 or more URLs (or a module handler)
Consumer - these represent some way of recognizing the client.
Modules - scripts that are ran at runtime in particular functions

- Modules can be built in TypeScript or JavaScript
  - dynamic modules, meaning they can be loaded/replaced without needed to restart the server
- There is built-in support for:
  - Certification Mappings
  - Basic/JWT/Key Authentication
  - Canary, Versioning and rollbacks

# Module Types

There are 2 types of modules:
- Proxy Modules - modules that are triggered by events like a request or response. Trigger Modules can be used to modify the request or response or handle the request/response in a custom way.
- Admin Modules - modules that are triggered by admin API events; like a creating, modifying, or deleting resources. Admin Modules can also be used to handle custom operations from the admin API. These sort of modules will be useful for companies that want to enforce specific rules/patterns.

# Clustering and Persistence

Currently, RKX doesn't use clustering or automated persistance across multiple nodes yet. Currently, a change needs to be applied to all nodes individually. I plan to add clustering and persistance in the future. 

# RKX Client - `rkxcli`

`rkxcli` is a command line tool for managing RKX resources. I plan to also add the management of RKX instances, viewing RKX logs/stats, and other RKX features.

# Conclusion

## RKX vs Kong

RKX aims to bring the simplicity of Kong, but the flexibility of building it yourself. 

Therefore RKX utilizes similar high-level concepts as Kong:
- Routes
- Services
- Modules (Plugins)
- Clients (Consumers)

### Why not just use Kong?

While Kong is, hands down, one of the best API Gateways out there, it is not without its flaws. Kong is built in Lua (plugins too), which is a great language, but it is not as popular as JavaScript or TypeScript. This means that it is harder to find developers who are familiar with Lua, and more importantly who are willing to write modules in Lua. Plugins are are not dynamic, so this means it will require a restart, which may be a big issue depending on your setup and also if you want to rollback quickly. Additionally, deploying Kong can be complex, as you may need a database depending on what features you want to use.

TLDR: lua sucks (unpopular), complex deployment, restart to update plugins, enterprise paywall features and overall, not so flexible.

RKX aims to solve these problems by using JavaScript/TypeScript, with dynamic deployments and by having an internal state management and replication system. This will ensure that RKX is easy to deploy and maintain.

## Release Plan

I plan to release the first version of rkx at the end of this year (2023). I am currently dogfooding RKX in several of my projects. Prioritizing, deprioritizing, refactoring and testing... I will be writing a series of blog posts about the design and implementation of rkx and the modules.
