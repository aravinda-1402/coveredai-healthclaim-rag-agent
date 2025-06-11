import pandas as pd

def sanitize_data(file_path):
    df = pd.read_csv(file_path)
    for col in df.columns:
        if any(key in col.lower() for key in ['name', 'id', 'ssn']):
            df[col] = "[REDACTED]"
    df.to_csv(file_path, index=False)
    return True
