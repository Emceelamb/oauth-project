# OAuth Project

Starting and Solution code for CC OAuth project.

Requires a GitHub account.

## Off-Platform Steps to create an OAuth Application

1. Go to GitHub Settings page

![Settings Page](screenshots/settings.png)

2. Select Developer Settings

![Developer Settings Page](screenshots/developer_settings.png)

3. Select OAuth Apps

![OAuth App](screenshots/OAuthApp.png)

4. Create New OAuth App with:
  - Application Name: `OAuth Project`
  - Homepage URL: `localhost:3000`
  - Authorization `callback URL: http:localhost:3000/auth/callback`

![Register App](screenshots/Register.png)

5. Generate new client secret

![New Client Secret](screenshots/NewClient.png)
