# Jira Multi-Assignee Avatars Extension

This browser extension adds visual avatars for additional assignees in Jira Kanban boards. If your team uses a custom field to track multiple assignees, this tool enhances visibility by showing profile pictures next to each ticket — just like the main assignee avatar.

---

## 🎯 Features

- 🧑‍🤝‍🧑 Show avatars for multiple assignees from a custom Jira field
- ⚙️ Configurable avatar image URLs
- 🧩 Chrome extension built with Manifest V3

---

## 🚀 Installation (Developer Mode)

1. Clone or download this repository:

   ```bash
   git clone git@github.com:Prebz98/Jira-multiple-avatars.git
   cd jira-multi-avatar-extension

2. Create a config.json file from a copy of config.sample.json 
   1. Fill in the `avatarUrl` with the URL of the avatar image you want to use for each assignee.
   2. `multipleAssigneesFieldId` should be the ID of the custom field in Jira that contains multiple assignees.

3. Open Chrome and go to `chrome://extensions/`

4. Enable Developer mode (top right)

5. Click "Load unpacked" and select this folder