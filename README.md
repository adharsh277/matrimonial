# Community Management Platform

> Public Website · Admin Web Application · Mobile Application

## Overview

This repository contains the Software Requirements Specification for a Community Management Platform designed for a community organisation to manage members, families, news, notices, payments, accounting, and matrimony registration.

## Document Snapshot

| Item | Details |
|---|---|
| Version | 1.0 |
| Prepared | July 2026 |
| Status | Draft for Review |

## Visual Direction

The recommended interface direction is calm, premium, and easy to scan.

| Area | Recommendation |
|---|---|
| Primary look | Clean white base with soft blue accents |
| Accent colors | Deep blue for structure, muted sky blue for highlights, light blue for card surfaces |
| Supporting colors | Green for success, amber for warnings, red for critical actions |
| Style | Rounded cards, generous spacing, subtle shadows, no heavy gradients |

## Table of Contents

1. Introduction
2. Overall Description
3. System Features
4. External Interface Requirements
5. Non-Functional Requirements
6. System Architecture & Technology Recommendation
7. UI/UX Guidelines
8. Additional Recommended Ideas Beyond the Original Brief
9. Assumptions and Constraints
10. Appendix

## 1. Introduction

### 1.1 Purpose

This SRS defines the functional and non-functional requirements for a Community Management Platform consisting of a public website, an administrative web application, and a mobile application for members.

### 1.2 Scope

The platform will allow the organisation to:

- Manage members and family records
- Publish news and notices
- Collect and track payments
- Maintain a basic accounting ledger
- Operate a matrimony registry for members

### 1.3 Intended Audience

Project sponsors, admin staff, UI/UX designers, backend and mobile developers, QA engineers, and third-party vendors such as payment, SMS, and push notification providers.

### 1.4 Definitions

| Term | Meaning |
|---|---|
| Admin | Staff user with elevated privileges to manage users, content, and finances |
| Member / User | Registered community member using the mobile app |
| SRS | Software Requirements Specification |
| OTP | One-Time Password used for verification |
| FCM | Firebase Cloud Messaging |
| RBAC | Role-Based Access Control |

## 2. Overall Description

### 2.1 Product Perspective

The system is a new product with three coordinated front ends sharing one backend and one database through a common API layer.

### 2.2 Product Functions

- Secure authentication and role-based access control
- Admin dashboard for members, payments, notices, and matrimony activity
- Admin-driven user registration with family detail capture
- Member and family profile records with payment history
- News and notice publishing with push delivery
- Payment recording with confirmations and a lightweight ledger
- Matrimony registration, browsing, search, and admin oversight
- Public website presenting news, gallery, and matrimony listings

### 2.3 User Classes

| User Class | Description | Priority |
|---|---|---|
| Super Admin | Full system access and configuration control | High |
| Admin / Staff | Manages members, news, payments, accounting, and matrimony moderation | High |
| Member | Registered community member using the mobile app | High |
| Public Visitor | Unauthenticated visitor browsing the public website | Medium |

### 2.4 Operating Environment

Admin web application: modern desktop browsers. Public website: responsive mobile and desktop browsers. Mobile application: Android 8+ and iOS 14+. Backend: cloud-hosted Linux containers.

### 2.5 Design and Implementation Constraints

- Email and password authentication must be supported
- Payment processing must use a PCI-DSS compliant gateway
- Push notifications require Firebase and APNs credentials
- Sensitive personal and family data must be protected with strong access control

## 3. System Features

### 3.1 Authentication & Access Management

| ID | Requirement | Priority |
|---|---|---|
| FR-AUTH-01 | System shall allow login using registered email and password for Admin and Members | High |
| FR-AUTH-02 | Passwords shall be stored using a salted one-way hash | High |
| FR-AUTH-03 | System shall issue secure, expiring session tokens for API access | High |
| FR-AUTH-04 | System shall support role-based access control | High |
| FR-AUTH-05 | System shall provide Forgot Password via email reset link | High |
| FR-AUTH-06 | System shall lock an account temporarily after repeated failed login attempts | Medium |
| FR-AUTH-07 | Admin actions on sensitive data shall be recorded in an audit log | Medium |

### 3.2 Admin Dashboard

| ID | Requirement | Priority |
|---|---|---|
| FR-DASH-01 | Dashboard shall display total members, new registrations, and active users | High |
| FR-DASH-02 | Dashboard shall display recent payments and total collections | High |
| FR-DASH-03 | Dashboard shall display recently published news/notices and their reach | Medium |
| FR-DASH-04 | Dashboard shall display matrimony module activity | Medium |
| FR-DASH-05 | Dashboard shall provide quick-action shortcuts | Medium |

