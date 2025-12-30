import pandas as pd
import os

# Load CSV safely
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "sample_data.csv")

data = pd.read_csv(CSV_PATH)

def predict(attendance, menu_type):
    """
    Predicts food waste level based on attendance and menu type
    """

    # Filter past data for same menu type
    filtered = data[data["menu_type"] == menu_type]

    # If no data exists, return medium by default
    if filtered.empty:
        return "medium"

    # Find closest attendance match
    filtered = filtered.copy()
    filtered["diff"] = abs(filtered["attendance"] - attendance)

    closest_row = filtered.sort_values("diff").iloc[0]

    return closest_row["waste_level"]
