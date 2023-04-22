---
title: 'DataQueen - Cloud Data Warehouse/Lake Solution'
date: '2023-04-22'
---

# DataQueen Introduction

DataQueen is a cloud data warehouse built in Rust. It is designed to be a simple and easy to integrate. DataQueen uses object storage as its storage layer and datafusion as the query engine for the compute layer.

# Motivation

Data Warehouse solutions are expensive and hard to maintain. Depending on the solution you choose, you may need to maintain a cluster of machines for the database, job manager or query engine. This is a lot of work and can be expensive. DataQueen aims to solve this problem by providing a simple solution that is easy to maintain and cheap to run.

We wanted to create a data warehouse that you can run directly on your existing object storage data, with little to no data transformations. We also wanted to create a data warehouse that is easy to maintain and cheap to run.

# Risk

Most data warehouse solutions are built on top of systems where you have to put a lot of thought into whether that solution is the right one for you. You may need to move TBs or PBs of your data, and spend months migrating and setting everything up. DataQueen is easy to integrate; so you can easily integrate DataQueen into your existing infrastructure. If your data is already in object storage and in a parquet (csv and ndjson also supported) format, this will make the integrate almost seamless.

This also means that you can easily remove DataQueen if it doesn't work for you. Also, DataQueen Cloud solution is charges based on the usage of the service. So you don't have to worry about paying if you don't get any value out from DataQueen.

# Performance

Despite the compute layer needed to download the data, parse the data, and run the query, DataQueen is still able to perform well. We have tested DataQueenlocally  on a 50GB dataset and it was able to run a register in 20 seconds and query in ~1.5 seconds. We have also tested DataQueen on a 1GB dataset and it was able to run a register in 1 second and query in ~0.1 seconds.

Depending on what fields need to be accessed, the query time can be signifigantly reduced because of the Apache Arrow columnar format.

To run a query on a dataset, you first need to register the dataset as a tableww m. This can take up over a minute depending on the size of the dataset.

# Self-hosting

Currently, we don't support self hosting DataQueen query engine, but we plan to support it in the future.
