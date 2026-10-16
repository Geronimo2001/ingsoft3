"""Resume reportes Cobertura de ambos stacks, sin sustituir sus gates nativos."""
import os
from pathlib import Path
import sys
import xml.etree.ElementTree as ET


def main():
    project, report_path = sys.argv[1:]
    try:
        root = ET.parse(report_path).getroot()
        rows = []
        for label, key in [("Líneas", "lines"), ("Ramas", "branches")]:
            covered = int(root.attrib[f"{key}-covered"])
            total = int(root.attrib[f"{key}-valid"])
            if total <= 0:
                raise ValueError(f"El reporte no contiene {label.lower()} medibles")
            # Usar la precisión de los logs de los runners, sin redondear hacia arriba.
            percentage = (10000 * covered // total) / 100
            rows.append(f"| {label} | {covered}/{total} | {percentage:.2f} % |")
        text = f"## Cobertura de {project}\n\n"
        text += "| Métrica | Cubiertas / total | Cobertura |\n| --- | --- | --- |\n"
        text += "\n".join(rows) + "\n\n"
        text += "Los mínimos se aplican en el paso de tests. Los reportes están en los artifacts de esta corrida.\n"
        code = 0
    except (OSError, ET.ParseError, KeyError, ValueError) as error:
        text = f"## Cobertura de {project}\n\nNo se pudo obtener un reporte válido: {error}\n"
        code = 1
    print(text)
    if summary := os.environ.get("GITHUB_STEP_SUMMARY"):
        with Path(summary).open("a", encoding="utf-8") as output:
            output.write(text + "\n")
    return code


if __name__ == "__main__":
    sys.exit(main())
