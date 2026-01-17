import json
import pandas as pd
import re

INPUT_XLSX = "productsDatabase.xlsx"
OUTPUT_JSON = "productsDatabase_from_xlsx.json"

LANGS = ["en-GB", "en-US", "de-DE", "pl-PL"]


def safe_parse_number(value):
    if pd.isna(value) or str(value).strip() == "":
        return None

    val_str = str(value).strip()

    bracket_match = re.match(r"\[(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)\]", val_str)
    if bracket_match:
        num1 = float(bracket_match.group(1))
        num2 = float(bracket_match.group(2))
        return [int(num1), int(num2)]

    try:
        return int(float(val_str))
    except ValueError:
        return val_str  # fallback


def reconstruct_product(row):
    product = {}

    # price
    price_val = row.get("price")
    if pd.notna(price_val):
        product["price"] = safe_parse_number(price_val)

    # dimensions.*
    dims = {}
    for col in row.index:
        if col.startswith("dimensions.") and pd.notna(row[col]):
            key = col.split(".", 1)[1]
            dims[key] = safe_parse_number(row[col])

    if dims:
        product["dimensions"] = dims

    images_val = row.get("images")
    if pd.notna(images_val) and str(images_val).strip():
        try:
            product["images"] = json.loads(str(images_val))
        except json.JSONDecodeError:
            print(f"⚠️ Błąd parsowania images w {row['category']} {row['code']}")

    for lang in LANGS:
        title_col = f"{lang}.title"
        desc_col = f"{lang}.descriptionTemplate"

        lang_obj = {}
        title = row.get(title_col)
        desc = row.get(desc_col)

        if pd.notna(title) and str(title).strip():
            lang_obj["title"] = str(title)
        if pd.notna(desc) and str(desc).strip():
            lang_obj["descriptionTemplate"] = str(desc)

        if lang_obj:
            product[lang] = lang_obj

    return product


def main():
    df = pd.read_excel(INPUT_XLSX)

    data = {}
    for _, row in df.iterrows():
        category = row["category"]
        code = row["code"]

        if pd.isna(category) or pd.isna(code):
            continue

        data.setdefault(str(category), {})
        data[str(category)][str(code)] = reconstruct_product(row)

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ Saved: {OUTPUT_JSON}")
    print(f"📊 Categories: {len(data)}")
    print(f"📈 Products: {sum(len(products) for products in data.values())}")


if __name__ == "__main__":
    main()
