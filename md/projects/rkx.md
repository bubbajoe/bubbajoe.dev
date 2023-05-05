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

# RKX vs Kong

RKX utilizes similar high-level concepts as Kong:
- Routes
- Services
- Modules (Plugins)
- Clients (Consumers)


I plan to release the first version of rkx at the end of this year. I will be writing a series of blog posts about the design and implementation of rkx and the modules. 