### 3.3 User Registration & Management

| ID | Requirement | Priority |
|---|---|---|
| FR-USER-01 | Admin shall be able to add a new member with name, contact, email, and initial credentials | High |
| FR-USER-02 | System shall auto-generate a temporary password and email/SMS it to the new member | High |
| FR-USER-03 | Member shall be able to complete and edit their profile on the mobile app | High |
| FR-USER-04 | Admin shall be able to edit, deactivate, or delete a member record | High |
| FR-USER-05 | Admin shall be able to search and filter members by name, area, and status | Medium |
| FR-USER-06 | System shall prevent duplicate registration using the same email or phone number | High |

### 3.4 User & Family Details

| ID | Requirement | Priority |
|---|---|---|
| FR-UDET-01 | System shall store member personal details | High |
| FR-UDET-02 | System shall allow a member to add family members | High |
| FR-UDET-03 | System shall display the member's complete payment history | High |
| FR-UDET-04 | Admin shall be able to view and edit any member's and family details | High |
| FR-UDET-05 | System shall support uploading a profile photo and family photo(s) | Medium |

### 3.5 News and Other Notices

| ID | Requirement | Priority |
|---|---|---|
| FR-NEWS-01 | Admin shall be able to create, edit, and delete a news item or notice | High |
| FR-NEWS-02 | Published notices shall trigger a push notification to all or targeted members | High |
| FR-NEWS-03 | Members shall be able to view a chronological feed of news/notices | High |
| FR-NEWS-04 | Public news items shall also appear on the public website | Medium |
| FR-NEWS-05 | Admin shall be able to schedule a notice for future publishing | Medium |

### 3.6 Payments and Accounting

| ID | Requirement | Priority |
|---|---|---|
| FR-PAY-01 | Admin shall be able to record a payment against a member | High |
| FR-PAY-02 | System shall integrate with a payment gateway for online payment | High |
| FR-PAY-03 | On successful payment, system shall send an email confirmation and push notification | High |
| FR-PAY-04 | System shall generate a downloadable receipt or invoice per payment | Medium |
| FR-PAY-05 | System shall maintain a basic ledger of income and expenses | High |
| FR-PAY-06 | Admin shall be able to filter and export payment records | Medium |
| FR-PAY-07 | System shall support recurring or annual membership dues with reminders | Medium |

### 3.7 Matrimony Registration

| ID | Requirement | Priority |
|---|---|---|
| FR-MAT-01 | Member shall be able to create a matrimony profile | High |
| FR-MAT-02 | Member shall be able to upload photo(s) to the matrimony profile | High |
| FR-MAT-03 | Members shall be able to browse and view other matrimony entries | High |
| FR-MAT-04 | Members shall be able to search and filter entries | High |
| FR-MAT-05 | New or edited matrimony profiles shall require Admin approval | High |
| FR-MAT-06 | Admin shall be able to view, approve, reject, or remove any matrimony entry | High |
| FR-MAT-07 | Approved public matrimony entries shall appear on the public website | Medium |

### 3.8 Public Website

| ID | Requirement | Priority |
|---|---|---|
| FR-WEB-01 | Public website shall display latest news and notices marked as public | High |
| FR-WEB-02 | Public website shall display a photo gallery | High |
| FR-WEB-03 | Public website shall display approved public matrimony entries with basic search | High |
| FR-WEB-04 | Public website shall include an About Us / contact page | Medium |
| FR-WEB-05 | Public website shall be SEO-optimised and mobile responsive | Medium |

### 3.9 Additional Suggested Modules

| ID | Requirement | Priority |
|---|---|---|
| FR-ADD-01 | Events module for community events and RSVPs | Medium |
| FR-ADD-02 | Donation module with receipts and totals | Medium |
| FR-ADD-03 | Photo/video gallery module with albums | Medium |
| FR-ADD-04 | Directory / family-tree view with privacy control | Low |
| FR-ADD-05 | In-app support/enquiry chat or ticket system | Medium |
| FR-ADD-06 | Multi-language support | Low |
| FR-ADD-07 | Notification centre / inbox inside the app | Medium |
| FR-ADD-08 | Analytics module for the committee | Low |

## 4. External Interface Requirements

### 4.1 User Interfaces

