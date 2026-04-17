# End-to-End Deployment Guide: Digital Resume Builder on AWS EC2

This guide provides step-by-step instructions from creating your AWS server from scratch to having your live application publicly accessible on the internet.

---

## Step 1: Create an AWS EC2 Instance (Ubuntu)

1. Log into your [AWS Management Console](https://aws.amazon.com/console/).
2. In the search bar at the top, type **EC2** and click on the EC2 service.
3. Click the orange **Launch instance** button.
4. **Name**: Type `Digital-Resume-Builder`.
5. **Application and OS Images (Amazon Machine Image)**: Select **Ubuntu** and ensure "Ubuntu Server 24.04 LTS" (or 22.04 LTS) is selected. (It should have the "Free tier eligible" tag).
6. **Instance type**: Select `t2.micro` (Free tier eligible).
7. **Key pair (login)**: 
   - Click **Create new key pair**.
   - Name it `resume-key`.
   - Key pair type: **RSA**, Private key file format: **.pem**.
   - Click **Create**. The `.pem` file will download to your computer. *Keep this safe; you need it to connect to the server.*
8. **Network settings**:
   - Check the boxes for:
     - **Allow SSH traffic from** -> "Anywhere"
     - **Allow HTTP traffic from the internet**
     - **Allow HTTPS traffic from the internet**
9. **Configure storage**: Leave it at `8 GiB` (or up to `30 GiB` for free tier).
10. Click the orange **Launch instance** button.
11. Click on the Instance ID link to go to your running instance. Note the **Public IPv4 address** on this page.

---

## Step 2: Prepare Your SSH Key (Windows users only)

AWS requires that your downloaded `.pem` key isn't readable by others on your machine, or SSH will block you.

1. Locate your downloaded `resume-key.pem` file.
2. Right-click the file -> **Properties** -> **Security** tab -> **Advanced**.
3. Click **Disable inheritance**, and choose "Remove all inherited permissions from this object".
4. Click **Add** -> **Select a principal** -> Type your Windows username -> Click **Check Names** -> Click **OK**.
5. Give yourself **Full control** and click **OK**.
6. Apply and close all windows.

---

## Step 3: Connect to your EC2 Instance

1. Open **PowerShell** or **Command Prompt** on your Windows PC.
2. Run the SSH command using the path to your key and your public IP address:
   ```bash
   ssh -i "C:\path\to\your\resume-key.pem" ubuntu@<YOUR_EC2_PUBLIC_IP>
   ```
   *(Be sure to replace the path and the IP address!)*
3. When asked "Are you sure you want to continue connecting?", type `yes` and hit Enter.
4. You should now see a prompt that looks like `ubuntu@ip-172-31-xx-xx:~$`.

---

## Step 4: Run the Deployment Commands

Now that you are inside your server, run the following commands sequentially:

### 1. Clone the GitHub Repository
This brings your project code directly into your AWS server.
```bash
git clone https://github.com/tulasiprasadgedda-tech/Digital-resume-builder.git
cd Digital-resume-builder
```

### 2. Make the Deployment Script Executable
Give the server permission to run the script file.
```bash
chmod +x deploy.sh
```

### 3. Execute the Script
This script will automatically install Node.js, PM2, and Nginx. It will also download all node modules, build your React frontend, and set up the production `pm2` backend process.
```bash
./deploy.sh
```

> **Note**: This will take a few minutes. Wait for it to finish and print "Deployment Complete!".

---

## Step 5: Verify the Deployment

1. **Test the Application**: Open your web browser and go to `http://<YOUR_EC2_PUBLIC_IP>`. Your React app should load properly!
2. **Test PM2 (Backend)**: If you need to check if the backend is running, run this inside your EC2 terminal:
   ```bash
   pm2 status
   pm2 logs resume-backend
   ```
3. **Test Frontend/Nginx**: Check the reverse proxy status.
   ```bash
   systemctl status nginx
   ```

---

## Step 6: Updating Environment Variables (Optional)

If you ever need to change your MongoDB string or JWT Secret, edit the `.env` file on your server:

```bash
nano /home/ubuntu/Digital-resume-builder/backend/.env
```
1. Make your changes using the arrow keys.
2. Press `Ctrl + X` to exit.
3. Press `Y` to save changes.
4. Press `Enter` to confirm the file name.
5. Apply the changes by restarting the backend:
```bash
pm2 restart resume-backend
```
