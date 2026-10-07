Trapped in Diary — Website Generation Specification

ใช้เอกสารนี้เป็น Prompt / Specification สำหรับ AI Coding Tool เช่น Cursor, Claude Code หรือ ChatGPT เพื่อสร้างเว็บไซต์จริงด้วย Next.js


────────

1. Project Overview

สร้างเว็บไซต์ Trapped in Diary ซึ่งเป็น Web Portal สำหรับเกมเพื่อการเรียนรู้ด้านการพยาบาลผู้ป่วยจิตเวช

เว็บไซต์มีหน้าที่เป็นศูนย์กลางสำหรับ:

• สมัครสมาชิกและเข้าสู่ระบบ
• เข้าถึงเกม
• แสดงข้อมูลบทเรียนและ Scenario
• แสดงผลการเรียนรู้
• แสดง Learning Analytics
• จัดการข้อมูลสำหรับ Admin

ตัวเกมพัฒนาแยกด้วย GameMaker และเว็บไซต์ทำหน้าที่เป็น Portal สำหรับเปิด/เข้าถึงเกม

────────

2. Technology Stack

ใช้เทคโนโลยีดังนี้:

• Next.js
• TypeScript
• Tailwind CSS
• Responsive Web Design
• Component-based architecture
• REST API-ready architecture
• Chart library สำหรับ Dashboard
• Mock data ในระยะแรก หากยังไม่มี Backend

โครงสร้างต้องสามารถเชื่อมต่อกับ Backend เช่น Spring Boot REST API ได้ในภายหลัง

────────

3. Design Direction

Visual Style

ธีมของเว็บไซต์ต้องสื่อถึง:

Psychiatric Nursing + Diary + 2D Narrative Game

แนวทาง:

• Modern
• Clean
• Academic
• Narrative game
• Slightly mysterious
• ไม่ทำให้ดูเหมือนเว็บไซต์โรงพยาบาล
• ไม่ใช้ UI แบบเกม RPG เต็มรูปแบบบนเว็บไซต์
• เว็บไซต์ควรดูเป็นแพลตฟอร์มการเรียนรู้สมัยใหม่

ใช้:

• Card UI
• Rounded corners
• Soft shadows
• Clear typography
• มีพื้นที่ว่างเพียงพอ
• Responsive

────────

4. Main Navigation

สำหรับ Student:

Logo: Trapped in Diary

Home
Scenarios
Dashboard
Learning Result
Analytics
Profile

[Play Game]
[Logout]

สำหรับ Admin:

Logo: Trapped in Diary

Dashboard
Users
Lessons
Scenarios
Analytics

[Logout]

────────

5. Pages

PAGE 01 — Home

Route:

/

Purpose

หน้าแรกสำหรับแนะนำโครงการ

Content

Hero Section:

• Logo / Project Name
• “Trapped in Diary”
• คำอธิบายสั้น ๆ
• ปุ่ม “Start Learning”
• ปุ่ม “Explore Scenarios”

ตัวอย่างข้อความ:

Learn psychiatric nursing through interactive stories, decisions and simulated situations.


Sections

1. Hero
2. About the Project
3. How It Works
4. Featured Scenarios
5. Learning Features
6. Footer

Learning Features

แสดง Card:

• Interactive Scenario
• Decision Making
• Mini Games
• Pre/Post Test
• Learning Analytics

────────

6. PAGE 02 — Login

Route:

/login

Components

• Email / Username
• Password
• Login Button
• Remember Me
• Forgot Password
• Link to Register

Behavior

Login สำเร็จ:

Student → /dashboard
Admin → /admin/dashboard

แสดง Error หาก Login ไม่สำเร็จ

────────

7. PAGE 03 — Register

Route:

/register

Fields:

• Full Name
• Student ID
• Email
• Password
• Confirm Password

Validation:

• Required fields
• Email format
• Password confirmation
• Duplicate email

เมื่อสมัครสำเร็จ:

→ /login

────────

8. PAGE 04 — Student Dashboard

Route:

/dashboard

Header

Welcome back, [Student Name]
Continue your learning journey.

Summary Cards

แสดง:

• Learning Progress
• Scenarios Completed
• Pre-test Score
• Post-test Score

Continue Learning

แสดง Scenario ล่าสุด:

Scenario Name
Progress
[Continue]

Recent Activity

แสดง:

• เล่น Scenario
• ทำ Mini-game
• ทำ Post-test
• คะแนนล่าสุด

────────

9. PAGE 05 — Scenario Library

Route:

/scenarios

Purpose

