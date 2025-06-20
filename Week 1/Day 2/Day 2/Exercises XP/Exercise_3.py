brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

if "number_stores" in brand:
    brand["number_stores"] = 2

print(f"Zara’s clients include: {', '.join(brand['type_of_clothes'])}")

if "country_creation" not in brand:
    brand["country_creation"] = "Spain"

if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

if "creation_date" in brand:
    brand.pop("creation_date")
print(brand)

print(f" The last item in international competitors is: {brand["international_competitors"][-1]}")

print(f" The major colors in the US are: {brand["major_color"]["US"]}")

print(f"Number of keys in the dictionary: {len(brand)}")

print("Keys of the dictionary:", list(brand.keys()))


more_on_zara = {
    "creation_date": 2025,
    "number_stores": 300
}

brand.update(more_on_zara)
print(brand)
