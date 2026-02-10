# Job Application Tracker

A **full-stack web application** for tracking job applications, designed to help users manage, monitor, and optimize their job search. Built with **Next.js**, **MongoDB**, and **TypeScript**, featuring a smart **Finite State Machine (FSM)** for application statuses, ghosted application detection, and automation-ready features.  

This project is **portfolio-worthy** because it demonstrates advanced backend design, frontend interactivity, and thoughtful product features.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture](#architecture)  
- [Getting Started](#getting-started)  
- [API Routes](#api-routes)  
- [Database Schema](#database-schema)  
- [Key Concepts](#key-concepts)  
- [Future Enhancements](#future-enhancements)  
- [License](#license)  

---

## Features

### Core Functionality

- **Track Applications:** Add, edit, and view job applications with company, role, location, salary, and notes.
- **Application Status FSM:** Enforces valid transitions between statuses: `Applied → Interview → Offer → Rejected`.
- **Interview Scheduling:** Associate interviews with applications; status updates automatically if scheduling occurs.
- **Decision Tracking:** Automatically records the date of final decisions (`Offer` or `Rejected`).

### Advanced Features

- **Ghosted Applications Detection:**  
  Automatically flags applications that have had **no recruiter interaction for 30 days** as "ghosted".  
  - Exposed in API as `isGhosted`.
  - Can filter `/api/applications?ghosted=true`.

- **Ghost Heat Score:**  
  Quantifies weeks of silence since last activity (0–6 weeks), helping prioritize follow-ups.

- **Soft Deletion with TTL:**  
  Rejected applications are automatically **deleted 5 minutes** (configurable) after being marked as rejected using MongoDB TTL indexes.

- **Kanban-Style Dashboard:**  
  Indexing by `status` and `userId` allows easy filtering for a Kanban workflow.

- **User Authentication:**  
  Secure session-based authentication integrated.

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS  
- **Backend:** Next.js API routes (Node.js runtime)  
- **Database:** MongoDB + Mongoose (TTL indexes, schema-level constraints)  
- **Authentication:** Custom session-based auth

---

## Architecture

