# SWE-Project

## Set up Virtual environment:
```bash
python -m venv env
env/Scripts/activate.bat
```

## Install dependencies:
```bash
pip install -r .\requirements.txt
```

## Create a new database table
Go to backend/api/models.py
Type your model according to the documentation [here](https://docs.djangoproject.com/en/5.2/topics/db/models/#intermediary-manytomany)
Create the migration files and migrate the changes:
```bash
python manage.py makemigrations
python manage.py migrate
```
