"""Publicar el resultado real de Playwright en el resumen de GitHub Actions."""

import json
import os
import sys
from pathlib import Path

suite, report_path = sys.argv[1:]
stats = json.loads(Path(report_path).read_text())["stats"]
summary = (
    f"### {suite}\n\n"
    f"**{stats['expected']} passed**, {stats['unexpected']} failed, "
    f"{stats['flaky']} flaky, {stats['skipped']} skipped.\n\n"
    "El reporte HTML está disponible en los artifacts de este job.\n"
)
print(summary)
if os.environ.get("GITHUB_STEP_SUMMARY"):
    with open(os.environ["GITHUB_STEP_SUMMARY"], "a") as output:
        output.write(summary)
