# **GET DAILY DRINK**

This project helps users track their daily water intake and sends reminders to stay hydrated based on their preferences.

## **Getting Started**

To get this project up and running on your local machine, follow the instructions below:

### **Prerequisites**

You need to have the following installed on your system:

- **Python** (version 3.8 or higher)  
  Download and install Python from: [https://www.python.org/downloads/](https://www.python.org/downloads/)

- **Django** (version 3.2 or higher)  
  Django is the web framework used to build the project.

- **pip** (Python package installer)  
  This comes installed with Python. It's used to install Python packages.

### **Step 1: Clone the Repository**

First, clone the project repository to your local machine.

```bash
mkdir hydration_reminder
cd hydration_reminder
git clone https://github.com/Hcode7/getdailydrink.git
python -m venv env
env\scripts\activate
pip install -r requirements.txt
cd hydration_reminder
python manage.py runserver
