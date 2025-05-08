# 🚗 Car Sales & Shopping App – React + Redux + Microsoft Graph + SharePoint

A modern **car sales web application** built with **React** and **Redux Toolkit**, integrated with **Microsoft Graph API** and **SharePoint** for secure enterprise data storage, customer tracking, and internal sales team collaboration.

---

## 🧾 Description

This app allows users to browse available items, view detailed specs, and submit interest forms or purchase requests. All user activity and leads are synced with **SharePoint** lists, while authentication and employee information are managed via **Microsoft Azure Active Directory** and **Graph API**.

---

## ✨ Features

### 🧑‍💻 Frontend (React + Redux)

- Browse and filter 
- View detailed specs, images, and financing info
- Submit contact or interest forms (secured and validated)
- Authentication with Microsoft (MSAL + Azure AD)
- Admin dashboard for internal sales agents (role-based access)
- Responsive design (mobile-friendly)

### ☁️ Backend Integration (Microsoft Graph + SharePoint)

- Authenticate users with Azure AD
- Retrieve employee profile data via Microsoft Graph
- Store submitted forms in a SharePoint list (CRM-style)
- Optionally email confirmation to the customer and sales team via Outlook API
- Update vehicle inventory in SharePoint via REST Graph endpoints

---

## ⚙️ Tech Stack

| Frontend                     | Backend & Integration            |
|------------------------------|----------------------------------|
| React                        | Microsoft Graph API              |
| Redux Toolkit                | Microsoft Azure AD (OAuth 2.0)   |
| React Router                 | SharePoint Online                |
| MSAL.js                      | Outlook API (optional)           |
| TailwindCSS or MUI (optional)| RESTful Microsoft 365 endpoints  |

---

## 📁 Folder Structure


