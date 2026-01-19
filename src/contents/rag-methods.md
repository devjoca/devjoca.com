---
author: Joca Pereyra
datetime: 2024-04-12T10:22:00Z
title: Advanced Retrieval Strategies
slug: advance-retrieval-strategies
featured: true
tags:
  - post
  - LLM
  - RAG
draft: false
ogImage: ""
description: Explore advanced retrieval strategies that enhance the integration of vector databases with large language models (LLMs). This detailed guide delves into the challenges and solutions associated with document retrieval, including techniques like similarity search, contextual compression, query rewriting, reranking, and parent document retrieval. Learn how to optimize document processing for better accuracy and relevance in AI-driven systems. Discover practical solutions for handling large document chunks, improving context relevance, and ensuring that only the most pertinent documents are fed into LLMs. Perfect for developers and technologists seeking to refine their retrieval systems using the latest advancements in AI and database management.
---

In this article, we explore effective strategies for integrating vector databases with large language models (LLMs). Learn about the latest techniques in similarity search, contextual compression, and more, to enhance how your systems process and retrieve documents for relevant answers. This small guide is ideal for developers and technologists looking to update your AI applications.

## Strategy Overview

```mermaid
flowchart TD
    A[User Query] --> B{Choose Strategy}
    B -->|Simple Docs| C[Vector Search]
    B -->|Filter Noise| D[Contextual Compression]
    B -->|Complex Query| E[Rewrite-Retrieve-Read]
    B -->|Max Accuracy| F[Retrieval + Reranking]
    B -->|Chunk Boundaries| G[Parent Document]

    C --> H[Vector DB Search]
    D --> I[Filter + Score]
    E --> J[LLM Query Enhancement]
    F --> K[Scored Ranking]
    G --> L[Chunk Reconstruction]

    H --> M[LLM Response]
    I --> M
    J --> M
    K --> M
    L --> M

    style C fill:#e1f5fe
    style D fill:#fff3e0
    style E fill:#e8f5e9
    style F fill:#fce4ec
    style G fill:#f3e5f5
```

## Vector Search

This is the nave approach where we use a method called similarity search to retrieve documents from a vector database. Once we have obtained the documents, we feed them into a large language model (LLM) to produce results

### Issues

- Large doc chunks reduce the quality of the retrieval process
- Limited context relevance
- Bad retrievals or return irrelevant chunks

## Contextual Compression

```mermaid
flowchart TD
    Q[User Query] --> V[Vector DB]
    V -->|Raw Documents| F[Filter]
    V -->|n=20 docs| F

    F -->|Score Filter| R[Relevant Only]
    F -->|LLM Filter| R

    R --> C[Compressed Context]
    C --> LLM[LLM Input]
    LLM --> A[Response]

    subgraph Filtering Options
    F1[Relevance Score Threshold]
    F2[LLM Relevance Assessment]
    end

    F --> F1
    F --> F2

    style R fill:#c8e6c9
    style C fill:#bbdefb
```

We use a vector database to find documents, and before giving them to the large language model (LLM), we can take one or both actions:

1. Tell the LLM to remove documents that are not relevant
2. Only retrieve the most similar documents by filtering the relevance score

## Rewrite, Retrieve and Read

```mermaid
flowchart LR
    Q[Original Query] --> R[LLM Rewriter]
    R --> E[Enhanced Query]
    E --> S[Vector Search]
    S --> M[Retrieved Docs]
    M --> L[LLM Response]
    L --> G{Q Satisfied?}
    G -->|No| R
    G -->|Yes| F[Final Answer]

    style E fill:#e8f5e9
    style G fill:#fff3e0
```

Basically in this approach, we ask the LLM to rewrite the user query, it will generate better results since the LLM is so good at understanding purposes and meanings

## Retrieval with Reranking

```mermaid
flowchart TD
    Q[User Query] --> I[Initial Search]
    I -->|n=50 docs| R[Reranker LLM]
    R --> S[Scoring]
    S --> T[Top-K Selection]
    T -->|k=5| C[Filtered Context]
    C --> L[LLM Response]

    subgraph Scoring Process
    R --> S
    S --> T
    end

    style T fill:#c8e6c9
    style C fill:#bbdefb
```

Pass a bigger number of documents to the Reranker, which is an LLM that takes the query and the documents and returns a relevance score to filter out documents

## Parent Document retrieval

```mermaid
flowchart TD
    Q[User Query] --> S[Vector Search]
    S -->|"Chunk 5 Match"| C[Identify Related Chunks]
    C -->|"Chunk 4,5,6"| R[Reconstruct Parent Doc]
    R --> Ctx[Full Context]
    Ctx --> L[LLM Response]

    subgraph Chunk Management
    P[Parent Document]
    C1[Chunk 1]
    C2[Chunk 2]
    C3[Chunk 3]
    C4[Chunk 4]
    C5[Chunk 5]
    C6[Chunk 6]

    P --> C1
    P --> C2
    P --> C3
    P --> C4
    P --> C5
    P --> C6
    end

    style R fill:#e8f5e9
    style Ctx fill:#bbdefb
```

Fix the issue when your query is in the middle of 2 chunks of documents stored in the vector db. In this case, we combine multiple contiguous chunks related to the most relevant chunk to give the LLM full context to answer the query, it will depend on how we are splitting our chunks.

## Strategy Selection Guide

```mermaid
flowchart TD
    Start([Start]) --> Q1{Simple Query?}
    Q1 -->|Yes| Q2{Small Docs?}
    Q1 -->|No| Q3{High Accuracy?}

    Q2 -->|Yes| VS[Vector Search]
    Q2 -->|No| Q4{Chunk Issues?}

    Q3 -->|Yes| RR[Reranking]
    Q3 -->|No| Q5{Complex Query?}

    Q4 -->|Yes| PDR[Parent Document]
    Q4 -->|No| CC[Contextual Compression]

    Q5 -->|Yes| RRR[Rewrite-Retrieve-Read]
    Q5 -->|No| CC

    VS --> End([Recommended])
    CC --> End
    RRR --> End
    RR --> End
    PDR --> End

    style VS fill:#e1f5fe
    style CC fill:#fff3e0
    style RRR fill:#e8f5e9
    style RR fill:#fce4ec
    style PDR fill:#f3e5f5
```

Reference:

- [RAGOps: Advanced Retrieval Strategies with LangChain, Langsmith and Supabase.](https://www.youtube.com/watch?v=EuHderGVUs8)
- [Query Rewriting for Retrieval-Augmented Large Language Models](ERReadad)
- [Cohere Rerank](https://cohere.com/rerank)
- [Parent Document Retriever](https://python.langchain.com/docs/modules/data_connection/retrievers/parent_document_retriever/)
