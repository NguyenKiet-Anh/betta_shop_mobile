from pathlib import Path
import os, subprocess

BASE_DIR = Path(__file__).resolve().parent.parent.parent
JSON_DIR = os.path.join(BASE_DIR, "database/JSON_data/")
venv_python = "venv"

if os.name == "posix":
    JSON_DIR = Path(JSON_DIR.replace("\\", "/"))
    venv_python = venv_python + "/bin/python"
elif os.name == "nt":
    JSON_DIR = Path(JSON_DIR.replace("/", "\\"))
    venv_python = venv_python + "\\Scripts\\python.exe"

file_list = os.path.join(JSON_DIR, "initial_order.txt")

with open(file_list, "r") as f:
    json_files = [line.strip() for line in f if line.strip()]

for json_file in json_files:
    print(f"\nLoading {json_file}...\n")
    subprocess.run(
        [venv_python, "manage.py", "loaddata", os.path.join(JSON_DIR, json_file)],
        check=True,
    )

print("Database initialize successfully!")