- Consistent white-and-blue visual theme across all surfaces
- Mobile app should support swipe gestures
- Admin web app should use a responsive dashboard layout
- Public website should use a clean, minimal layout optimised for speed

### 4.2 Hardware Interfaces

The mobile app shall support camera and photo-library access for photo upload and device push-notification services for alerts.

### 4.3 Software Interfaces

- Payment gateway API for online payments
- Email service for confirmations and password resets
- Push notification service for Android and iOS alerts
- Optional SMS gateway for OTP and critical alerts

### 4.4 Communication Interfaces

All client-server communication shall occur over HTTPS/TLS 1.2+ through a versioned REST or GraphQL API.

## 5. Non-Functional Requirements

### 5.1 Performance

- Standard API responses shall complete within 2 seconds under normal load
- Public website pages shall load within 3 seconds on a typical 4G connection

### 5.2 Security

- Sensitive data shall be encrypted at rest and in transit
- Role-based access control shall restrict Admin-only actions from Member accounts
- Payment card data shall never be stored on platform servers

### 5.3 Usability

- Mobile navigation shall follow familiar patterns
- Forms shall provide inline validation and clear error messages

### 5.4 Reliability & Availability

- Target system uptime of 99.5% for backend services
- Daily automated database backups with a defined restore procedure

### 5.5 Scalability

The architecture shall support horizontal scaling of backend services as membership grows.

### 5.6 Maintainability

The codebase shall follow a modular structure with documented APIs.

### 5.7 Compliance

- Personal data handling shall follow applicable data-protection principles
- Payment processing shall use a PCI-DSS compliant gateway

## 6. System Architecture & Technology Recommendation

### 6.1 High-Level Architecture

A single backend service exposes a versioned API consumed by three clients, backed by one relational database as the single source of truth.

### 6.2 Recommended Technology Stack

| Layer | Recommendation |
|---|---|
| Backend API | Node.js with NestJS and TypeScript |
| Database | PostgreSQL |
| Admin Web App | React with TypeScript and Tailwind CSS |
| Public Website | Next.js |
| Mobile App | Flutter |
| Push Notifications | Firebase Cloud Messaging |
| Email Service | Amazon SES or SendGrid |
| Payments | Razorpay or Stripe |
| File / Image Storage | AWS S3 or Cloudinary |
| Hosting | AWS or equivalent on GCP/Azure |
| CI/CD | GitHub Actions |

### 6.3 Rationale

Flutter is recommended for the mobile app because it supports one codebase for Android and iOS with smooth swipe-based interactions. NestJS and PostgreSQL are recommended for the backend because they provide strong typing, modularity, and scalability.

## 7. UI/UX Guidelines

### 7.1 Colour Theme

- Primary background: white
- Primary accent: dark blue for headers and buttons, medium blue for links and highlights, light blue for card backgrounds
- Success states: muted green
- Alerts: amber or red used sparingly

### 7.2 Swipe & Gesture Interactions

- Matrimony module: card-stack swipe
- Notices and notifications: swipe to dismiss or mark as read
- Dashboard/home: horizontal swipe between summary tabs on mobile
- Pull-to-refresh on all list screens

### 7.3 Layout Principles

- Card-based components with soft shadows and rounded corners
- Bottom tab navigation on mobile
- Consistent typography scale and generous spacing
- Optional dark mode toggle for accessibility

## 8. Additional Recommended Ideas Beyond the Original Brief

These suggestions strengthen the product beyond the original request:

1. Bulk member import via CSV or Excel
2. Events and RSVP module
3. Donation module with receipts and totals
4. Notification centre inside the mobile app
5. Membership ID card with QR code
6. Outstanding-dues report with reminders
7. Report and block feature for matrimony profiles
8. Multi-language support
9. Family-tree / directory view with privacy control
10. Analytics dashboard for committee reporting
11. Biometric login and optional two-factor authentication
12. In-app support or enquiry chat

## 9. Assumptions and Constraints

- Final scope, module priority, and timeline will be confirmed before development begins
- Branding assets and exact content will be supplied by the client
- Third-party service costs are billed separately by those providers
- The document will be revised as requirements are refined during design workshops

## 10. Appendix

### 10.1 Glossary

| Term | Meaning |
|---|---|
| Module | A distinct functional area of the system |
| Ledger | A running record of income and expenses |

### 10.2 Document Revision History

| Version | Notes | Date |
|---|---|---|
| v1.0 | Initial draft covering all modules and recommended enhancements | July 2026 |