แสดง Scenario ทั้งหมดที่นักศึกษาสามารถเล่นได้

Scenario Card

แต่ละ Card มี:

• ภาพปก
• Scenario Name
• Description
• Difficulty
• Estimated Time
• Progress
• Status
• [Play]
• [View Details]

Filter

• All
• Not Started
• In Progress
• Completed

Search

ค้นหา Scenario จากชื่อหรือหัวข้อ

────────

10. PAGE 06 — Scenario Detail

Route:

/scenarios/[id]

แสดง:

• Cover Image
• Scenario Name
• Description
• Learning Objectives
• Related Lesson
• Estimated Time
• Difficulty
• Completion Status

ปุ่ม:

[Start Scenario]
[Continue]

────────

11. PAGE 07 — Game Page

Route:

/game/[scenarioId]

Purpose

หน้าเว็บสำหรับเปิดเกม GameMaker

Layout:

------------------------------------------------
| Scenario Name                     | Exit Game |
------------------------------------------------
|                                              |
|              GAMEMAKER GAME                  |
|                                              |
|        HTML5 Game / Embedded Game            |
|                                              |
------------------------------------------------

Requirements

• รองรับ GameMaker HTML5/Web Build
• แสดงเกมในพื้นที่หลัก
• Responsive
• มีปุ่ม Exit
• มีปุ่มกลับ Scenario
• สามารถส่งข้อมูลผลการเล่นไปยัง Backend ได้

ตัวอย่างข้อมูลที่อาจส่ง:

{
  "userId": "ST001",
  "scenarioId": "SC001",
  "score": 80,
  "completed": true,
  "playTime": 1250
}

────────

12. PAGE 08 — Learning Result

Route:

/results

Sections

Pre-test vs Post-test

แสดง:

Pre-test      55%
Post-test     82%

พร้อม Chart เปรียบเทียบ

Scenario Results

Table:

|Scenario  |Status     |Score|Result|
|----------|-----------|----:|------|
|Scenario 1|Completed  |85   |Passed|
|Scenario 2|Completed  |90   |Passed|
|Scenario 3|In Progress|-    |-     |

Mini-game Results

แสดง:

• จำนวน Mini-game
• คะแนนเฉลี่ย
• จำนวนที่ผ่าน
• จำนวนที่ต้องทำซ้ำ

────────

13. PAGE 09 — Learning Analytics

Route:

/analytics

Dashboard

ต้องใช้ Visualization

Components:

1. Progress Overview
2. Pre-test / Post-test Chart
3. Scenario Completion Chart
4. Mini-game Performance
5. Learning Activity
6. Recent Attempts

Example Cards

Overall Progress       72%
Scenarios Completed    6 / 8
Average Score          84%
Total Play Time        4h 32m

Charts

ใช้:

• Bar Chart
• Line Chart
• Doughnut/Pie Chart
• Progress Chart

────────

14. PAGE 10 — Profile / Settings

Route:

/profile

Sections:

Profile

• Name
• Student ID
• Email

Account

• Change Password
• Logout

Preferences

• Sound
• Notifications
• Theme

────────

15. ADMIN PAGE — Dashboard

Route:

/admin/dashboard

Summary

Cards:

Total Students
Active Students
Total Scenarios
Total Game Sessions

Charts

• Student Activity
• Scenario Popularity
• Average Learning Score
• Completion Rate

────────

16. ADMIN PAGE — Users

Route:

/admin/users

Features:

• User table
• Search
• Filter
• View User
• Edit User
• Disable Account
• Delete User

Columns:

Name
Student ID
Email
Status
Last Active
Actions

────────

17. ADMIN PAGE — Lessons

Route:

/admin/lessons

Features:

• List Lessons
• Add Lesson
• Edit Lesson
• Delete Lesson
• View Lesson

Fields:

Title
Description
Learning Objective
Status

────────

18. ADMIN PAGE — Scenarios

Route:

/admin/scenarios

Features:

• Scenario List
• Add Scenario
• Edit Scenario
• Delete Scenario
• Publish / Unpublish
• View Scenario

Fields:

Scenario Name
Description
Lesson
Difficulty
Estimated Time
Status

────────

19. ADMIN PAGE — Analytics

Route:

/admin/analytics

แสดงข้อมูลรวมของผู้เรียน

Metrics

• Total Students
• Total Sessions
• Average Pre-test Score
• Average Post-test Score
• Average Improvement
• Scenario Completion Rate
• Average Mini-game Score

Charts

• Learning Score Comparison
• Student Activity
• Scenario Completion
• Scenario Popularity
• Mini-game Performance

────────

