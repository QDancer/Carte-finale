#!/usr/bin/env python3
"""
remove_ukraine.py
-----------------
Supprime du fichier GeoJSON toutes les entités (features) correspondant
à l’Ukraine, puis écrit un nouveau fichier sans elles.

• Fichier source  : all_countries.geojson
• Fichier sortie  : all_countries_without_ukraine.geojson
  (changez OUT_FILE = IN_FILE si vous voulez écraser l’original)
"""

import json
from pathlib import Path

# --- Chemins d’entrée/sortie -------------------------------------------------
IN_FILE  = Path("all_countries.geojson")                 # GeoJSON d’origine
OUT_FILE = Path("all_countries_without_ukraine.geojson") # GeoJSON nettoyé

# --- Champs susceptibles de contenir le code ISO ou le nom du pays ----------
ISO_KEYS  = ["shapeISO", "ISO_A3", "iso_a3", "ISO3", "iso3"]
NAME_KEYS = ["shapeName", "NAME", "ADMIN", "name", "admin"]

def matches_country(props: dict) -> bool:
    """Renvoie True si les propriétés appartiennent à l’Ukraine."""
    # — par code ISO alpha-3
    for k in ISO_KEYS:
        if k in props and str(props[k]).upper() == "UKR":
            return True
    # — par nom de pays
    for k in NAME_KEYS:
        if k in props and str(props[k]).strip().lower() == "ukraine":
            return True
    return False

def main() -> None:
    # --- Lecture ---
    with IN_FILE.open(encoding="utf-8") as f:
        data = json.load(f)

    if data.get("type") != "FeatureCollection":
        raise ValueError("Le fichier n’est pas une FeatureCollection GeoJSON.")

    # --- Filtrage ---
    original_count = len(data["features"])
    data["features"] = [
        feat for feat in data["features"]
        if not matches_ukraine(feat.get("properties", {}))
    ]
    removed = original_count - len(data["features"])
    print(f"🗑️  {removed} entité(s) ukrainienne(s) supprimée(s).")

    # --- Écriture ---
    with OUT_FILE.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅  GeoJSON nettoyé écrit dans « {OUT_FILE} ».")

if __name__ == "__main__":
    main()
