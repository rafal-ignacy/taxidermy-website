import json
import pandas as pd

INPUT_JSON = "productsDatabase.json"
OUTPUT_XLSX = "productsDatabase.xlsx"


LANGS = ["en-GB", "en-US", "de-DE", "pl-PL"]


def flatten_product(category, code, product):
    row = {
        "category": category,
        "code": code,
        "price": product.get("price"),
    }

    # dimensions.*
    dims = product.get("dimensions", {})
    for k, v in dims.items():
        row[f"dimensions.{k}"] = v

    images = product.get("images", [])
    row["images"] = json.dumps(images, ensure_ascii=False)

    for lang in LANGS:
        if lang in product:
            lang_obj = product[lang]
            row[f"{lang}.title"] = lang_obj.get("title")
            row[f"{lang}.descriptionTemplate"] = lang_obj.get("descriptionTemplate")

    return row


def main():
    with open(INPUT_JSON, "r", encoding="utf-8") as f:
        data = json.load(f)

    rows = []
    for category, products in data.items():
        for code, product in products.items():
            rows.append(flatten_product(category, code, product))

    df = pd.DataFrame(rows)
    df.to_excel(OUTPUT_XLSX, index=False)

    print(f"Saved: {OUTPUT_XLSX}")
    print(f"Rows: {len(df)}, columns: {len(df.columns)}")


if __name__ == "__main__":
    main()
