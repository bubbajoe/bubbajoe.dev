---
title: 'RKX - API Gateway (WIP)'
date: '2023-04-02'
---

# RKX Introduction

RKX is a Module based API Gateway built in Go. It is designed to be a simple, fast, and extensible.

- Modules can be built in TypeScript or JavaScript
- There is built-in support for:
  - Canary Deployments
  - Change Versioning
  - Certification Mappings
  - Basic/Key Authentication

# Module Types

There are 2 types of modules:
- Trigger Modules - modules that are triggered by events like a request or response. Trigger Modules can be used to modify the request or response or handle the request/response in a custom way.
- Admin Modules - modules that are triggered by admin API events; like a new route, service or namespace being created. Admin Modules can also be used to handle custom operations from the admin API.

# Performance

TBD

# Clustering and Persistence

Currently, RKX doesn't use clustering or automated persistance across multiple nodes. Currently, a change needs to be applied to all nodes in the cluster. I plan to add clustering and persistance in the future. 

# RKX Client - `rkxcli`

`rkxcli` is a command line tool for managing RKX routes, services, and namespaces. You can also maintain RKX instances by adding, removing, and fetching the status of each of the nodes.

# Conclusion

## RKX vs Kong

RKX aims to bring the simplicity of Kong, but the flexibility of building it yourself. 

Therefore RKX utilizes similar high-level concepts as Kong:
- Routes
- Services
- Modules (Plugins)
- Clients (Consumers)

### Why not just use Kong?

While Kong is hands down the best API Gateway out there, it is not without its flaws. Kong is built in Lua, which is a great language, but it is not as popular as JavaScript or TypeScript. This means that it is harder to find developers who are familiar with Lua, and more importantly who are willing to write modules in Lua. This is a very small use-case considering most poeple use modules that are already built, but it is still a valid point. Another reason is that deploying Kong can be complex you may need a database depending on what features you want to use.

RKX aims to solve these problems by using JavaScript/TypeScript and by having an internal state management and replication system. This will ensure that RKX is easy to deploy and maintain.

## RKX vs Traefik

TBD

## RKX vs Tyk

TBD

## Release Plan

I plan to release the first version of rkx at the end of this year (2023). I am currently dogfooding RKX in several of my projects. Prioritizing, Deprioritizing, Refactoring and Testing... I will be writing a series of blog posts about the design and implementation of rkx and the modules.