20. Responsive Design

เว็บไซต์ต้องรองรับ:

Desktop
Tablet
Mobile

Mobile Navigation:

☰ Menu

Dashboard ต้องปรับ Layout ตามขนาดหน้าจอ

────────

21. Component Structure

แนะนำโครงสร้าง:

components/
├── Navbar
├── Footer
├── Sidebar
├── Button
├── Card
├── Modal
├── DataTable
├── ProgressBar
├── ScenarioCard
├── ScoreCard
├── Chart
└── GameContainer

────────

22. Suggested Next.js Structure

app/
├── page.tsx
├── login/
│   └── page.tsx
├── register/
│   └── page.tsx
├── dashboard/
│   └── page.tsx
├── scenarios/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── game/
│   └── [scenarioId]/
│       └── page.tsx
├── results/
│   └── page.tsx
├── analytics/
│   └── page.tsx
├── profile/
│   └── page.tsx
└── admin/
    ├── dashboard/
    ├── users/
    ├── lessons/
    ├── scenarios/
    └── analytics/

────────

23. Mock Data

ในระยะแรกให้ใช้ Mock Data เพื่อให้สามารถ Preview เว็บไซต์ได้โดยไม่ต้องมี Backend

ตัวอย่าง:

const scenarios = [
  {
    id: "SC001",
    title: "The First Conversation",
    description: "Practice communication with a psychiatric patient.",
    difficulty: "Beginner",
    progress: 100,
    status: "completed"
  },
  {
    id: "SC002",
    title: "Understanding the Patient",
    description: "Respond appropriately to changing patient behavior.",
    difficulty: "Intermediate",
    progress: 45,
    status: "in-progress"
  }
];

────────

24. API-ready

อย่าเขียนระบบให้ผูกกับ Mock Data โดยตรง

แยก Data Layer ออกจาก UI เพื่อให้ภายหลังเปลี่ยนเป็น:

Mock Data
     ↓
API Service
     ↓
Spring Boot REST API
     ↓
Database

ตัวอย่าง API:

POST /api/auth/login
POST /api/auth/register

GET /api/scenarios
GET /api/scenarios/{id}

POST /api/game/session
POST /api/game/result

GET /api/results
GET /api/analytics

GET /api/admin/users
GET /api/admin/lessons
GET /api/admin/scenarios
GET /api/admin/analytics

────────

25. Authentication

ระบบต้องรองรับ Role:

STUDENT
ADMIN

หลัง Login ให้ Redirect ตาม Role:

STUDENT
→ /dashboard

ADMIN
→ /admin/dashboard

Student ไม่สามารถเข้าหน้า Admin ได้

Admin สามารถเข้าหน้า Admin ได้

────────

26. Important UI Rules

1. ใช้ภาษาไทยเป็นหลักใน UI แต่สามารถใช้ English สำหรับชื่อเกมและคำศัพท์เฉพาะ
2. ปุ่มหลักต้องเห็นชัดเจน
3. ทุกหน้าต้องมี Loading State
4. ทุกหน้าที่มีข้อมูลต้องมี Empty State
5. ทุก Form ต้องมี Validation
6. ทุก Action สำคัญต้องมี Confirmation
7. ต้องมี Error State
8. ต้อง Responsive
9. ใช้ Component ซ้ำแทนการเขียน UI ซ้ำ
10. UI ต้องดูเป็นระบบเดียวกันทุกหน้า

────────

27. User Flow

Home
  ↓
Login / Register
  ↓
Student Dashboard
  ↓
Scenario Library
  ↓
Scenario Detail
  ↓
Game
  ↓
Game Result
  ↓
Learning Result
  ↓
Learning Analytics

Admin:

Login
  ↓
Admin Dashboard
  ↓
Users
Lessons
Scenarios
Analytics

────────

28. Final Requirement

สร้างเว็บไซต์ให้สามารถ Run ได้จริงในเครื่อง

ต้องมี:

• Navigation
• Routing
• Responsive UI
• Mock Data
• Student Pages
• Admin Pages
• Dashboard
• Charts
• Scenario Library
• Game Page Placeholder
• Result Page
• Analytics
• Authentication UI
• Form Validation
• Loading / Empty / Error States

ในขั้นแรก ยังไม่ต้องเชื่อมต่อ Database จริง และ ยังไม่ต้องพัฒนา Gameplay ของ GameMaker

ให้สร้าง Website Portal ให้เสร็จก่อน โดยออกแบบโครงสร้างให้สามารถนำ GameMaker HTML5/Web Build มาเชื่อมต่อภายหลังได้